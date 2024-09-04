import { JSDOM } from "jsdom";
import { Actress } from "types";

export function getDmmTitle(webContent: string): string | null {
  const doc = new JSDOM(webContent).window.document;
  const element = doc.querySelector("h1#title");
  return element?.textContent?.trim() || null;
}

export function getDmmDescription(webContent: string): string | null {
  const doc = new JSDOM(webContent).window.document;
  const element = doc.querySelector("p.mg-b20");
  return element?.textContent?.trim() || null;
}

export function getDmmReleaseDate(webContent: string): string | null {
  const doc = new JSDOM(webContent).window.document;
  const element = doc.querySelector(
    "div.wrapper-detailContents > div.wrapper-product > table > tbody > tr:nth-child(1) > td:nth-child(2)"
  );
  return element?.textContent?.trim() || null;
}

export function getDmmReleaseYear(webContent: string): string | null {
  const releaseDate = getDmmReleaseDate(webContent);
  return releaseDate ? releaseDate.split("/")[0] : null;
}

export function getDmmRuntime(webContent: string): string | null {
  const doc = new JSDOM(webContent).window.document;
  const element = doc.querySelector(
    "div.wrapper-detailContents > div.wrapper-product > table > tbody > tr:nth-child(2) > td:nth-child(2)"
  );
  return element?.textContent?.trim().replace("分", "") || null;
}

export function getDmmSeries(webContent: string): string | null {
  const doc = new JSDOM(webContent).window.document;
  const element = doc.querySelector(
    "div.wrapper-detailContents > div.wrapper-product > table > tbody > tr:nth-child(5) > td:nth-child(2)"
  );
  return element?.textContent?.trim().replace("----", "") || null;
}

export function getDmmMaker(webContent: string): string | null {
  const doc = new JSDOM(webContent).window.document;
  const element = doc.querySelector(
    "div.wrapper-detailContents > div.wrapper-product > table > tbody > tr:nth-child(6) > td:nth-child(2)"
  );
  return element?.textContent?.trim() || null;
}

export function getDmmLabel(webContent: string): string | null {
  const doc = new JSDOM(webContent).window.document;
  const element = doc.querySelector(
    "div.wrapper-detailContents > div.wrapper-product > table > tbody > tr:nth-child(7) > td:nth-child(2)"
  );
  return element?.textContent?.trim() || null;
}

export function getDmmActress(webContent: string): Actress[] {
  const doc = new JSDOM(webContent).window.document;
  const elements = doc.querySelectorAll("#performer > a");
  return Array.from(elements).map((element) => {
    return {
      LastName: null,
      FirstName: null,
      JapaneseName: element.textContent?.trim() || "",
      ThumbUrl: null,
    };
  });
}

export function getDmmGenre(webContent: string): string[] | null {
  const doc = new JSDOM(webContent).window.document;
  const elements = doc.querySelectorAll(
    "div.wrapper-detailContents > div.wrapper-product > table > tbody > tr:nth-child(8) > td:nth-child(2) > a"
  );
  return Array.from(elements).map(
    (element) => element.textContent?.trim() || ""
  );
}

export function getDmmDirector(webContent: string): string | null {
  const doc = new JSDOM(webContent).window.document;
  const element = doc.querySelector(
    "div.wrapper-detailContents > div.wrapper-product > table > tbody > tr:nth-child(4) > td:nth-child(2)"
  );
  return element?.textContent?.trim() || null;
}

export function getDmmPosterUrl(webContent: string): string | null {
  const doc = new JSDOM(webContent).window.document;
  const element = doc.querySelector("meta[property='og:image']");
  return element?.getAttribute("content")?.replace("pl", "ps") || null;
}

export function getDmmCoverUrl(webContent: string): string | null {
  const doc = new JSDOM(webContent).window.document;
  const element = doc.querySelector("meta[property='og:image']");
  return element?.getAttribute("content") || null;
}

export function getDmmScreenshotUrl(webContent: string): string[] | null {
  const doc = new JSDOM(webContent).window.document;
  const elements = doc.querySelectorAll("[name=sample-image] > img");
  return Array.from(elements).map((element) => {
    return element?.getAttribute("data-lazy")?.replace("-", "jp-") || "";
  });
}
