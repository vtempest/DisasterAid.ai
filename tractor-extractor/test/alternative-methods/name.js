import fs from "fs";

var enumTypes = ["last", "male", "female", "neutral", "multipos"];

async function getCommonNames() {
  var commonNamesUrls = [
    "https://raw.githubusercontent.com/righteousgambit/quiet-riot/main/wordlists/familynames-usa-top1000.txt",
    "https://raw.githubusercontent.com/righteousgambit/quiet-riot/main/wordlists/malenames-usa-top1000.txt",
    "https://raw.githubusercontent.com/righteousgambit/quiet-riot/main/wordlists/femalenames-usa-top1000.txt",
  ];

  var commonNames = {};
  for (var urlIndex in commonNamesUrls) {
    var url = commonNamesUrls[urlIndex];
    var response = await (await fetch(url)).text();

    response
      .split(/[\r\n]/)
      .map((name) => name[0].toUpperCase() + name.slice(1).toLowerCase())
      .forEach((name, popularity) => {
        if (!commonNames[name]) commonNames[name] = [];
        commonNames[name].push([Number(urlIndex), popularity]);
      });
  }
  var tolerance = 250;

  var commonNamesSort = {};

  Object.entries(commonNames)
    .map(([name, popularity]) => ({ name, popularity }))
    .map(({ name, popularity }) => {
      var type;
      //if only on one list, about 2500
      if (popularity.length == 1) {
        type = popularity[0][0];
        return { name, type };
      }

      var mpop = popularity.filter(([type]) => type == 1);
      mpop = mpop.length ? mpop[0][1] : null;

      var fpop = popularity.filter(([type]) => type == 2);

      fpop = fpop.length ? fpop[0][1] : null;

      var lpop = popularity.filter(([type]) => type == 0);
      lpop = lpop.length ? lpop[0][1] : null;

      var topFirstnamePop = Math.min(mpop, fpop);
      if (topFirstnamePop && lpop) var firstLastWeight = topFirstnamePop - lpop;

      if (mpop && fpop) var genderWeight = fpop - mpop;

      //multi-positional name like James Kelly Jordan Lee Kim Francis
      if (firstLastWeight > -tolerance && firstLastWeight < tolerance)
        type = 4; //multipos
      else if (firstLastWeight > 0) type = 0; //last
      else if (genderWeight > -tolerance && genderWeight < tolerance)
        type = 3; //gender neutral
      else if (genderWeight > 0) type = 1; //male
      else type = 2; //female

      // var  popularity = popularity.sort((a,b)=>b[1]-a[1])
      return { name, type };
    })
    .filter(Boolean)
    // .filter(({type})=>type>2)
    // .sort((a, b)=>a.name-b.name) // sort alphabetically or preserve popularity
    .forEach(({ name, type }) => {
      if (!commonNamesSort[name]) commonNamesSort[name] = [];
      commonNamesSort[name] = type;
    });

  return commonNamesSort;
}

// var res = fs.readFileSync("./src/cite-parser/commonNames.json", "utf8");
// res = JSON.parse(res)
var res = await getCommonNames();

export function checkName(name) {
  //standardize name as Title Case
  name = name[0].toUpperCase() + name.slice(1).toLowerCase();

  return res[name] != null ? enumTypes[res[name]] : false;
}

// console.log(checkName("John", res));

fs.writeFileSync("./src/cite-parser/commonNames.json", JSON.stringify(res))

function parseFullName(nameToParse, partToReturn, fixCase, stopOnError) {
  var i,
    j,
    l,
    m,
    n,
    part,
    comma,
    titleList,
    suffixList,
    prefixList,
    regex,
    partToCheck,
    partFound,
    partsFoundCount,
    firstComma,
    remainingCommas,
    nameParts = [],
    nameCommas = [null],
    partsFound = [],
    conjunctionList = ["&", "and", "et", "e", "of", "the", "und", "y"],
    parsedName = {
      title: "",
      first: "",
      middle: "",
      last: "",
      nick: "",
      suffix: "",
      error: [],
    };

  // Validate inputs, or set to defaults
  partToReturn =
    partToReturn &&
    ["title", "first", "middle", "last", "nick", "suffix", "error"].indexOf(
      partToReturn.toLowerCase()
    ) > -1
      ? partToReturn.toLowerCase()
      : "all";


  // Initilize lists of prefixs, suffixs, and titles to detect
  // Note: These list entries must be all lowercase

  suffixList = [
    "jr",
    "jnr",
    "sr",
    "snr",
    "ii",
    "iii",
    "iv",
    "md",
    "phd",
  ];
  prefixList = [
    "ab",
    "bar",
    "bin",
    "da",
    "dal",
    "de",
    "de la",
    "del",
    "della",
    "der",
    "di",
    "du",
    "ibn",
    "l'",
    "la",
    "le",
    "san",
    "st",
    "st.",
    "ste",
    "ter",
    "van",
    "van de",
    "van der",
    "van den",
    "vel",
    "ver",
    "vere",
    "von",
  ];
  titleList = [
    "dr",
    "miss",
    "mr",
    "mrs",
    "ms",
    "prof",
    "sir",
  ];

  // Nickname: remove and store parts with surrounding punctuation as nicknames
  regex =
    /\s(?:[‘’']([^‘’']+)[‘’']|[“”"]([^“”"]+)[“”"]|\[([^\]]+)\]|\(([^\)]+)\)),?\s/g;
  partFound = (" " + nameToParse + " ").match(regex);
  if (partFound) partsFound = partsFound.concat(partFound);
  partsFoundCount = partsFound.length;
  if (partsFoundCount === 1) {
    parsedName.nick = partsFound[0].slice(2).slice(0, -2);
    if (parsedName.nick.slice(-1) === ",") {
      parsedName.nick = parsedName.nick.slice(0, -1);
    }
    nameToParse = (" " + nameToParse + " ").replace(partsFound[0], " ").trim();
    partsFound = [];
  } else if (partsFoundCount > 1) {
    handleError(partsFoundCount + " nicknames found");
    for (i = 0; i < partsFoundCount; i++) {
      nameToParse = (" " + nameToParse + " ")
        .replace(partsFound[i], " ")
        .trim();
      partsFound[i] = partsFound[i].slice(2).slice(0, -2);
      if (partsFound[i].slice(-1) === ",") {
        partsFound[i] = partsFound[i].slice(0, -1);
      }
    }
    parsedName.nick = partsFound.join(", ");
    partsFound = [];
  }
  if (!nameToParse.trim().length) {
    parsedName = fixParsedNameCase(parsedName, fixCase);
    return partToReturn === "all" ? parsedName : parsedName[partToReturn];
  }

  // Split remaining nameToParse into parts, remove and store preceding commas
  for (i = 0, n = nameToParse.split(" "), l = n.length; i < l; i++) {
    part = n[i];
    comma = null;
    if (part.slice(-1) === ",") {
      comma = ",";
      part = part.slice(0, -1);
    }
    nameParts.push(part);
    nameCommas.push(comma);
  }

  // Suffix: remove and store matching parts as suffixes
  for (l = nameParts.length, i = l - 1; i > 0; i--) {
    partToCheck =
      nameParts[i].slice(-1) === "."
        ? nameParts[i].slice(0, -1).toLowerCase()
        : nameParts[i].toLowerCase();
    if (
      suffixList.indexOf(partToCheck) > -1 ||
      suffixList.indexOf(partToCheck + ".") > -1
    ) {
      partsFound = nameParts.splice(i, 1).concat(partsFound);
      if (nameCommas[i] === ",") {
        // Keep comma, either before or after
        nameCommas.splice(i + 1, 1);
      } else {
        nameCommas.splice(i, 1);
      }
    }
  }
  partsFoundCount = partsFound.length;
  if (partsFoundCount === 1) {
    parsedName.suffix = partsFound[0];
    partsFound = [];
  } else if (partsFoundCount > 1) {
    handleError(partsFoundCount + " suffixes found");
    parsedName.suffix = partsFound.join(", ");
    partsFound = [];
  }
  if (!nameParts.length) {
    parsedName = fixParsedNameCase(parsedName, fixCase);
    return partToReturn === "all" ? parsedName : parsedName[partToReturn];
  }

  // Title: remove and store matching parts as titles
  for (l = nameParts.length, i = l - 1; i >= 0; i--) {
    partToCheck =
      nameParts[i].slice(-1) === "."
        ? nameParts[i].slice(0, -1).toLowerCase()
        : nameParts[i].toLowerCase();
    if (
      titleList.indexOf(partToCheck) > -1 ||
      titleList.indexOf(partToCheck + ".") > -1
    ) {
      partsFound = nameParts.splice(i, 1).concat(partsFound);
      if (nameCommas[i] === ",") {
        // Keep comma, either before or after
        nameCommas.splice(i + 1, 1);
      } else {
        nameCommas.splice(i, 1);
      }
    }
  }
  partsFoundCount = partsFound.length;
  if (partsFoundCount === 1) {
    parsedName.title = partsFound[0];
    partsFound = [];
  } else if (partsFoundCount > 1) {
    handleError(partsFoundCount + " titles found");
    parsedName.title = partsFound.join(", ");
    partsFound = [];
  }
  if (!nameParts.length) {
    parsedName = fixParsedNameCase(parsedName, fixCase);
    return partToReturn === "all" ? parsedName : parsedName[partToReturn];
  }

  // Join name prefixes to following names
  if (nameParts.length > 1) {
    for (i = nameParts.length - 2; i >= 0; i--) {
      if (prefixList.indexOf(nameParts[i].toLowerCase()) > -1) {
        nameParts[i] = nameParts[i] + " " + nameParts[i + 1];
        nameParts.splice(i + 1, 1);
        nameCommas.splice(i + 1, 1);
      }
    }
  }

  // Join conjunctions to surrounding names
  if (nameParts.length > 2) {
    for (i = nameParts.length - 3; i >= 0; i--) {
      if (conjunctionList.indexOf(nameParts[i + 1].toLowerCase()) > -1) {
        nameParts[i] =
          nameParts[i] + " " + nameParts[i + 1] + " " + nameParts[i + 2];
        nameParts.splice(i + 1, 2);
        nameCommas.splice(i + 1, 2);
        i--;
      }
    }
  }

  // Suffix: remove and store items after extra commas as suffixes
  nameCommas.pop();
  firstComma = nameCommas.indexOf(",");
  remainingCommas = nameCommas.filter(function (v) {
    return v !== null;
  }).length;
  if (firstComma > 1 || remainingCommas > 1) {
    for (i = nameParts.length - 1; i >= 2; i--) {
      if (nameCommas[i] === ",") {
        partsFound = nameParts.splice(i, 1).concat(partsFound);
        nameCommas.splice(i, 1);
        remainingCommas--;
      } else {
        break;
      }
    }
  }
  if (partsFound.length) {
    if (parsedName.suffix) {
      partsFound = [parsedName.suffix].concat(partsFound);
    }
    parsedName.suffix = partsFound.join(", ");
    partsFound = [];
  }

  // Last name: remove and store last name
  if (remainingCommas > 0) {
    if (remainingCommas > 1) {
      handleError(remainingCommas - 1 + " extra commas found");
    }
    // Remove and store all parts before first comma as last name
    if (nameCommas.indexOf(",")) {
      parsedName.last = nameParts.splice(0, nameCommas.indexOf(",")).join(" ");
      nameCommas.splice(0, nameCommas.indexOf(","));
    }
  } else {
    // Remove and store last part as last name
    parsedName.last = nameParts.pop();
  }
  if (!nameParts.length) {
    parsedName = fixParsedNameCase(parsedName, fixCase);
    return partToReturn === "all" ? parsedName : parsedName[partToReturn];
  }

  // First name: remove and store first part as first name
  parsedName.first = nameParts.shift();
  if (!nameParts.length) {
    parsedName = fixParsedNameCase(parsedName, fixCase);
    return partToReturn === "all" ? parsedName : parsedName[partToReturn];
  }

  // Middle name: store all remaining parts as middle name
  if (nameParts.length > 2) {
    handleError(nameParts.length + " middle names");
  }
  parsedName.middle = nameParts.join(" ");

  parsedName = fixParsedNameCase(parsedName, fixCase);
  return partToReturn === "all" ? parsedName : parsedName[partToReturn];
}
