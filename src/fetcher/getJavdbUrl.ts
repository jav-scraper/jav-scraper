import fetch from "node-fetch";
import { JSDOM } from "jsdom";
import { Url } from "../types/index";
import { writeJVLog } from "../utils/writeJVLog.js";

export async function getJavdbUrl(
  id: string,
  allResults: boolean = false
): Promise<Url | undefined> {
  const searchUrl = `https://javdb.com/search?q=${id}&f=all`;
  let headers = {};
  let webContent;

  try {
    writeJVLog("Debug", `[getJavdbUrl] Performing [GET] on URL [${searchUrl}]`);
    const response = await fetch(searchUrl, { headers });
    webContent = await response.text();
  } catch (error) {
    if (error instanceof Error) {
      writeJVLog(
        "Error",
        `[getJavdbUrl] Error [GET] on URL [${searchUrl}]: ${error.message}`
      );
    }
    try {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      const response = await fetch(searchUrl, { headers });
      webContent = await response.text();
    } catch (retryError) {
      if (retryError instanceof Error) {
        writeJVLog(
          "Error",
          `[getJavdbUrl] Retry error [GET] on URL [${searchUrl}]: ${retryError.message}`
        );
      }
    }
  }
  const dom = new JSDOM(webContent);
  const doc = dom.window.document;
  const results: { id: string; title: string; url: string }[] = [];

  doc.querySelectorAll("a.box").forEach((element) => {
    const title = element.querySelector(".video-title")?.textContent?.trim();
    const id = element
      .querySelector(".video-title strong")
      ?.textContent?.trim();
    const url = `https://javdb.com${element.getAttribute("href")}`;

    if (title && id) {
      results.push({ id, title, url });
    }
  });

  const matchedResult = results.filter((result) => {
    const match = id.match(/\d+(\D+-\d+)/);
    const cleanId = match ? match[1] : id;
    return result.id === cleanId;
  });

  if (matchedResult.length > 0) {
    const urlObject = matchedResult.map((entry) => ({
      Url: `${entry.url}?locale=en`,
      Id: entry.id,
      Title: entry.title,
    }));
    return urlObject[0];
  } else {
    writeJVLog("Warning", `[getJavdbUrl] Search [${id}] not matched on Javdb`);
    return;
  }
}
