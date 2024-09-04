import fetch from "node-fetch";
import { getDmmTitle } from "./getDmmScraper";

import { logger } from "../../utils";
import { Source, Url } from "../../types";

export async function getDmmUrl(id: string): Promise<Url | undefined> {
  const searchUrl = `https://www.dmm.co.jp/search/=/searchstr=${id}/`;
  const source: Source = "dmm";
  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    cookie:
      "age_check_done=1; expires=Fri, 31-Dec-9999 23:59:59 GMT; path=/; domain=.dmm.co.jp",
  };
  try {
    logger.debug({ source, url: searchUrl, msg: "start fetch" });
    const response = await fetch(searchUrl, { method: "GET", headers });
    const webContent = await response.text();
    const searchResult = webContent.match(/href=\"(.*?\/mono\/dvd\/.*?)\"/);
    try {
      if (!searchResult) {
        throw new Error("No search result found");
      }
      const searchResultUrl = searchResult[1];
      const response = await fetch(searchResultUrl, { method: "GET", headers });
      const webContent = await response.text();
      const resultObject = {
        Id: id,
        Title: getDmmTitle(webContent),
        Url: searchResultUrl,
      };
      logger.debug({ source, url: searchUrl, msg: "success fetch" });
      return resultObject;
    } catch (error) {
      logger.error({ source, url: searchUrl, error });
    }
  } catch (error) {
    logger.error({ source, url: searchUrl, error });
  }
}
