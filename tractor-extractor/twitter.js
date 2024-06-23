import { parseHTML } from "linkedom";
import fetch from "node-fetch";

async function getTwitterNews(query) {
  var url =
    "https://x.com/search?q=" +
    query.replace(/ /g, "%20") +
    "&src=typeahead_click&f=live";

  var response = await fetch(url);
  var html = await response.text();

  // console.log(html);
  const { document } = parseHTML(html);

  var tweets = Array.from(document.querySelectorAll("div"));
  // .map((i) =>
  //     i.parentNode.parentNode.parentNode.parentNode.parentNode.textContent
  // );

  return tweets;
}

// var query = "New Mexico wildfires";

// var tweets = await getTwitterNews(query);

// console.log(tweets);

export function mockTweets() {
  var resp = [
    "CommissarTrotsky@TrotskyOct1917·50mWildfires in New Mexico kill 2, damage or destroy 1,400 structuresWildfires in New Mexico kill 2, damage or destroy 1,400 structuresFrom wsws.org3",
    "Reality Matters-Whether You Believe In It Or Not@IainSim55659177·58mNew Mexico wildfires burn out of control as US battles under heat alertsyoutube.comNew Mexico wildfires burn out of control as US battles under heat...Wildfires in the US state of New Mexico continue to burn out of control after destroying more than 1,000 homes in the state.The entire population of one New ...7",
    "Devin Gilson@DevinDev39320·1hEscape from killer New Mexico wildfire was 'absolute sheer terror,’ woman says #NewsBreakEscape from killer New Mexico wildfire was 'absolute sheer terror,’ woman says - NewsBreakFrom newsbreak.com11",
    "Gary  Buckley™@myrddenbuckley·1hRecent rains and cooler weather have helped firefighters gain ground on two wildfires in southern New Mexico that have killed two people, destroyed hundreds of homes and forced thousands to flee.Rains, cooler weather help firefighters gain ground on large wildfires in southern New MexicoFrom apnews.com10",
    "TIME@TIME·2hRainy conditions were helping more than 1,000 firefighters gain ground on two wildfires in southern New Mexico on SaturdayNew Mexico Wildfires Latest: Rain Helps Firefighters' BattleFrom time.com494433K",
    "Manuel Lusquiños@ManuelLusquinos·3hEscape from killer New Mexico wildfire was 'absolute sheer terror,’ says woman who fled the flames https://yahoo.com/news/escape-killer-mexico-wildfire-absolute-231135549.html?soc_src=social-sh&soc_trk=tw&tsrc=twtr… via @YahooNewsEscape from killer New Mexico wildfire was 'absolute sheer terror,’ says woman who fled the flamesFrom yahoo.com2",
    "News That Matter@jay1stnewyorker·4hMultiple wildfires in Alaska, Washington, Oregon, New Mexico, Arizona into Mexico (situation worse than broadcasted on news). California wildfires have already burned 90,000 acres, and summer is just barely beginning \\nhttps://msn.com/en-us/weather/topstories/california-wildfires-have-already-burned-90-000-acres-and-summer-is-just-beginning/ar-BB1oGJpp?ocid=socialshare&pc=DCTS&cvid=bc4198e6169943a084c2fceba278e353&ei=51…21",
    "UrTuCulo @culo_ur·4hScenes of devastation emerge in New Mexico as ‘dangerous’ floods follow wildfiresScenes of devastation emerge in New Mexico as ‘dangerous’ floods follow wildfiresFrom independent.co.uk135",
    "KOAA News5@KOAA·4hTwo wildfires in New Mexico have forced thousands to evacuate, burned more than 1,000 structures, and killed at least one person. If you live in an area prone to wildfires, here’s what to consider having in a go bag in the case of an evacuation.\\n\\nMore at: https://koaa.com/science-and-tech/natural-disasters/at-least-1-dead-1-400-structures-burned-as-new-mexico-wildfires-rapidly-spread…14773",
    "13WHAM@13WHAM·4hNew Mexico wildfires claim life of musician; family recounts tragic search to find himNew Mexico wildfires claim life of musician; family recounts tragic search to find himFrom 13wham.com11.3K",
  ];
}
