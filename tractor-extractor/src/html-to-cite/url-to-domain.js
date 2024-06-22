
/**
   * Extract TLD and hostname from domain in Regex 
   * There's one or two part TLDs so it is hard to tell 
   * if host.secondTLD.tld or host.tld is correct way to extract hostname
   
   https://wiki.mozilla.org/TLD_List
    https://en.wikipedia.org/wiki/List_of_Internet_top-level_domains
   * @param {string} domain 
   * @returns {object} {tld: string, domainWithoutSuffix: string, subdomains: string}
   */
export function extractRootDomainRegex(domain) {
  var tldRegExp = new RegExp(
    "(?=[^^]).(fr|de|cz|at|com|wiki|co|edu|g ov|info|mil|id|"+
    "gv|tv|int|name|net|org|pro|ac|me|ltd|parliament)(.|$).*$"
  );
  var match =
    domain.match(tldRegExp) ||
    domain.match(/(?=[^^])\.[^a-z]{1,2}\.[^\.]{2,4}$/) ||
    domain.match(/\.[^\.]{2,}$/);
  var tld = match && match.index;
  var domainWithoutSuffix = domain.substring(0, tld);
  if (domainWithoutSuffix.includes("."))
    domainWithoutSuffix = domainWithoutSuffix.split(".").pop();
  return domainWithoutSuffix;
}


/**
 * Extracts domain from url without subdomain like bbc.co.uk
 * @param {string} url 
 * @returns domain without subdomain
 */
export function extractRootDomain(url) {  

  var match = url.match(/([^.]+(?:(?:\.[^.]{2,3}){1,2}|\.[^.]+))$/gm)
  return match && match[0]
  //find & remove protocol (http, ftp, etc.) and get hostname
  var hostname = url.indexOf("//") > -1 ? url.split('/')[2]
    : url.split('/')[0];

  //find & remove port number
  hostname = hostname.split(':')[0];
  //find & remove "?"
  var domain = hostname.split('?')[0];
  var splitArr = domain.split('.'),
  arrLen = splitArr.length;

  //if there is a subdomain
  if (arrLen > 2) 
    domain = splitArr[arrLen - 2] + '.' + splitArr[arrLen - 1];
  
  //check to see if it's using a Country Code Top Level Domain (ccTLD) (i.e. ".me.uk")
  if (arrLen > 2  && splitArr[arrLen - 2].length == 2 && splitArr[arrLen - 1].length == 2) 
    //this is using a ccTLD
    domain = splitArr[arrLen - 3] + '.' + domain;
 
  return domain;
}