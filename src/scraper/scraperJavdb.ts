import { JSDOM } from "jsdom";
import { Actress, Rating } from "../types";

function extractTextContent3(
  webContent: string,
  selector: string
): string[] | null {
  const doc = new JSDOM(webContent).window.document;
  const key = doc.evaluate(
    `//strong[contains(., '${selector}')]`,
    doc,
    null,
    9,
    null
  ).singleNodeValue as Element;
  if (key?.nextElementSibling) {
    return Array.from(key.nextElementSibling.childNodes)
      .filter((element) => {
        return element.nodeName === "A";
      })
      .map((element) => {
        return element.textContent?.trim() || "";
      });
  } else {
    return null;
  }
}

function extractTextContent2(webContent: string, selector: string) {
  const doc = new JSDOM(webContent).window.document;
  const key = doc.evaluate(
    `//strong[contains(., '${selector}')]`,
    doc,
    null,
    9,
    null
  ).singleNodeValue as Element;
  if (key?.nextElementSibling?.textContent) {
    return key.nextElementSibling.textContent.trim();
  } else {
    return null;
  }
}

function extractTextContent(
  webContent: string,
  selector: string
): string | null {
  const doc = new JSDOM(webContent).window.document;
  const element = doc.querySelector(selector);
  if (!element) {
    return null;
  } else {
    return element.textContent?.trim() || null;
  }
}

function validation(
  value: string | null | undefined,
  regex: RegExp,
  groupIndex: number = 1
): string | null {
  if (!value) {
    return null;
  }
  const match = value.match(regex);
  if (match && match[groupIndex]) {
    return match[groupIndex].trim();
  } else {
    return null;
  }
}

export function getJavdbId(webContent: string): string | null {
  return extractTextContent(webContent, "h2.title strong");
}

export function getJavdbTitle(webContent: string): string | null {
  return extractTextContent(webContent, "h2.title .current-title");
}

export function getJavdbReleaseDate(webContent: string): string | null {
  const value = extractTextContent2(webContent, "Released Date:");
  return validation(value, /(\d{4}-\d{2}-\d{2})/);
}

export function getJavdbReleaseYear(webContent: string): string | null {
  const releaseDate = getJavdbReleaseDate(webContent);
  return releaseDate ? releaseDate.split("-")[0] : null;
}

export function getJavdbRuntime(webContent: string): string | null {
  const value = extractTextContent2(webContent, "Duration:");
  return validation(value, /(\d*) (分鍾|minute\(s\))/);
}

export function getJavdbDirector(webContent: string): string | null {
  const value = extractTextContent2(webContent, "Director:");
  return value;
}

export function getJavdbMaker(webContent: string): string | null {
  const value = extractTextContent2(webContent, "Maker:");
  return value;
}

export function getJavdbSeries(webContent: string): string | null {
  const value = extractTextContent2(webContent, "Series:");
  return value;
}

export function getJavdbRating(webContent: string): Rating | null {
  const value = extractTextContent2(webContent, "Rating:");
  const rating = validation(value, /(\d*\.\d*)分?, \D*(\d*)\D*/);
  if (rating) {
    return {
      Rating: Math.round(parseFloat(rating) * 2 * 100) / 100,
      Votes: null,
    };
  } else {
    return null;
  }
}

export function getJavdbGenre(webContent: string): string[] {
  const genres = extractTextContent3(webContent, "Tags:");
  return genres?.length ? genres : [];
}

export function getJavdbActress(webContent: string): Actress[] | null {
  const actresses = extractTextContent3(webContent, "Actor(s):");
  return actresses
    ? actresses.map((actress) => ({
        LastName: null,
        FirstName: null,
        JapaneseName: actress,
        ThumbUrl: null,
      }))
    : null;
}

export function getJavdbCoverUrl(webContent: string): string | null {
  const doc = new JSDOM(webContent).window.document;
  const element = doc.querySelector("img.video-cover");
  return element?.getAttribute("src") || null;
}

export function getJavdbScreenshotUrl(webContent: string): string[] | null {
  const doc = new JSDOM(webContent).window.document;
  const elements = Array.from(
    doc.querySelectorAll('a.tile-item[data-fancybox="gallery"]')
  );
  return elements.map((element) => element.getAttribute("href") || "");
}

export function getJavdbTrailerUrl(webContent: string): string | null {
  const doc = new JSDOM(webContent).window.document;
  const element = doc.querySelector("video source");
  if (element) {
    const trailerUrl = element.getAttribute("src");
    return trailerUrl && !trailerUrl.startsWith("https")
      ? `https:${trailerUrl}`
      : trailerUrl;
  } else {
    return null;
  }
}
