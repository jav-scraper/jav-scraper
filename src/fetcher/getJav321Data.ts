import fetch from "node-fetch";
import {
  getJav321Id,
  getJav321Title,
  getJav321Description,
  getJav321ReleaseDate,
  getJav321ReleaseYear,
  getJav321Runtime,
  getJav321Series,
  getJav321Maker,
  getJav321Actress,
  getJav321Genre,
  getJav321CoverUrl,
  getJav321ScreenshotUrl,
} from "../scraper/scraperJav321.js";
import { writeJVLog } from "../utils/writeJVLog.js";
import { Source, MovieData } from "../types/index";

export async function getJav321Data(
  url: string | null
): Promise<MovieData | null> {
  if (!url) {
    return null;
  }
  const source: Source = "jav321";
  let movieDataObject: MovieData = {};

  try {
    writeJVLog("Debug", `[${source}] Performing on URL [${url}]`);
    const response = await fetch(url);
    const webContent = await response.text();

    movieDataObject = {
      Source: source,
      Url: url,
      Id: getJav321Id(webContent),
      Title: getJav321Title(webContent),
      Description: getJav321Description(webContent),
      ReleaseDate: getJav321ReleaseDate(webContent),
      ReleaseYear: getJav321ReleaseYear(webContent),
      Runtime: getJav321Runtime(webContent),
      Series: getJav321Series(webContent),
      Maker: getJav321Maker(webContent),
      Actress: getJav321Actress(webContent),
      Genre: getJav321Genre(webContent),
      CoverUrl: getJav321CoverUrl(webContent),
      ScreenshotUrl: getJav321ScreenshotUrl(webContent),
    };

    writeJVLog(
      "Debug",
      `[${source}] Success: ${JSON.stringify(movieDataObject, null, 2)}`
    );
    return movieDataObject;
  } catch (error: unknown) {
    if (error instanceof Error) {
      writeJVLog("Error", `[${source}] Error: [${url}]: ${error.message}`);
    }
  }

  return movieDataObject;
}
