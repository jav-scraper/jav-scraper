import { Settings } from "../types";

export const settings: Settings = {
  throttlelimit: 3,
  "location.input": "/mnt/f/JAV/Test",
  "location.output": "/mnt/f/JAV/Sorted",
  "location.thumbcsv": "",
  "location.genrecsv": "",
  "location.uncensorcsv": "",
  "location.historycsv": "",
  "location.tagcsv": "",
  "location.log": "",
  "scraper.movie.aventertainment": false,
  "scraper.movie.aventertainmentja": false,
  "scraper.movie.r18dev": true,
  "scraper.movie.dmm": false,
  "scraper.movie.dmmja": true,
  "scraper.movie.jav321ja": false,
  "scraper.movie.javbus": false,
  "scraper.movie.javbusja": false,
  "scraper.movie.javbuszh": false,
  "scraper.movie.javdb": false,
  "scraper.movie.javdbzh": false,
  "scraper.movie.javlibrary": true,
  "scraper.movie.javlibraryja": false,
  "scraper.movie.javlibraryzh": false,
  "scraper.movie.mgstageja": false,
  "scraper.movie.tokyohot": false,
  "scraper.movie.tokyohotja": false,
  "scraper.movie.tokyohotzh": false,
  "scraper.option.dmm.scrapeactress": false,
  "scraper.option.idpreference": "id",
  "scraper.option.addmaleactors": false,
  "match.minimumfilesize": 1, // 1 MB
  "match.includedfileextension": [
    ".asf",
    ".avi",
    ".flv",
    ".m4v",
    ".mkv",
    ".mp4",
    ".mov",
    ".rmvb",
    ".wmv",
  ],
  "match.excludedfilestring": ["^.*-trailer*", "^.*-5\\."],
  "match.regex": false,
  "match.regex.string": "([a-zA-Z|tT28]+-\\d+[zZ]?[eE]?)(?:-pt)?(\\d{1,2})?",
  "match.regex.idmatch": 1,
  "match.regex.ptmatch": 2,
  "sort.movetofolder": true,
  "sort.renamefile": true,
  "sort.renamefolderinplace": false,
  "sort.maxtitlelength": 100,
  "sort.movesubtitles": false,
  "sort.create.nfo": true,
  "sort.create.nfoperfile": true,
  "sort.download.actressimg": false,
  "sort.download.thumbimg": true,
  "sort.download.posterimg": true,
  "sort.download.screenshotimg": false,
  "sort.download.trailervid": false,
  "sort.download.timeoutduration": 100000,
  "sort.format.groupactress": true,
  "sort.format.delimiter": ", ",
  "sort.format.file": "<ID>",
  "sort.format.folder": "<ID> [<STUDIO>] - <TITLE> (<YEAR>)",
  "sort.format.outputfolder": "",
  "sort.format.posterimg": ["folder"],
  "sort.format.thumbimg": "fanart",
  "sort.format.trailervid": "<ID>-trailer",
  "sort.format.nfo": "<ID>",
  "sort.format.screenshotimg": "fanart",
  "sort.format.screenshotimg.padding": 1,
  "sort.format.screenshotfolder": "extrafanart",
  "sort.format.actressimgfolder": ".actors",
  "sort.metadata.nfo.addaliases": false,
  "sort.metadata.nfo.mediainfo": false,
  "sort.metadata.nfo.addgenericrole": true,
  "sort.metadata.nfo.altnamerole": false,
  "sort.metadata.nfo.translate": false,
  "sort.metadata.nfo.translate.module": "googletrans",
  "sort.metadata.nfo.translate.field": "description",
  "sort.metadata.nfo.translate.language": "en",
  "sort.metadata.nfo.translate.deeplapikey": "",
  "sort.metadata.nfo.translate.keeporiginaldescription": false,
  "sort.metadata.nfo.displayname": "[<ID>] <TITLE>",
  "sort.metadata.nfo.firstnameorder": false,
  "sort.metadata.nfo.actresslanguageja": false,
  "sort.metadata.nfo.unknownactress": true,
  "sort.metadata.nfo.originalpath": false,
  "sort.metadata.nfo.actressastag": false,
  "sort.metadata.nfo.preferactressalias": false,
  "sort.metadata.nfo.format.tag": "<SET>",
  "sort.metadata.nfo.format.tagline": "",
  "sort.metadata.nfo.format.credits": [],
  "sort.metadata.thumbcsv": true,
  "sort.metadata.thumbcsv.autoadd": true,
  "sort.metadata.thumbcsv.convertalias": true,
  "sort.metadata.genrecsv": false,
  "sort.metadata.genrecsv.autoadd": false,
  "sort.metadata.tagcsv": false,
  "sort.metadata.tagcsv.autoadd": false,
  "sort.metadata.genre.ignore": [
    "^Featured Actress",
    "^Hi-Def",
    ".*sale.*",
    ".*mosaic.*",
  ],
  "sort.metadata.requiredfield": [
    "id",
    "coverurl",
    "genre",
    "maker",
    "releaseDate",
    "title",
  ],
  "sort.metadata.priority.actress": ["javdb", "jav321", "dmm"],
  "sort.metadata.priority.coverurl": ["dmm", "jav321", "javdb"],
  "sort.metadata.priority.description": ["javdb", "jav321", "dmm"],
  "sort.metadata.priority.director": ["javdb", "jav321", "dmm"],
  "sort.metadata.priority.genre": ["dmm", "javdb", "jav321"],
  "sort.metadata.priority.id": ["javdb", "jav321", "dmm"],
  "sort.metadata.priority.contentid": ["javdb", "jav321", "dmm"],
  "sort.metadata.priority.label": ["javdb", "jav321", "dmm"],
  "sort.metadata.priority.maker": ["javdb", "jav321", "dmm"],
  "sort.metadata.priority.posterurl": ["dmm", "jav321", "javdb"],
  "sort.metadata.priority.releasedate": ["javdb", "jav321", "dmm"],
  "sort.metadata.priority.releaseyear": ["javdb", "jav321", "dmm"],
  "sort.metadata.priority.rating": ["javdb", "jav321", "dmm"],
  "sort.metadata.priority.runtime": ["javdb", "jav321", "dmm"],
  "sort.metadata.priority.series": ["javdb", "jav321", "dmm"],
  "sort.metadata.priority.screenshoturl": ["dmm", "jav321", "javdb"],
  "sort.metadata.priority.title": ["javdb", "jav321", "dmm"],
  "sort.metadata.priority.trailerurl": ["javdb", "jav321", "dmm"],
  "emby.url": "http://192.168.0.1:8096",
  "emby.apikey": "",
  "javlibrary.baseurl": "https://www.javlibrary.com",
  "javlibrary.browser.useragent": "",
  "javlibrary.cookie.__cf_bm": "",
  "javlibrary.cookie.cf_clearance": "",
  "javlibrary.cookie.session": "",
  "javlibrary.cookie.userid": "",
  "javdb.cookie.session": "",
  "proxy.enabled": false,
  "proxy.host": "",
  "proxy.username": "",
  "proxy.password": "",
  "web.favorites.genre": [],
  "web.favorites.tag": [],
  "web.sort.recurse": true,
  "web.sort.interactive": true,
  "web.sort.update": false,
  "web.sort.force": false,
  "web.sort.preview": false,
  "web.sort.recursedepth": 2,
  "web.sort.confirm": false,
  "web.sort.manualsearch.aventertainment": false,
  "web.sort.manualsearch.aventertainmentja": false,
  "web.sort.manualsearch.dmm": false,
  "web.sort.manualsearch.dmmja": true,
  "web.sort.manualsearch.jav321ja": false,
  "web.sort.manualsearch.javbus": false,
  "web.sort.manualsearch.javbusja": false,
  "web.sort.manualsearch.javbuszh": false,
  "web.sort.manualsearch.javdb": false,
  "web.sort.manualsearch.javdbzh": false,
  "web.sort.manualsearch.javlibrary": true,
  "web.sort.manualsearch.javlibraryja": false,
  "web.sort.manualsearch.javlibraryzh": false,
  "web.sort.manualsearch.mgstageja": false,
  "web.sort.manualsearch.r18dev": true,
  "web.sort.manualsearch.tokyohot": false,
  "web.sort.manualsearch.tokyohotja": false,
  "web.sort.manualsearch.tokyohotzh": false,
  "web.theme": "light",
  "admin.log": true,
  "admin.log.level": "info",
  "admin.updates.check": true,
};
