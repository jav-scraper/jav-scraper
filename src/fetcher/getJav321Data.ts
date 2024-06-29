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
import { get } from "http";

export async function getJav321Data(url: string | null): Promise<MovieData> {
  const source: Source = "jav321";
  const movieDataObject: MovieData = {
    Source: source,
    Url: url,
    Id: null,
    ContentId: null,
    Title: null,
    AlternateTitle: null,
    Description: null,
    ReleaseDate: null,
    ReleaseYear: null,
    Runtime: null,
    Series: null,
    Maker: null,
    Label: null,
    Rating: null,
    Director: null,
    Actress: null,
    Genre: null,
    CoverUrl: null,
    ScreenshotUrl: null,
    TrailerUrl: null,
  };
  if (!url) {
    return movieDataObject;
  }
  try {
    writeJVLog("Debug", `[${source}] Performing on URL [${url}]`);
    const response = await fetch(url);
    const webContent = await response.text();

    writeJVLog(
      "Debug",
      `[${source}] Success: ${JSON.stringify(movieDataObject, null, 2)}`
    );
    return {
      ...movieDataObject,
      Id: getJav321Id(webContent),
      ContentId: getJav321Id(webContent),
      Title: getJav321Title(webContent),
      AlternateTitle: getJav321Title(webContent),
      Description: getJav321Description(webContent),
      ReleaseDate: getJav321ReleaseDate(webContent),
      ReleaseYear: getJav321ReleaseYear(webContent),
      Runtime: getJav321Runtime(webContent),
      Series: getJav321Series(webContent),
      Maker: getJav321Maker(webContent),
      Rating: null,
      Director: null,
      Actress: getJav321Actress(webContent),
      Genre: getJav321Genre(webContent),
      CoverUrl: getJav321CoverUrl(webContent),
      ScreenshotUrl: getJav321ScreenshotUrl(webContent),
      TrailerUrl: null,
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      writeJVLog("Error", `[${source}] Error: [${url}]: ${error.message}`);
    }
  }

  return movieDataObject;
}
