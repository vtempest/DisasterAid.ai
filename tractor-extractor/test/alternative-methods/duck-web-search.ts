import fetchText from '../lib/fetch';
/**
 * Search Duck Duck Go general web search for query
 * @param query The query to search with
 * @returns Search results
 * @throws {Error} If the query is empty or an error occurs while searching
 */
export default async function search({query}): Promise {
  if (!query) throw new Error('Query cannot be empty!');
  var options = defaultOptions;

  let vqd = options.vqd!;
  if (!vqd) vqd = await getVQD(query, 'web');

  /* istanbul ignore next */
  const queryObject: Record<string, string> = {
    q: query,
    ...(options.safeSearch !== SafeSearchType.STRICT ? { t: 'D' } : {}),
    l: options.locale!,
    ...(options.safeSearch === SafeSearchType.STRICT ? { p: '1' } : {}),
    kl: options.region || 'wt-wt',
    s: String(options.offset),
    dl: 'en',
    ct: 'US',
    ss_mkt: options.marketRegion!,
    df: options.time! as string,
    vqd,
    ...(options.safeSearch !== SafeSearchType.STRICT ? { ex: String(options.safeSearch) } : {}),
    sp: '1',
    bpa: '1',
    biaexp: 'b',
    msvrtexp: 'b',
    ...(options.safeSearch === SafeSearchType.STRICT
      ? {
          videxp: 'a',
          nadse: 'b',
          eclsexp: 'a',
          stiaexp: 'a',
          tjsexp: 'b',
          related: 'b',
          msnexp: 'a'
        }
      : {
          nadse: 'b',
          eclsexp: 'b',
          tjsexp: 'b'
          // cdrexp: 'b'
        })
  };

  var response = await (await fetch(`https://links.duckduckgo.com/d.js?${queryString(queryObject)}`)).text();

  if ((response).includes('DDG.deep.is506')) throw new Error('A server error occurred!');
  if (response.includes('DDG.deep.anomalyDetectionBlock'))
    throw new Error('DDG detected an anomaly in the request, you are likely making requests too quickly.');

  
  const SEARCH_REGEX = /DDG\.pageLayout\.load\('d',(\[.+\])\);DDG\.duckbar\.load\('images'/;
  
  const searchResults = SEARCH_REGEX.exec(response) ?
     JSON.parse(SEARCH_REGEX.exec(response)![1].replace(/\t/g, '    ')) 
     : [];

  // check for no results
  if (searchResults.length === 1 && !('n' in searchResults[0])) {
    const onlyResult = searchResults[0] 
    /* istanbul ignore next */
    if ((!onlyResult.da && onlyResult.t === 'EOF') || !onlyResult.a || onlyResult.d === 'google.com search')
      return {
        noResults: true,
        vqd,
        results: []
      };
  }

  const results = []

  // Populate search results
  for (const search of searchResults) {
    if ('n' in search) continue;
    results.push({
      title: search.t,
      description: JSON.parse(JSON.stringify(search.a)),
      url: search.u,
    });
  }

  var next_words = await autocomplete(query);

  

  return { results, next_words };
}


/** An auto-complete term. */
export interface AutocompleteTerm {
  /** The phrase of the auto-completed term. */
  phrase: string;
}

/** An auto-complete bang. */
export interface AutocompleteBang {
  /** The image of the bang */
  image: string;
  /** The prefix of the bang. */
  phrase: string;
  score: number;
  /** The title of the bang. */
  snippet: string;
}

export type AutocompleteResult = AutocompleteTerm | AutocompleteBang;

/**
 * Get auto-complete terms from a query.
 * @category Search
 * @param query The query to search
 * @param region The region to search as
 * @param needleOptions The options of the HTTP request
 * @returns Autocomplete terms
 */
export async function autocomplete(query: string, region?: string): Promise<AutocompleteResult[]> {
  if (!query) throw new Error('Query cannot be empty!');

  const queryObject: Record<string, string> = {
    q: query,
    kl: region || 'wt-wt'
  };

  var response = await fetchText(`https://duckduckgo.com/ac/?${queryString(queryObject)}`);

  var next_words = JSON.parse(response)?.map( ({phrase}) => phrase);

  return next_words;
}



export const VQD_REGEX = /vqd=['"](\d+-\d+(?:-\d+)?)['"]/;

/** The safe search values when searching DuckDuckGo. */
export enum SafeSearchType {
  /** Strict filtering, no NSFW content. */
  STRICT = 0,
  /** Moderate filtering. */
  MODERATE = -1,
  /** No filtering. */
  OFF = -2
}

/** The type of time ranges of the search results in DuckDuckGo. */
export enum SearchTimeType {
  /** From any time. */
  ALL = 'a',
  /** From the past day. */
  DAY = 'd',
  /** From the past week. */
  WEEK = 'w',
  /** From the past month. */
  MONTH = 'm',
  /** From the past year. */
  YEAR = 'y'
}
export function queryString(query: Record<string, string>) {
  return new URLSearchParams(query).toString();
}


/**
 * Get the VQD of a search query.
 * @param query The query to search
 * @param ia The type(?) of search
 * @param options The options of the HTTP request
 * @returns The VQD
 */
export async function getVQD(query: string) {
  try {
    var url = `https://duckduckgo.com/?${queryString({ q: query, ia: 'web' })}`;

    const response = await ((await fetch( url ))).text();
    return VQD_REGEX.exec(response)[1];
  } catch (e) {
    console.error(e);
    throw new Error(`Failed to get the VQD for query "${query}".`);
  }
}


export function parseSpiceBody(body: any, regex = /^ddg_spice_[\w]+\(\n?((?:.|\n)+)\n?\);?/) {
  return JSON.parse(regex.exec(body.toString())![1]);
}


/** The options for {@link search}. */
export interface SearchOptions {
  /** The safe search type of the search. */
  safeSearch?: SafeSearchType;
  /** The time range of the searches, can be a SearchTimeType or a date range ("2021-03-16..2021-03-30") */
  time?: SearchTimeType | string;
  /** The locale(?) of the search. Defaults to "en-us". */
  locale?: string;
  /** The region of the search. Defaults to "wt-wt" or all regions. */
  region?: string;
  /** The market region(?) of the search. Defaults to "US". */
  marketRegion?: string;
  /** The number to offset the results to. */
  offset?: number;
  /**
   * The string that acts like a key to a search.
   * Set this if you made a search with the same query.
   */
  vqd?: string;
}

const defaultOptions: SearchOptions = {
  safeSearch: SafeSearchType.OFF,
  time: SearchTimeType.ALL,
  locale: 'en-us',
  region: 'wt-wt',
  offset: 0,
  marketRegion: 'us'
};


