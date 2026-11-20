"""Светлая тема (белый фон, красные линии) — генерируется из тёмной.
Запуск из папки проекта:  python3 tools/make_light_theme.py
Берёт CSS из <style> в index.html, находит все цвета и вставляет между
/* LIGHT-THEME:BEGIN */ и /* LIGHT-THEME:END */ правила
html[data-theme="light"] … с цветами светлой темы. Тёмную тему не трогает.
После любых правок цветов в тёмной теме — запустить ещё раз."""
import re, colorsys
H = open('index.html', encoding='utf-8').read()
a = H.index('<style>') + 7; b = H.index('</style>')
css = H[a:b]
css = re.sub(r'/\* LIGHT-THEME:BEGIN \*/.*?/\* LIGHT-THEME:END \*/\n?', '', css, flags=re.S)
SCOPE = 'html[data-theme="light"]'
RED = 352/360  # оттенок красного

# Ручные значения для главных переменных
VARS = {'--bg': '#fbf8f6', '--panel': '#ffffff', '--line': '#e3a7a7', '--text': '#2a1a1a',
        '--muted': '#7a6262', '--accent': '#c0182f', '--ok': '#2e7d32', '--gold-dim': 'rgba(192,24,47,.14)'}

def conv(r, g, b, a=None):
    h, l, s = colorsys.rgb_to_hls(r/255, g/255, b/255)
    chroma = (max(r, g, b) - min(r, g, b)) / 255
    if (r, g, b) == (0, 0, 0) and a is not None:      # чёрные полупрозрачные подложки поверх фото — оставить
        return None
    gold = 0.05 <= h <= 0.17 and chroma >= 0.12 and l >= 0.33
    if gold:                                         # золото -> красный
        L = 0.40 if l < 0.62 else 0.47 if l < 0.75 else 0.55
        S = 0.78
        r2, g2, b2 = colorsys.hls_to_rgb(RED, L, S)
    elif chroma < 0.16 or l < 0.25 or l > 0.88:      # нейтральные: тёмное <-> светлое
        L = 1 - l
        if l < 0.2: L = max(L, 0.965)
        r2, g2, b2 = colorsys.hls_to_rgb(RED, L, min(s, 0.25) * 0.5)
    else:                                            # прочие цвета (зелёный и т.п.) — темнее для белого фона
        L = l if l < 0.55 else 1.0 - l + 0.05
        r2, g2, b2 = colorsys.hls_to_rgb(h, max(0.22, min(L, 0.5)), s)
    R, G, B = (round(x * 255) for x in (r2, g2, b2))
    return f'rgba({R},{G},{B},{a})' if a is not None else f'#{R:02x}{G:02x}{B:02x}'

def hex2rgb(x):
    x = x[1:]
    if len(x) == 3: x = ''.join(c*2 for c in x)
    return int(x[0:2], 16), int(x[2:4], 16), int(x[4:6], 16)

COLOR = re.compile(r'#[0-9a-fA-F]{6}\b|#[0-9a-fA-F]{3}\b|rgba?\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*(?:,\s*[\d.]+\s*)?\)')
NAMED = re.compile(r'(?<![\w-])(white|black)(?![\w-])')
def fix_value(v):
    changed = [False]
    def rep(m):
        t = m.group(0)
        if t.startswith('#'): out = conv(*hex2rgb(t))
        else:
            n = [x.strip() for x in t[t.index('(')+1:-1].split(',')]
            out = conv(int(n[0]), int(n[1]), int(n[2]), n[3] if len(n) > 3 else None)
        if out is None: return t
        changed[0] = True; return out
    v2 = COLOR.sub(rep, v)
    def rep2(m):
        changed[0] = True; return '#2a1a1a' if m.group(1) == 'white' else '#ffffff'
    if re.match(r'\s*(color|background|background-color|border[\w-]*|outline[\w-]*|fill|stroke|box-shadow|text-shadow)\s*:', v):
        v2 = NAMED.sub(rep2, v2)
    return v2 if changed[0] else None

def scope_sel(sel):
    out = []
    for s in sel.split(','):
        s = s.strip()
        if not s: continue
        if s == ':root': out.append(SCOPE); continue
        if re.match(r'^html\b', s): out.append(SCOPE + s[4:]); continue
        out.append(f'{SCOPE} {s}')
    return ', '.join(out)

def walk(text):
    res = []; i = 0; n = len(text)
    while i < n:
        j = text.find('{', i)
        if j < 0: break
        head = re.sub(r'/\*.*?\*/', '', text[i:j], flags=re.S).strip()
        depth = 1; k = j + 1
        while k < n and depth:
            if text[k] == '{': depth += 1
            elif text[k] == '}': depth -= 1
            k += 1
        body = text[j+1:k-1]
        if head.startswith('@media') or head.startswith('@supports'):
            inner = walk(body)
            if inner: res.append(head + ' {\n' + inner + '\n}')
        elif head.startswith('@'):
            pass  # keyframes/font-face — пропускаем
        else:
            decls = []
            for d in re.sub(r'/\*.*?\*/', '', body, flags=re.S).split(';'):
                if ':' not in d or 'url(' in d: continue
                prop = d.split(':', 1)[0].strip()
                if prop in VARS and head.strip() == ':root':
                    decls.append(f'{prop}:{VARS[prop]}'); continue
                f = fix_value(d.strip())
                if f: decls.append(f)
            if decls: res.append(f'{scope_sel(head)} {{ ' + '; '.join(decls) + '; }')
        i = k
    return '\n'.join(res)

out = walk(css)
extra = f"""
{SCOPE} {{ color-scheme: light; }}
{SCOPE} body::after {{ opacity:.025; }}
{SCOPE} .card img, {SCOPE} .gImg {{ filter:none; }}"""
block = '/* LIGHT-THEME:BEGIN — сгенерировано tools/make_light_theme.py, руками не править */\n' + out + extra + '\n/* LIGHT-THEME:END */\n'
newcss = css.rstrip('\n') + '\n' + block
H = H[:a] + newcss + H[b:]
open('index.html', 'w', encoding='utf-8').write(H)
print('правил:', out.count('{'), 'строк:', out.count('\n') + 1)
