import { describe, it, expect } from "vitest";

import { parse, getDomain  } from "tldts";
import { extractRootDomainRegex, extractRootDomain } from "../src/html-to-cite/url-to-domain";

const url_edge_cases = [
  "x.com",
  "bbc.co.uk",
  "un.int",
  "example.com.au",
  "ap.org",
  "abc.go.com",
  "http://www.blog.classroom.me.uk/index.php",
  "http://www.youtube.com/watch?v=ClkQA2Lb_iE",
  "https://www.youtube.com/watch?v=ClkQA2Lb_iE",
  "www.youtube.com/watch?v=ClkQA2Lb_iE",
  "websitename.com:1234/dir/file.txt",
  "ftps://websitename.com:1234/dir/file.txt",
  "example.com?param=value",
  "https://facebook.github.io/jest/",
  "//youtube.com/watch?v=ClkQA2Lb_iE",
  "b.c.kobe.jp",
  "a.d.kyoto.go.jp",
  "http://localhost:4200/watch?v=ClkQA2Lb_iE",
];

//run benchmarks 100k times on all urls
function runBenchmark(functionToTest) {
  var start = Date.now();
  for (var i = 0; i < 100000; i++) 
    url_edge_cases.map(functionToTest);
  var elapsed = Date.now() - start;


  console.log(`${functionToTest.name} completed in: ${Math.floor(elapsed/10)/100}s`)
  return elapsed
}

describe(" url to root domain ", ()=>{

    it("benchmarking methods", ()=>{
      return 1

        // run the benchmarks
        var method1 = runBenchmark(extractRootDomain);
      var method2 = runBenchmark(parse);
        var method3 = runBenchmark(getDomain );
 
        expect(method3).toBeLessThan(method2)


    }, 20000)

})
