import fetch from "node-fetch";
import { JSDOM } from "jsdom";

import { logger } from "../../utils";
import { Source, Url } from "../../types";

export async function getDmmUrl(id: string, allResults: boolean = false) {
  const searchUrl = `https://www.dmm.co.jp/search/=/searchstr=${id}/`;
  const source: Source = "jav321";
  https: try {
    logger.info({ source, url: searchUrl, msg: "start fetch" });
    const response = await fetch(searchUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    const searchResultUrl = response.url;
    const webContent = await response.text();
    logger.info({ source, url: searchUrl, msg: "success fetch" });
    const hoge = webContent.match(/href=\"(.*?\/mono\/dvd\/.*?)\"/);
    if (hoge) {
      console.log(hoge[1]);
    }
  } catch (error) {
    logger.error({ source, url: searchUrl, error });
  }
}
