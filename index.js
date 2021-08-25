const got = require("got");
var $ = require("cheerio");
if (typeof $ != "function") $ = require("cheerio").default;

(async () => {
  const params = {
    api_key: process.env.API_KEY,
    url: "https://www.google.com/search?q=nodejs&rlz=1C1SQJL_enIN868IN868&sxsrf=ALeKk02RH-cC7gVME2VFhnoh0oQcm6JEyA%3A1629704713975&ei=CVIjYcrxOv_H4-EPubi9wAk&oq=nodejs&gs_lcp=Cgdnd3Mtd2l6EAMyBAgjECcyBAgjECcyBAgjECcyCggAEIAEEIcCEBQyCAgAEIAEELEDMgcIABCABBAKMgUIABCABDIFCAAQgAQyBQgAEIAEMgUIABCABDoHCAAQRxCwAzoHCAAQsAMQQzoGCAAQBxAeOggIABAHEAoQHjoKCAAQsQMQgwEQCkoECEEYAFCeE1jAJGCEKmgCcAF4AIABqwOIAZEOkgEHMi00LjEuMZgBAKABAcgBCsABAQ&sclient=gws-wiz&ved=0ahUKEwiKmsKU08byAhX_4zgGHTlcD5gQ4dUDCA4&uact=5",
    country: "US",
  };

  const response = await got(
    process.env.API_URL,
    { searchParams: params }
  );

  const html = response.body;
  const length = $("h3.LC20lb.DKV0Md", html).length;
  const links = [];
  const headings = [];

  for (let i = 0; i < length; i++) {
    links.push($(".yuRUbf > a", html)[i].attribs.href);
    headings.push($("h3.LC20lb.DKV0Md", html)[i].children[0].data);
  }

  function print(links, headings) {
    for(let i = 0; i < length; i++) {
      console.log(`${i+1}. ${headings[i]} :- ${links[i]}`);
    }
  }
  
  print(links, headings);
})();

