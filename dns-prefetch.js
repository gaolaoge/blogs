const fs = require("fs");
const path = require("path");
const { parse } = require("node-html-parser");
const { glob } = require("glob");
const urlRegex = require("url-regex");

const buildPath = "example/dist";
const urlPattern = /(https?:\/\/[^/]*)/i;
const urls = new Set();

async function searchDomain() {
  const files = await glob(`${buildPath}/**/*.{html,css,js}`);
  for (let file of files) {
    const source = fs.readFileSync(file, "utf-8");
    const matches = source.match(urlRegex({ strict: true }));
    if (matches) {
      for (let url of matches) {
        const host = url.match(urlPattern);
        if (host && host[1]) {
          urls.add(host[1]);
        }
      }
    }
  }
}

async function insertLinks() {
  const files = await glob(`${buildPath}/**/*.html`);
  const links = [...urls].map(url => `<link red="dns-prefetch" href="${url}" />`).join("\n");

  for (const file of files) {
    const html = fs.readFileSync(file, "utf8");
    const root = parse(html);
    const head = root.querySelector("head");
    head.insertAdjacentHTML("afterbegin", links);
    fs.writeFileSync(file, root.toString());
  }
}

async function main() {
  await searchDomain();
  await insertLinks();
}

main();
