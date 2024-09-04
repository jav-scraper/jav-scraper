import fetch from "node-fetch";
import {
  getDmmTitle,
  getDmmDescription,
  getDmmReleaseDate,
  getDmmReleaseYear,
  getDmmRuntime,
  getDmmSeries,
  getDmmMaker,
  getDmmLabel,
  getDmmDirector,
  getDmmActress,
  getDmmGenre,
  getDmmPosterUrl,
  getDmmCoverUrl,
  getDmmScreenshotUrl,
} from "./getDmmScraper";
import { logger } from "../../utils";
import { Source, MovieData, Url } from "../../types";

export async function getDmmData(urlData: Url | undefined): Promise<MovieData> {
  const source: Source = "dmm";
  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    cookie:
      "age_check_done=1; expires=Fri, 31-Dec-9999 23:59:59 GMT; path=/; domain=.dmm.co.jp",
  };
  const url = urlData?.Url || null;
  const id = urlData?.Id || null;
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
    const response = await fetch(url, { method: "GET", headers });
    const webContent = await response.text();
    logger.debug({ source, url, msg: "success scraping" });
    return {
      ...movieDataObject,
      Id: id,
      ContentId: id,
      Title: getDmmTitle(webContent),
      Description: getDmmDescription(webContent),
      ReleaseDate: getDmmReleaseDate(webContent),
      ReleaseYear: getDmmReleaseYear(webContent),
      Runtime: getDmmRuntime(webContent),
      Series: getDmmSeries(webContent),
      Maker: getDmmMaker(webContent),
      Label: getDmmLabel(webContent),
      // Rating: null,
      Director: getDmmDirector(webContent),
      Actress: getDmmActress(webContent),
      Genre: getDmmGenre(webContent),
      PosterUrl: getDmmPosterUrl(webContent),
      CoverUrl: getDmmCoverUrl(webContent),
      ScreenshotUrl: getDmmScreenshotUrl(webContent),
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
