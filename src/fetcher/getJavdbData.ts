import fetch from "node-fetch";
import {
  getJavdbId,
  getJavdbTitle,
  getJavdbReleaseDate,
  getJavdbReleaseYear,
  getJavdbRuntime,
  getJavdbSeries,
  getJavdbDirector,
  getJavdbMaker,
  getJavdbActress,
  getJavdbGenre,
  getJavdbCoverUrl,
  getJavdbRating,
  getJavdbScreenshotUrl,
  getJavdbTrailerUrl,
} from "../scraper/scraperJavdb.js";
import { writeJVLog } from "../utils/writeJVLog.js";
import { Source, MovieData } from "../types/index";

export async function getJavdbData(url: string | null): Promise<MovieData> {
  if (!url) {
    return null;
  }
  const source: Source = "javdb";
  let movieDataObject: MovieData = {
    Source: source,
    Url: url,
    Id: null,
    ContentId: null,
    Title: null,
    Description: null,
    ReleaseDate: null,
    ReleaseYear: null,
    Runtime: null,
    Series: null,
    Maker: null,
    Rating: null,
    Directors: null,
    Actress: null,
    Genre: null,
    CoverUrl: null,
    ScreenshotUrl: null,
    TrailerUrl: null,
  };

  try {
    writeJVLog("Debug", `[${source}] Performing on URL [${url}]`);
    const response = await fetch(url);
    const webContent = await response.text();
    movieDataObject = {
      Source: source,
      Url: url,
      Id: getJavdbId(webContent),
      ContentId: getJavdbId(webContent),
      Title: getJavdbTitle(webContent),
      Description: null,
      ReleaseDate: getJavdbReleaseDate(webContent),
      ReleaseYear: getJavdbReleaseYear(webContent),
      Runtime: getJavdbRuntime(webContent),
      Directors: getJavdbDirector(webContent),
      Maker: getJavdbMaker(webContent),
      Series: getJavdbSeries(webContent),
      Rating: getJavdbRating(webContent),
      Actress: getJavdbActress(webContent),
      Genre: getJavdbGenre(webContent),
      CoverUrl: getJavdbCoverUrl(webContent),
      ScreenshotUrl: getJavdbScreenshotUrl(webContent),
      TrailerUrl: getJavdbTrailerUrl(webContent),
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
