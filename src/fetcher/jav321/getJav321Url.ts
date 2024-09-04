import fetch from "node-fetch";
import { getJav321Id, getJav321Title } from "./getJav321Scraper";
import { logger } from "../../utils";
import { Source, Url } from "../../types";

export async function getJav321Url(
  id: string,
  allResults: boolean = false
): Promise<Url | undefined> {
  const searchUrl = "https://jp.jav321.com/search";
  const source: Source = "jav321";

  try {
    logger.debug({ source, url: searchUrl, msg: "start fetch" });
    const response = await fetch(searchUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({ sn: id }),
    });
    const searchResultUrl = response.url;
    const webContent = await response.text();
    if (searchResultUrl.includes("/video/")) {
      try {
        const resultObject = {
          Id: id,
          Title: getJav321Title(webContent),
          Url: searchResultUrl,
        };
        logger.debug({ source, url: searchUrl, msg: "success fetch" });
        return resultObject;
      } catch (error) {
        logger.error({
          source,
          url: searchUrl,
          msg: "failure fetch",
          error,
        });
      }
    }
  } catch (error) {
    logger.error({
      source,
      url: searchUrl,
      msg: "failure fetch",
      error,
    });
  }
}
