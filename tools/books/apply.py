"""Apply the 22.11.2026 book corrections to body.orig.html -> body.html.
usage: python3 apply.py lang   (reads edits_<lang>.py defining dict E)"""
import sys, re, importlib.util

L = sys.argv[1]
spec = importlib.util.spec_from_file_location('E', f'edits_{L}.py')
mod = importlib.util.module_from_spec(spec); spec.loader.exec_module(mod)
E = mod.E
s = open(f'{L}/body.orig.html').read()
s = s.replace('</span><span class="m">', '')


def M(t):
    """[..] -> marker span"""
    return re.sub(r'\[([^\[\]]+)\]', r'<span class="m">[\1]</span>', t)


def once(old, new, where=''):
    global s
    n = s.count(old)
    if n != 1:
        raise SystemExit(f'{L}: expected 1 occurrence ({where}), found {n}: {old[:120]}')
    s = s.replace(old, new)


def tl_re(d):
    return re.compile(r'<div class="tl"><div class="d">' + re.escape(d) + r'</div><div class="t">(.*?)</div></div>')


def tl(d, t):
    return '<div class="tl"><div class="d">%s</div><div class="t">%s</div></div>' % (d, M(t))


def tl_find(d):
    ms = list(tl_re(d).finditer(s))
    if len(ms) != 1:
        raise SystemExit(f'{L}: tl {d!r} found {len(ms)}')
    return ms[0]


def tl_set(d, t, newd=None):
    global s
    m = tl_find(d)
    s = s[:m.start()] + tl(newd or d, t) + s[m.end():]


def tl_ins(d, items, after=False):
    global s
    m = tl_find(d)
    new = '\n'.join(tl(a, b) for a, b in items)
    if after:
        s = s[:m.end()] + '\n' + new + s[m.end():]
    else:
        s = s[:m.start()] + new + '\n' + s[m.start():]


def tl_append(d, t):
    global s
    m = tl_find(d)
    old = m.group(0)
    s = s[:m.start()] + old[:-len('</div></div>')] + ' ' + M(t) + '</div></div>' + s[m.end():]


def line_with(sub, prefix):
    ls = [x for x in s.split('\n') if x.startswith(prefix) and sub in x]
    if len(ls) != 1:
        raise SystemExit(f'{L}: line {sub!r} found {len(ls)}')
    return ls[0]


def after_line(sub, prefix, new_lines):
    global s
    x = line_with(sub, prefix)
    s = s.replace(x, x + ''.join('\n' + y for y in new_lines), 1)


def append_line(sub, prefix, tail, end):
    global s
    x = line_with(sub, prefix)
    assert x.endswith(end), (L, x[-40:])
    s = s.replace(x, x[:-len(end)] + tail + end, 1)


# 1. How to read
once(E['howto_old'], E['howto_new'], 'howto')
# 2. legends title (toc + h2)
assert s.count(E['leg_old']) == 2, (L, 'legends title count', s.count(E['leg_old']))
s = s.replace(E['leg_old'], E['leg_new'])
# 3. chapter 1
d = E['d']
tl_set(d['1313'], E['t1313'])
tl_set(d['1559'], E['t1559'])
tl_ins(d['1582'], [(d['1578'], E['t1578'])])
tl_ins(d['1656'], [(d['1655'], E['t1655'])])
tl_set(d['1656'], E['t1656'])
tl_ins(d['1737'], [(d['1700'], E['t1700'])])
tl_ins(d['1772'], [(d['1794'], E['t1794'])], after=True)
append_line(E['src1_sub'], '<p class="src">', E['src1_add'], E['src1_end'])
# 4. chapter 2 dates
for a, b in E['dates']:
    m = tl_find(a)
    s = s[:m.start()] + m.group(0).replace('<div class="d">%s</div>' % a, '<div class="d">%s</div>' % b, 1) + s[m.end():]
# 5. chapter 4
tl_set(d['1819k'], E['t1819k'])
tl_set(d['1819'], E['t1819'])
tl_set(d['1820'], E['t1820'])
tl_ins(d['1820h'], [(d['1821'], E['t1821'])], after=True)
tl_append(d['1830'], E['t1830add'])
# 6. 1849
tl_set(d['1849'], E['t1849'])
# 7. streets
once('<td>%s</td>' % E['ord_old'], '<td>%s</td>' % E['ord_new'], 'ordena')
# 8. legend box
boxes = list(re.finditer(r'<div class="box legend">[^\n]*', s))
b1821 = [b for b in boxes if '1821' in b.group(0)]
assert len(b1821) == 1, (L, 'box1821', len(b1821))
label = re.search(r'<span class="bl">([^<]*)</span>', b1821[0].group(0)).group(1)
vlab = re.search(r'<div class="v">([^<]*)<b>', b1821[0].group(0)).group(1)
box = ('<div class="box legend"><div class="bh"><span class="bl">%s</span> · <span class="bt">%s</span></div>'
       '<div class="v">%s<b>%s</b></div><p>%s</p></div>') % (label, E['box_title'], vlab, E['box_verdict'], E['box_text'])
s = s[:b1821[0].end()] + '\n' + box + s[b1821[0].end():]
append_line(E['srcleg_sub'], '<p class="src">', E['srcleg_add'], E['srcleg_end'])
# 9. chronology rows
row = re.search(r'<tr><td>1582[^<]*</td><td>[^<]*</td></tr>', s).group(0)
s = s.replace(row, row + ''.join('<tr><td>%s</td><td>%s</td></tr>' % r for r in E['chrono']), 1)
# 10. headers
once('<th><b>%s</b></th></tr>' % E['th_cmd_old'], '<th><b>%s</b></th></tr>' % E['th_cmd_new'], 'th cmd')
once('<th><b>%s</b></th></tr>' % E['th_bld_old'], '<th><b>%s</b></th></tr>' % E['th_bld_new'], 'th bld')
# 11. open questions
after_line(E['oq_after'], '<div class="li">', ['<div class="li">%s</div>' % M(x) for x in E['oq_new']])
x = line_with(E['oq_del'], '<div class="li">'); s = s.replace(x + '\n', '', 1)
# 12. sources list
append_line(E['lvov_sub'], '<div class="li">', ' ' + E['lvov_add'], '</div>')
after_line(E['dund_sub'], '<div class="li">', ['<div class="li">%s</div>' % M(E['dund_new'])])
after_line(E['press_sub'], '<div class="li">', ['<div class="li">%s</div>' % x for x in E['other_new']])
open(f'{L}/body.html', 'w').write(s)
print(L, 'ok')
