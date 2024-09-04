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
  getJav321PosterUrl,
  getJav321CoverUrl,
  getJav321ScreenshotUrl,
} from "./getJav321Scraper";
import { logger } from "../../utils";
import { Source, MovieData } from "../../types";
export async function getJav321Data(url: string | null): Promise<MovieData> {
  const source: Source = "jav321";
  const movieDataObject: MovieData = {
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
    Label: null,
    Tag: null,
    Rating: null,
    Director: null,
    Actress: null,
    Genre: null,
    PosterUrl: null,
    CoverUrl: null,
    ScreenshotUrl: null,
    TrailerUrl: null,
  };
  if (!url) {
    return movieDataObject;
  }
  try {
    logger.debug({ source, url, msg: "start scraping" });
    const response = await fetch(url);
    const webContent = await response.text();
    logger.debug({ source, url, msg: "success scraping" });
    return {
      ...movieDataObject,
      Id: getJav321Id(webContent),
      ContentId: getJav321Id(webContent),
      Title: getJav321Title(webContent),
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
      PosterUrl: getJav321PosterUrl(webContent),
      CoverUrl: getJav321CoverUrl(webContent),
      ScreenshotUrl: null,
      TrailerUrl: null,
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      logger.error({
        source,
        url,
        msg: "failure scraping",
        error,
      });
    }
  }

  return movieDataObject;
}
