"""Книги крепости для приложения: превью (первые 7 страниц, открыто всем) и полная книга (зашифрована).

Зачем: полная книга открывается в приложении только после 70% прохождения (снимки + квесты + мозаики)
или покупается на Amazon. Чтобы её нельзя было просто скачать с GitHub или с сайта, в репозиторий
кладём не PDF, а зашифрованный файл .bin. Ключ лежит в index.html (BOOK_KEY) — это защита от случайного
скачивания, а не от программиста: кто разберётся в коде, сможет расшифровать.

Как обновить книги (новая версия PDF):
  1. Положить новые PDF в любую папку ВНЕ репозитория, имена как раньше (Dinaburga1810_book_RU.pdf и т. д.).
  2. python3 tools/books/make_books.py ПАПКА_С_PDF
  3. Закоммитить books/ и поднять версию в sw.js.
Сами PDF в репозиторий НЕ класть.
"""
import base64, os, re, sys
from pathlib import Path
from pypdf import PdfReader, PdfWriter
from pypdf.generic import DictionaryObject, NameObject
from cryptography.hazmat.primitives.ciphers.aead import AESGCM

ROOT = Path(__file__).resolve().parents[2]
PREVIEW_PAGES = 7
FILES = {  # язык → имя исходного PDF
    'ru': 'Dinaburga1810_book_RU.pdf', 'lv': 'Dinaburga1810_gramata_LV.pdf', 'en': 'Dinaburga1810_book_EN.pdf',
    'de': 'Dinaburga1810_Buch_DE.pdf', 'lt': 'Dinaburga1810_knyga_LT.pdf', 'pl': 'Dinaburga1810_ksiazka_PL.pdf',
    'et': 'Dinaburga1810_raamat_ET.pdf', 'fr': 'Dinaburga1810_livre_FR.pdf', 'it': 'Dinaburga1810_libro_IT.pdf',
    'es': 'Dinaburga1810_libro_ES.pdf', 'zh': 'Dinaburga1810_book_ZH.pdf',
}

def main(src_dir):
    src = Path(src_dir)
    html = (ROOT / 'index.html').read_text(encoding='utf-8')
    key = base64.b64decode(re.search(r"const BOOK_KEY = '([^']+)'", html).group(1))
    out = ROOT / 'books'; (out / 'preview').mkdir(parents=True, exist_ok=True)
    for lang, name in FILES.items():
        pdf = src / name
        if not pdf.exists(): print('нет файла', pdf); continue
        r = PdfReader(str(pdf)); w = PdfWriter()
        for p in r.pages[:PREVIEW_PAGES]:
            # У всех страниц общий список картинок книги — оставляем каждой странице только её картинки,
            # иначе превью весит как вся книга (и содержит все её иллюстрации).
            used = set(re.findall(rb'/([A-Za-z0-9_.]+)\s+Do\b', p.get_contents().get_data()))
            res = p['/Resources'].get_object()
            new_res = DictionaryObject({k: v for k, v in res.items() if k != '/XObject'})
            if '/XObject' in res:
                xo = res['/XObject'].get_object()
                new_res[NameObject('/XObject')] = DictionaryObject({k: v for k, v in xo.items() if k[1:].encode() in used})
            p[NameObject('/Resources')] = new_res
            w.add_page(p)
        w.add_metadata({'/Title': 'Dinaburga 1810 — preview'})
        for p in w.pages: p.compress_content_streams()
        w.compress_identical_objects(remove_duplicates=True, remove_unreferenced=True)
        prev = out / 'preview' / name.replace('.pdf', '_preview.pdf')
        with open(prev, 'wb') as f: w.write(f)
        nonce = os.urandom(12)
        data = nonce + AESGCM(key).encrypt(nonce, pdf.read_bytes(), None)
        (out / f'full_{lang}.bin').write_bytes(data)
        print(lang, 'превью', prev.stat().st_size // 1024, 'КБ, полная', len(data) // 1024, 'КБ')

if __name__ == '__main__':
    if len(sys.argv) != 2: sys.exit(__doc__)
    main(sys.argv[1])
