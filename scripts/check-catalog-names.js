const ts = require('typescript');
const fs = require('fs');
const path = require('path');

const tsCode = fs.readFileSync(path.join(__dirname, '../lib/products.ts'), 'utf8');
const jsCode = ts.transpileModule(tsCode, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 }
}).outputText;

const tempFilePath = path.join(__dirname, 'temp-check-products.js');
fs.writeFileSync(tempFilePath, jsCode);

const { products } = require('./temp-check-products.js');
fs.unlinkSync(tempFilePath);

console.log("Products Catalog in products.ts:\n");
products.forEach((p, idx) => {
  console.log(`${idx + 1}. Slug: "${p.slug}" | Name: "${p.name}" | Image: "${p.image}"`);
});
