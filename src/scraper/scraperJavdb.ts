import { JSDOM } from "jsdom";

function extractTextContent3(webContent: string, selector: string) {
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
        return element.textContent?.trim();
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

function extractTextContent(webContent: string, selector: string) {
  const doc = new JSDOM(webContent).window.document;
  const element = doc.querySelector(selector);
  if (!element) {
    return null;
  } else {
    return element.textContent?.trim();
  }
}

function validation(
  value: string | null | undefined,
  regex: RegExp,
  groupIndex: number = 1
) {
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

export function getJavdbId(webContent: string) {
  return extractTextContent(webContent, "h2.title strong");
}

export function getJavdbTitle(webContent: string) {
  return extractTextContent(webContent, "h2.title .current-title");
}

export function getJavdbReleaseDate(webContent: string) {
  const value = extractTextContent2(webContent, "Released Date:");
  return validation(value, /(\d{4}-\d{2}-\d{2})/);
}

export function getJavdbReleaseYear(webContent: string) {
  const releaseDate = getJavdbReleaseDate(webContent);
  return releaseDate ? releaseDate.split("-")[0] : null;
}

export function getJavdbRuntime(webContent: string) {
  const value = extractTextContent2(webContent, "Duration:");
  return validation(value, /(\d*) (分鍾|minute\(s\))/);
}

export function getJavdbDirector(webContent: string) {
  const value = extractTextContent2(webContent, "Director:");
  return value;
}

export function getJavdbMaker(webContent: string) {
  const value = extractTextContent2(webContent, "Maker:");
  return value;
}

export function getJavdbSeries(webContent: string) {
  const value = extractTextContent2(webContent, "Series:");
  return value;
}

export function getJavdbRating(webContent: string) {
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

export function getJavdbGenre(webContent: string) {
  const genres = extractTextContent3(webContent, "Tags:");
  return genres?.length ? genres : null;
}

export function getJavdbActress(webContent: string) {
  const actresses = extractTextContent3(webContent, "Actor(s):");
  return actresses?.map((actress) => ({
    LastName: null,
    FirstName: null,
    JapaneseName: actress,
    ThumbUrl: null,
  }));
}

export function getJavdbCoverUrl(webContent: string) {
  const doc = new JSDOM(webContent).window.document;
  const element = doc.querySelector("img.video-cover");
  return element?.getAttribute("src");
}

export function getJavdbScreenshotUrl(webContent: string) {
  const doc = new JSDOM(webContent).window.document;
  return Array.from(
    doc.querySelectorAll('a.tile-item[data-fancybox="gallery"]')
  ).map((element) => element.getAttribute("href"));
}

export function getJavdbTrailerUrl(webContent: string) {
  const doc = new JSDOM(webContent).window.document;
  const element = doc.querySelector("video source");
  const trailerUrl = element?.getAttribute("src");
  return trailerUrl && !trailerUrl.startsWith("https")
    ? `https:${trailerUrl}`
    : trailerUrl;
}
