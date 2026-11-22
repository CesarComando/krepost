# Пересборка книг из PDF (не входит в сайт)

Исходников книг (LibreOffice) нет, поэтому книги на 9 языках (кроме RU и EN) пересобираются из самих PDF.

1. `python3 extract.py ../../books/<книга>.pdf <lang>` — PDF → `<lang>/body.html`, картинки, обложка (скопируйте `body.html` в `body.orig.html`).
2. `python3 apply.py <lang>` — правки из `edits_<lang>.py` → `<lang>/body.html` (здесь правки от 22.11.2026).
3. `node render.js <lang> <lang>` — HTML → `out.pdf` (Playwright + Chromium; шрифты Lora, Liberation Serif, Carlito, Noto CJK). Для ZH положите `zh-extra.css` как `zh/extra.css`.
4. `python3 finish.py <lang> <lang>/final.pdf ../../books/<книга>.pdf` — ставит исходную обложку и метаданные.
5. `python3 grid.py <pdf> prev 1 12` — сетка страниц для проверки глазами.
