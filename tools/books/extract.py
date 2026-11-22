"""PDF book -> structured HTML body (for Dinaburga 1810 books made by LibreOffice).
usage: python3 extract.py book.pdf out_dir
Writes out_dir/body.html, out_dir/img/*.{jpeg,png}, out_dir/cover.pdf
"""
import sys, os, re, html
import pymupdf as fitz

SRC, OUT = sys.argv[1], sys.argv[2]
os.makedirs(OUT + '/img', exist_ok=True)
doc = fitz.open(SRC)

RED, GREEN, GREY = 0x8e3b2a, 0x2e4a3a, 0x6b6b6b
LEFT = 65


def is_heading_font(f):
    return f.startswith('Lora') or 'SerifCJK' in f and 'Bold' in f


def SANS(f):
    return f.startswith('Carlito') or 'SansCJK' in f or f.startswith('Inter')


def SB(f):
    return SANS(f) and 'Bold' in f


def SR(f):
    return SANS(f) and 'Bold' not in f


def esc(t):
    return html.escape(t, quote=False)


def span_html(s):
    t = esc(s['text'])
    f = s['font']
    bold = 'Bold' in f or (s['flags'] & 16)
    ital = 'Italic' in f or (s['flags'] & 2)
    if s['color'] == GREY and (ital or (SR(f) and s['size'] < 10.2 and s['size'] > 8.8)):
        return '<span class="m">%s</span>' % t
    if bold and ital:
        return '<b><i>%s</i></b>' % t
    if bold:
        return '<b>%s</b>' % t
    if ital:
        return '<i>%s</i>' % t
    return t


def join_spans(spans):
    out = ''
    prev = None
    for s in spans:
        if prev is not None:
            gap = s['bbox'][0] - prev['bbox'][2]
            if gap > 1.2 and not prev['text'].endswith(' ') and not s['text'].startswith(' '):
                out += ' '
        out += span_html(s)
        prev = s
    return out


def plain(spans):
    return ''.join(s['text'] for s in spans)


def merge_inline(h):
    # merge adjacent identical tags
    for tag in ('b', 'i'):
        h = h.replace('</%s><%s>' % (tag, tag), '')
    h = h.replace('</span><span class="m">', '')
    h = re.sub(r'</span>(\s+)<span class="m">', r'\1', h)
    return h


def cjk(ch):
    return '\u3000' <= ch <= '\u9fff' or '\uff00' <= ch <= '\uffef'


def join_lines(a, b):
    if not a:
        return b
    if not b:
        return a
    ta = re.sub('<[^>]+>', '', a)
    if (ta.endswith('-') or ta.endswith('–')) and not ta.endswith(' -') and not ta.endswith(' –'):
        return a + b
    if ta.endswith(' ') or ta.endswith('​'):
        return a + b
    tb = re.sub('<[^>]+>', '', b)
    if (ta and cjk(ta[-1])) or (tb and cjk(tb[0])):
        return a + b
    return a + ' ' + b


# ---------------- collect page items ----------------
elements = []  # list of dicts


def emit(e):
    elements.append(e)


img_count = [0]


def page_lines(p, exclude):
    """return visual lines: list of (y0, y1, x0, spans) excluding rects."""
    raw = []
    for b in p.get_text('dict')['blocks']:
        if b['type'] != 0:
            continue
        for l in b['lines']:
            sp = [s for s in l['spans'] if s['text'] != '']
            if not sp:
                continue
            for s in sp:
                cx = (s['bbox'][0] + s['bbox'][2]) / 2
                cy = (s['bbox'][1] + s['bbox'][3]) / 2
                if any(r.contains(fitz.Point(cx, cy)) for r in exclude):
                    continue
                if s['bbox'][1] < 50 or s['bbox'][1] > 785:
                    continue
                raw.append(s)
    # group by baseline
    raw.sort(key=lambda s: (round(s['origin'][1]), s['bbox'][0]))
    lines = []
    for s in raw:
        y = s['origin'][1]
        for L in lines:
            if abs(L['y'] - y) < 2.5 and not (s['bbox'][0] < L['x1'] - 3 and s['bbox'][2] > L['x0'] + 3 and False):
                L['spans'].append(s)
                L['x0'] = min(L['x0'], s['bbox'][0]); L['x1'] = max(L['x1'], s['bbox'][2])
                break
        else:
            lines.append({'y': y, 'spans': [s], 'x0': s['bbox'][0], 'x1': s['bbox'][2], 'top': s['bbox'][1]})
    for L in lines:
        L['spans'].sort(key=lambda s: s['bbox'][0])
        L['top'] = min(s['bbox'][1] for s in L['spans'])
        L['bot'] = max(s['bbox'][3] for s in L['spans'])
    lines.sort(key=lambda L: L['y'])
    return lines


def cell_html(p, rect, allspans):
    sp = [s for s in allspans if rect.contains(fitz.Point((s['bbox'][0] + s['bbox'][2]) / 2, (s['bbox'][1] + s['bbox'][3]) / 2))]
    # lines
    sp.sort(key=lambda s: (round(s['origin'][1]), s['bbox'][0]))
    lines = []
    for s in sp:
        if lines and abs(lines[-1][0] - s['origin'][1]) < 2.5:
            lines[-1][1].append(s)
        else:
            lines.append([s['origin'][1], [s]])
    h = ''
    for _, l in lines:
        h = join_lines(h, join_spans(l))
    return merge_inline(h.strip())


for pno, p in enumerate(doc):
    if pno == 0:
        c = fitz.open(); c.insert_pdf(doc, from_page=0, to_page=0); c.save(OUT + '/cover.pdf')
        continue
    allspans = [s for b in p.get_text('dict')['blocks'] if b['type'] == 0 for l in b['lines'] for s in l['spans'] if s['text'].strip()]
    items = []  # (y, kind, payload)
    exclude = []
    # tables
    try:
        tabs = p.find_tables().tables
    except Exception:
        tabs = []
    for t in tabs:
        r = fitz.Rect(t.bbox)
        if r.width < 200 or t.col_count < 2:
            continue
        hdr0 = any(s['color'] == 0xffffff for s in allspans if fitz.Rect(t.rows[0].bbox).contains(fitz.Point((s['bbox'][0] + s['bbox'][2]) / 2, (s['bbox'][1] + s['bbox'][3]) / 2)))
        if not hdr0:
            # continuation of a table from previous page: must start at top and have grid lines
            if r.y0 > 75 or not elements or not any(e['kind'] == 'table' for e in elements[-6:]):
                continue
            first_red = [s for s in allspans if fitz.Rect(t.rows[0].cells[0] or t.rows[0].bbox).contains(fitz.Point((s['bbox'][0] + s['bbox'][2]) / 2, (s['bbox'][1] + s['bbox'][3]) / 2)) and s['color'] == RED]
            if first_red:
                continue
        rows = []
        for row in t.rows:
            cells = []
            for cb in row.cells:
                cells.append(cell_html(p, fitz.Rect(cb), allspans) if cb else '')
            if rows and not cells[0].strip() and len(rows) > 1 and any(c.strip() for c in cells):
                rows[-1] = [join_lines(a, b2) for a, b2 in zip(rows[-1], cells)]
                continue
            rows.append(cells)
        xs = sorted(set(round(cb[0]) for row in t.rows for cb in row.cells if cb))
        widths = []
        bounds = xs + [round(r.x1)]
        tot = bounds[-1] - bounds[0]
        for i in range(len(xs)):
            widths.append(round((bounds[i + 1] - bounds[i]) / tot * 100, 1))
        if len(widths) != t.col_count:
            widths = [round(100 / t.col_count, 1)] * t.col_count
        # header row detection: white bold text
        hdr = any(s['color'] == 0xffffff for s in allspans if fitz.Rect(t.rows[0].bbox).contains(fitz.Point((s['bbox'][0] + s['bbox'][2]) / 2, (s['bbox'][1] + s['bbox'][3]) / 2)))
        items.append((r.y0, 'table', {'rows': rows, 'widths': widths, 'hdr': hdr, 'colx': [cb[0] for cb in t.rows[0].cells if cb]}))
        exclude.append(r)
    # boxes (shaded callouts) = wide filled rects not in tables
    boxes = []
    for dr in p.get_drawings():
        f = dr.get('fill'); r = dr['rect']
        if not f or r.width < 300 or r.height < 12:
            continue
        if any(t.intersects(r) for t in exclude):
            continue
        rgb = tuple(int(round(c * 255)) for c in f[:3])
        if rgb in [(255, 255, 255)]:
            continue
        if min(rgb) < 200:
            continue
        boxes.append((r, rgb))
    # merge vertically adjacent same-color boxes
    boxes.sort(key=lambda b: b[0].y0)
    mb = []
    for r, c in boxes:
        if mb and mb[-1][1] == c and r.y0 - mb[-1][0].y1 < 2 and abs(r.x0 - mb[-1][0].x0) < 5:
            mb[-1] = (mb[-1][0] | r, c)
        else:
            mb.append((fitz.Rect(r), c))
    # images
    for info in p.get_image_info(xrefs=True):
        r = fitz.Rect(info['bbox'])
        if r.width < 60:
            continue
        xref = info['xref']
        img_count[0] += 1
        name = 'img%02d' % img_count[0]
        try:
            ex = doc.extract_image(xref)
            fn = '%s.%s' % (name, ex['ext'])
            open(OUT + '/img/' + fn, 'wb').write(ex['image'])
        except Exception:
            pix = p.get_pixmap(clip=r, dpi=200); fn = name + '.png'; pix.save(OUT + '/img/' + fn)
        items.append((r.y0, 'img', {'src': fn, 'w': round(r.width, 1), 'h': round(r.height, 1)}))
    lines = page_lines(p, exclude)
    for L in lines:
        cy = (L['top'] + L['bot']) / 2
        box = None
        for i, (r, c) in enumerate(mb):
            if r.y0 - 1 <= cy <= r.y1 + 1 and r.x0 - 5 <= L['x0'] <= r.x1:
                box = (pno, i, c)
        L['box'] = box
        items.append((L['top'], 'line', L))
    items.sort(key=lambda it: it[0])
    bottom = 0
    for y, kind, pl in items:
        if kind == 'line': bottom = max(bottom, pl['bot'])
        elif kind == 'img': bottom = max(bottom, y + pl['h'])
        else: bottom = max(bottom, y + 20)
    emit({'kind': 'pagebreak', 'page': pno + 1, 'items_top': items[0][0] if items else 999, 'bottom': bottom})
    for y, kind, pl in items:
        if kind != 'line':
            emit({'kind': kind, **pl, 'y': y})
            continue
        emit({'kind': 'line', 'L': pl, 'y': y})

# ---------------- classify lines into blocks ----------------
blocks = []
cur = None  # current open block


def close():
    global cur
    if cur:
        blocks.append(cur)
    cur = None


last_page_bottom = 0
pending_break = False
prev_page_last_y = 0
prev_bottom = 0
forced = True
page_first = False
for e in elements:
    k = e['kind']
    if k == 'pagebreak':
        page_first = True
        forced = prev_bottom < 690
        prev_bottom = e['bottom']
        continue
    if k in ('table', 'img'):
        if k == 'table' and page_first and blocks and cur is None and blocks[-1]['kind'] == 'table' and len(blocks[-1]['rows'][0]) == len(e['rows'][0]):
            rows = e['rows']
            if e['hdr'] and rows[0] == blocks[-1]['rows'][0]:
                rows = rows[1:]
            elif e['hdr']:
                rows = rows[1:]
            if rows and not rows[0][0].strip():
                blocks[-1]['rows'][-1] = [join_lines(a, b2) for a, b2 in zip(blocks[-1]['rows'][-1], rows[0])]
                rows = rows[1:]
            blocks[-1]['rows'] += rows
            page_first = False
            continue
        if k == 'table' and page_first and cur and cur['kind'] == 'table':
            pass
        close()
        blocks.append({'kind': k, **{a: b for a, b in e.items() if a != 'kind'}, 'pagetop': page_first})
        page_first = False
        continue
    L = e['L']
    sp = L['spans']
    f0 = sp[0]
    font, size, color = f0['font'], round(f0['size'], 1), f0['color']
    txt = plain(sp).strip()
    x0 = L['x0']
    box = L['box']
    pt = page_first
    page_first = False

    # cover-like / part pages
    if is_heading_font(font) and size >= 26:
        if cur and cur['kind'] == 'part' and cur.get('title') is not None:
            cur['title'] += ' ' + txt; continue
        if cur and cur['kind'] == 'part':
            cur['title'] = txt; continue
        close(); cur = {'kind': 'part', 'label': '', 'title': txt}; continue
    if SB(font) and size >= 12.5 and color == RED and not box:
        close(); cur = {'kind': 'part', 'label': txt, 'title': None}; continue
    if is_heading_font(font) and size >= 21:
        close(); blocks.append({'kind': 'h1', 'html': txt, 'pagetop': pt, 'forced': True}); continue
    # box handling
    if box:
        islabel = SB(f0['font']) and size <= 9 and ('·' in f0['text'])
        if islabel or (not (cur and cur['kind'] == 'box' and cur['id'] == box[1] and cur['page'] == box[0]) and not (cur and cur['kind'] == 'box' and pt)):
            close()
            cur = {'kind': 'box', 'id': box[1], 'page': box[0], 'rgb': box[2], 'label': '', 'title': '', 'verdict': '', 'paras': [], 'pagetop': pt}
        cur['page'] = box[0]; cur['id'] = box[1]
        if SB(f0['font']) and size <= 9 and ('·' in f0['text']):
            cur['label'] = f0['text'].replace('·', '').strip()
            cur['title'] = merge_inline(join_spans(sp[1:])).strip()
            continue
        if any(is_heading_font(s['font']) for s in sp) and size <= 12.5 and not cur['paras'] and cur['title'] and not cur['verdict']:
            cur['title'] = join_lines(cur['title'], merge_inline(join_spans(sp)).strip()); continue
        if size <= 10.2 and SR(font) and color == GREY and len(sp) >= 2 and not cur['paras']:
            cur['verdict_label'] = sp[0]['text'].strip(); cur['verdict'] = merge_inline(join_spans(sp[1:])).strip(); continue
        h = merge_inline(join_spans(sp))
        if cur['paras'] and L['top'] - cur.get('lastbot', 0) < 6:
            cur['paras'][-1] = join_lines(cur['paras'][-1], h)
        else:
            cur['paras'].append(h)
        cur['lastbot'] = L['bot']
        continue
    # headings
    if is_heading_font(font) and size >= 15:
        if cur and cur['kind'] == 'h2' and L['top'] - cur['bot'] < 8:
            cur['html'] = join_lines(cur['html'], txt); cur['bot'] = L['bot']; continue
        close(); cur = {'kind': 'h2', 'html': txt, 'pagetop': pt, 'forced': forced, 'bot': L['bot']}; continue
    if is_heading_font(font) and size >= 12.5:
        if cur and cur['kind'] == 'h3' and L['top'] - cur['bot'] < 6:
            cur['html'] = join_lines(cur['html'], txt); cur['bot'] = L['bot']; continue
        close(); cur = {'kind': 'h3', 'html': txt, 'pagetop': pt, 'bot': L['bot']}; continue
    # contents page entries
    if SB(font) and size >= 10.8 and color == RED and x0 < 80:
        close(); blocks.append({'kind': 'toc', 'level': 0, 'html': txt}); continue
    if (not SANS(font)) and size == 10.5 and blocks and blocks[-1]['kind'] in ('toc', 'h1') and cur is None:
        blocks.append({'kind': 'toc', 'level': 1 if x0 > 72 else 2, 'html': merge_inline(join_spans(sp)).strip()}); continue
    # timeline row
    if SB(font) and color == RED and x0 < 120 and size >= 10:
        close()
        d = [s for s in sp if s['bbox'][0] < 160]
        rest = [s for s in sp if s['bbox'][0] >= 160]
        cur = {'kind': 'tl', 'date': plain(d).strip(), 'html': merge_inline(join_spans(rest)).strip(), 'bot': L['bot'], 'pagetop': pt}
        continue
    if cur and cur['kind'] == 'tl' and x0 >= 150 and (L['top'] - cur['bot'] < 8 or pt):
        cur['html'] = join_lines(cur['html'], merge_inline(join_spans(sp)).strip()); cur['bot'] = L['bot']; continue
    # bullets
    if f0['text'].strip() == '■':
        close()
        tx = [q for q in sp[1:] if q['text'].strip()]
        cur = {'kind': 'li', 'html': merge_inline(join_spans(sp[1:])).strip(), 'bot': L['bot'], 'x': tx[0]['bbox'][0] if tx else x0 + 13}
        continue
    if cur and cur['kind'] == 'li' and abs(x0 - cur['x']) < 6 and (L['top'] - cur['bot'] < 6 or pt):
        cur['html'] = join_lines(cur['html'], merge_inline(join_spans(sp)).strip()); cur['bot'] = L['bot']; continue
    # caption: italic grey centred after image
    if ('Italic' in font or 'CJK' in font) and color == GREY and blocks and (blocks[-1]['kind'] == 'img' or (cur and cur['kind'] == 'caption')) and (cur is None or cur['kind'] == 'caption') and not SB(font):
        if cur and cur['kind'] == 'caption':
            cur['html'] = join_lines(cur['html'], merge_inline(join_spans(sp)).strip()); cur['bot'] = L['bot']; continue
        cur = {'kind': 'caption', 'html': merge_inline(join_spans(sp)).strip(), 'bot': L['bot']}; continue
    # sources (small grey Carlito)
    if cur and cur['kind'] == 'caption':
        close()
    if SANS(font) and color == GREY and size <= 9 and size >= 8.2:
        if cur and cur['kind'] == 'src' and (L['top'] - cur['bot'] < 6 or pt):
            cur['html'] = join_lines(cur['html'], merge_inline(join_spans(sp)).strip()); cur['bot'] = L['bot']; continue
        close(); cur = {'kind': 'src', 'html': merge_inline(join_spans(sp)).strip(), 'bot': L['bot']}; continue
    if cur and cur['kind'] == 'caption':
        close()
    # orphan table cell continued on next page
    if pt and cur is None and blocks and blocks[-1]['kind'] == 'table' and SANS(font) and len(txt) < 60:
        cx = blocks[-1]['colx']; j = max(i for i, x in enumerate(cx) if x - 8 <= x0) if any(x - 8 <= x0 for x in cx) else 0
        blocks[-1]['rows'][-1][j] = join_lines(blocks[-1]['rows'][-1][j], merge_inline(join_spans(sp)).strip())
        continue
    # body paragraph
    h = merge_inline(join_spans(sp)).strip()
    indent = x0 > LEFT + 8
    if cur and cur['kind'] == 'p' and not indent and (L['top'] - cur['bot'] < 6 or pt):
        cur['html'] = join_lines(cur['html'], h); cur['bot'] = L['bot']; continue
    close()
    cur = {'kind': 'p', 'html': h, 'bot': L['bot'], 'indent': indent, 'pagetop': pt}
close()

# ---------------- write html ----------------
out = []
for b in blocks:
    k = b['kind']
    pb = ' class="pb"' if b.get('pagetop') and b.get('forced') and k in ('h1', 'h2') else ''
    if k == 'part':
        out.append('<section class="part"><div class="plabel">%s</div><div class="ptitle">%s</div></section>' % (esc(b['label']), esc(b['title'] or '')))
    elif k == 'h1':
        out.append('<h1%s>%s</h1>' % (pb, esc(b['html'])))
    elif k == 'h2':
        if out and out[-1].startswith('<div class="toc'): pb = ' class="pb"'
        out.append('<h2%s>%s</h2>' % (pb, esc(b['html'])))
    elif k == 'h3':
        out.append('<h3>%s</h3>' % esc(b['html']))
    elif k == 'toc':
        out.append('<div class="toc l%d">%s</div>' % (b['level'], b['html']))
    elif k == 'tl':
        out.append('<div class="tl"><div class="d">%s</div><div class="t">%s</div></div>' % (esc(b['date']), b['html']))
    elif k == 'li':
        out.append('<div class="li">%s</div>' % b['html'])
    elif k == 'src':
        out.append('<p class="src">%s</p>' % b['html'])
    elif k == 'caption':
        out.append('<p class="cap">%s</p>' % b['html'])
    elif k == 'p':
        out.append('<p%s>%s</p>' % ('' if b['indent'] else ' class="ni"', b['html']))
    elif k == 'img':
        out.append('<figure><img src="img/%s" style="width:%spt"></figure>' % (b['src'], b['w']))
    elif k == 'box':
        cls = {(247, 238, 234): 'legend', (238, 243, 236): 'true', (244, 242, 236): 'note'}.get(tuple(b['rgb']), 'note')
        hh = '<div class="box %s"><div class="bh"><span class="bl">%s</span>%s<span class="bt">%s</span></div>' % (cls, esc(b['label']), ' · ' if b['label'] else '', b['title'])
        if b['verdict']:
            hh += '<div class="v">%s <b>%s</b></div>' % (esc(b.get('verdict_label', '')), re.sub('</?b>', '', b['verdict']))
        for para in b['paras']:
            hh += '<p>%s</p>' % para
        out.append(hh + '</div>')
    elif k == 'table':
        rows = b['rows']
        t = '<table><colgroup>%s</colgroup>' % ''.join('<col style="width:%s%%">' % w for w in b['widths'])
        for i, r in enumerate(rows):
            tag = 'th' if (i == 0 and b['hdr']) else 'td'
            t += '<tr>' + ''.join('<%s>%s</%s>' % (tag, c, tag) for c in r) + '</tr>'
        out.append(t + '</table>')
hdr = ''
for b in doc[1].get_text('dict')['blocks']:
    for l in b.get('lines', []):
        for sp_ in l['spans']:
            if sp_['bbox'][1] < 50 and sp_['text'].strip(): hdr += sp_['text']
open(OUT + '/header.txt', 'w').write(re.sub(r'\s+', ' ', hdr).strip())
open(OUT + '/body.html', 'w').write('\n'.join(out) + '\n')
print('blocks', len(blocks), 'images', img_count[0])
