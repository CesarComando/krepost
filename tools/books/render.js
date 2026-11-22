// usage: node render.js dir lang  -> dir/out.pdf (page 1 blank, removed later)
const { chromium } = require('playwright');
const fs = require('fs'); const path = require('path');
(async () => {
  const dir = path.resolve(process.argv[2]);
  const lang = process.argv[3] || 'en';
  const extraCss = fs.existsSync(dir + '/extra.css') ? fs.readFileSync(dir + '/extra.css', 'utf8') : '';
  const body = fs.readFileSync(dir + '/body.html', 'utf8');
  const css = fs.readFileSync(__dirname + '/style.css', 'utf8');
  const hdr = fs.readFileSync(dir + '/header.txt', 'utf8').trim();
  const html = `<!doctype html><html lang="${lang}"><head><meta charset="utf-8"><style>${css}\n${extraCss}</style></head><body><div class="first"></div>\n${body}</body></html>`;
  fs.writeFileSync(dir + '/book.html', html);
  const b = await chromium.launch(); const p = await b.newPage();
  await p.goto('file://' + dir + '/book.html'); await p.waitForTimeout(500);
  const ff = lang === 'zh' ? "'Noto Sans CJK SC'" : 'Carlito';
  await p.pdf({ path: dir + '/out.pdf', format: 'A4', printBackground: true, displayHeaderFooter: true, preferCSSPageSize: true,
    headerTemplate: `<div style="width:100%;font-family:${ff},sans-serif;font-size:8pt;color:#6b6b6b;text-align:right;padding:0 65pt;margin-top:27pt">${hdr.replace(/ · /g,'&nbsp;&nbsp;·&nbsp;&nbsp;')}</div>`,
    footerTemplate: `<div style="width:100%;font-family:${ff},sans-serif;font-size:9pt;color:#6b6b6b;text-align:center;margin-bottom:34pt"><span class="pageNumber"></span></div>` });
  await b.close();
})();
