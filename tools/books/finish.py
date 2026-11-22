# usage: finish.py dir out.pdf  -> cover + out.pdf pages 2..N
import sys, pymupdf as fitz
d = sys.argv[1]
cov = fitz.open(d + '/cover.pdf'); body = fitz.open(d + '/out.pdf')
res = fitz.open(); res.insert_pdf(cov); res.insert_pdf(body, from_page=1)
src = fitz.open(sys.argv[3]) if len(sys.argv) > 3 else None
if src: res.set_metadata({k: v for k, v in src.metadata.items() if k in ('title', 'author', 'subject', 'keywords')} | {'creator': 'Dinaburga 1810 book builder', 'producer': 'Chromium'})
res.save(sys.argv[2], garbage=4, deflate=True)
print(sys.argv[2], res.page_count)
