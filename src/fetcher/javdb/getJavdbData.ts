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
  getJavdbPosterUrl,
  getJavdbCoverUrl,
  getJavdbRating,
  getJavdbScreenshotUrl,
  getJavdbTrailerUrl,
} from "./getJavdbScraper";
import { logger } from "../../utils";
import { Source, MovieData } from "../../types";

export async function getJavdbData(url: string | null): Promise<MovieData> {
  const source: Source = "javdb";
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
    logger.info({ source, url, msg: "start scraping" });
    const response = await fetch(url);
    const webContent = await response.text();
    logger.info({ source, url, msg: "success scraping" });
    return {
      ...movieDataObject,
      Url: url,
      Id: getJavdbId(webContent),
      ContentId: getJavdbId(webContent),
      Title: getJavdbTitle(webContent),
      Description: null,
      ReleaseDate: getJavdbReleaseDate(webContent),
      ReleaseYear: getJavdbReleaseYear(webContent),
      Runtime: getJavdbRuntime(webContent),
      Director: getJavdbDirector(webContent),
      Maker: getJavdbMaker(webContent),
      Series: getJavdbSeries(webContent),
      Rating: getJavdbRating(webContent),
      Actress: getJavdbActress(webContent),
      Genre: getJavdbGenre(webContent),
      PosterUrl: getJavdbPosterUrl(webContent),
      CoverUrl: getJavdbCoverUrl(webContent),
      ScreenshotUrl: getJavdbScreenshotUrl(webContent),
      TrailerUrl: getJavdbTrailerUrl(webContent),
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      logger.error({ source, url, error });
    }
  }

  return movieDataObject;
}
