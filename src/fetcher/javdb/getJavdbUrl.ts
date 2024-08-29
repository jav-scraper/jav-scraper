import fetch from "node-fetch";
import { JSDOM } from "jsdom";
import { Source, Url } from "../../types";
import { logger } from "../../utils";

export async function getJavdbUrl(
  id: string,
  allResults: boolean = false
): Promise<Url | undefined> {
  const source: Source = "javdb";
  const searchUrl = `https://javdb.com/search?q=${id}&f=all`;
  let headers = {};
  let webContent;

  try {
    logger.info({ source, url: searchUrl, msg: "start fetch" });
    const response = await fetch(searchUrl, { headers });
    webContent = await response.text();
    logger.info({ source, url: searchUrl, msg: "success fetch" });
  } catch (error) {
    if (error instanceof Error) {
      logger.error({ source, url: searchUrl, error });
    }
    try {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      const response = await fetch(searchUrl, { headers });
      webContent = await response.text();
    } catch (retryError) {
      if (retryError instanceof Error) {
        logger.error({ source, url: searchUrl, error });
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
    logger.info({ source, url: searchUrl, msg: "success found" });
    return urlObject[0];
  } else {
    logger.error({ source, url: searchUrl, error: new Error("not found") });
    return;
  }
}
