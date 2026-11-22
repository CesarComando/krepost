import sys, subprocess, glob, os
from PIL import Image
pdf, prefix, first, last = sys.argv[1], sys.argv[2], int(sys.argv[3]), int(sys.argv[4])
for f in glob.glob(prefix + '-*.png'): os.remove(f)
subprocess.run(['pdftoppm', '-r', sys.argv[5] if len(sys.argv) > 5 else '40', '-png', '-f', str(first), '-l', str(last), pdf, prefix])
fs = sorted(glob.glob(prefix + '-*.png'))
ims = [Image.open(f) for f in fs]
w, h = ims[0].size
cols = 6 if len(ims) > 4 else len(ims)
rows = (len(ims) + cols - 1) // cols
m = Image.new('RGB', (w * cols, h * rows), 'white')
for i, im in enumerate(ims): m.paste(im, ((i % cols) * w, (i // cols) * h))
m.save(prefix + '_grid.png')
