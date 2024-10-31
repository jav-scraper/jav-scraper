import { JSDOM } from "jsdom";
import { Actress } from "../../types";

function extractValue(regex: RegExp, text: string): string | null {
  const match = text.match(regex);
  return match ? match[1] : null;
}

export function getJav321Id(webContent: string): string | null {
  const regex = /<b>品番<\/b>: (.*?)<br><b>/;
  return extractValue(regex, webContent)?.toUpperCase() || null;
}

export function getJav321Title(webContent: string): string | null {
  const regex = /<div class="panel-heading"><h3>(.*) <small>/;
  return extractValue(regex, webContent);
}

export function getJav321ReleaseDate(webContent: string): string | null {
  const regex = /<b>配信開始日<\/b>: (.*?)<br><b>/;
  return extractValue(regex, webContent);
}

export function getJav321ReleaseYear(webContent: string): string | null {
  const releaseDate = getJav321ReleaseDate(webContent);
  return releaseDate ? releaseDate.split("-")[0] : null;
}

export function getJav321Runtime(webContent: string): string | null {
  const regex = /<b>収録時間<\/b>: (\d{1,3}) minutes<br><b>/;
  return extractValue(regex, webContent);
}

export function getJav321Maker(webContent: string): string | null {
  const regex = /<b>メーカー<\/b>: <a .*?>(.*)<\/a><br><b>/;
  return extractValue(regex, webContent);
}

export function getJav321Genre(webContent: string): string[] | null {
  const regex = /<a href="\/genre\/.+?">(.+?)<\/a>/g;
  const matches = [...webContent.matchAll(regex)];
  return matches.map((match) => match[1]);
}

export function getJav321Description(webContent: string): string | null {
  const regex =
    /<div class="col-md-12">(.*)<\/div><\/div><\/div><\/div><script src=/;
  let description = extractValue(regex, webContent);
  if (!description) {
    const regexAlt =
      /<div class="row"><div class="col-md-12"><\/div><\/div><div class="row"><div class="col-md-12">([\s\S]*?)<\/div>/;
    description = extractValue(regexAlt, webContent);
    if (description) {
      description = description
        .split("<!-- 特集 -->")[0]
        .replace(/<.*?>/g, "")
        .trim();
    }
  } else {
    description = description
      .replace('</div></div><div class="row"><div class="col-md-12">', "")
      .trim();
  }
  return description;
}

export function getJav321Series(webContent: string): string | null {
  const regex =
    /<a href="\/series\/(.*)\/1">(.*)<\/a><\/div><\/div><div class="row">/;
  return extractValue(regex, webContent);
}

export function getJav321Actress(webContent: string): Actress[] {
  const regex = /<b>出演者<\/b>: (.*?)<br><b>/;
  const actressContent = extractValue(regex, webContent);
  if (!actressContent) return [];
  const matches = [
    ...actressContent.matchAll(/<a href="\/star\/.*?">(.*?)<\/a>/g),
  ];
  return matches.map((match) => ({
    LastName: null,
    FirstName: null,
    JapaneseName: match[1],
    ThumbUrl: null,
  }));
}

export function getJav321CoverUrl(webContent: string): string | null {
  const doc = new JSDOM(webContent).window.document;
  const element = doc.querySelector(
    "body > div:nth-child(3) > div.col-md-3 > div:nth-child(1) > p > a > img"
  );
  return element?.getAttribute("src") || "";
}

export function getJav321ScreenshotUrl(webContent: string): string[] | null {
  const doc = new JSDOM(webContent).window.document;
  const elements = doc.querySelectorAll(
    "body > div:nth-child(3) > div.col-md-3 > div:nth-child > p > a > img"
  );
  return Array.from(elements).map((element) => {
    console.log(element.getAttribute("src"));

    return element.getAttribute("src")?.replace("-", "jp-") || "";
  });
}
