import { parseHTML } from "linkedom";
import { YoutubeTranscript } from "youtube-transcript";
// import fetch from ("./utils/fetch");

/**
 * fetch youtube.com video's webpage HTML for embedded transcript
 * if blocked, use scraper of youtubetranscript.com
 * @param {string} videoUrl
 * @param {boolean} boolTimestamps - true to return timestamps, default true
 * @return {Object} {content, timestamps} where content is the full text of
 * the transcript, and timestamps is an array of [characterIndex, timeSeconds]
 */
export async function fetchYoutubeText(
  videoUrl,
  boolTimestamps = true
) {

  try {
    var transcript = await YoutubeTranscript.fetchTranscript(videoUrl);
  } catch (e) {
    console.log(e.message);
    transcript = await fetchViaYoutubeTranscript(videoUrl);
  }

  var content = "";
  var timestamps = [];
  transcript.forEach(({ offset, text }) => {
    if (boolTimestamps)
      timestamps.push([content.length, Math.floor(offset, 0)]);

    content += text + " ";
  });

  if (!boolTimestamps) return { content };

  content = content
    .replace(/&amp;#39;/g, "'")
  .replace(/&#39;/g, "'").replace(/&quot;/g, '"')

  var word_count = content.split(" ").length;
  return { content, timestamps, word_count, format: "video" };
}

/**
 * get youtubetranscript of most youtube videos,
 * except if disabled by uploader
 * fetch-based scraper of youtubetranscript.com
 *
 * @param {string} videoUrl
 * @return {Object} {content, timestamps} where content is the full text of
 * the transcript, and timestamps is an array of [characterIndex, timeSeconds]
 */
export async function fetchViaYoutubeTranscript(videoUrl) {
  const videoId = testYoutubeURL(videoUrl);

  const url = "https://youtubetranscript.com/?server_vid2=" + videoId;

  var html = await fetch(url)
  const { document } = parseHTML(html);

  return document
    .querySelectorAll("transcript text")
    .map((elem) => ({text: elem.textContent,
      offset: elem.getAttribute("data-start")}))

}

/**
 * Test if URL is to youtube video and return video id if true
 * @param {string} url - youtube video URL
 * @return {string|boolean} video ID or false
 */
export function testYoutubeURL(url) {
  var match = url.match(/(?:\/embed\/|v=|v\/|vi\/|youtu\.be\/|\/v\/|^https?:\/\/(?:www\.)?youtube\.com\/(?:(?:watch)?\?.*v=|(?:embed|v|vi|user)\/))([^#\&\?]*).*/)
  return match ? match[1] : false;
};

//get video cite info from url
//blocked in cloudflare-workers
async function getYoutubeInfo(videoUrl) {
  try {
    var info = await getBasicInfo(videoUrl);

    var videoInfo = await YouTube.getVideo(videoUrl);

    var { tags, title, description, durationFormatted, uploadedAt } = videoInfo;

    var source = videoInfo.channel.name;

    var date = chrono.parseDate(uploadedAt).toISOString().split("T")[0];

    return {
      title,
      url: videoUrl,
      source,
      date,
      duration: durationFormatted,
      tags,
      description,
    };
  } catch (e) {}
}
