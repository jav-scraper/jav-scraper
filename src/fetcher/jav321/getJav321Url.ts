import fetch from "node-fetch";
import { getJav321Id, getJav321Title } from "./getJav321Scraper";
import { writeJVLog } from "../../utils";
import { Url } from "../../types";

export async function getJav321Url(
  id: string,
  allResults: boolean = false
): Promise<Url | undefined> {
  const searchUrl = "https://jp.jav321.com/search";

  try {
    writeJVLog(
      "Debug",
      `[getJav321Url] Performing [POST] on URL [${searchUrl}]`
    );
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
          Id: getJav321Id(webContent),
          Title: getJav321Title(webContent),
          Url: searchResultUrl,
        };
        return resultObject;
      } catch (error) {
        writeJVLog(
          "Error",
          `[getJav321Url] Performing [POST] on URL [${error}]`
        );
      }
    }
  } catch (error) {
    writeJVLog(
      "Error",
      `[getJav321Url] Error occurred on [POST] on URL [${error}]`
    );
  }
}
