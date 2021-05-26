import CONSTANTS from "./const";

export function getNewsPlatform(news: NewsModel): string {
    if (news.mainUrl.includes(CONSTANTS.NEWS_PLATFORM.DIARIO_LIBRE.LABEL)) {
        return CONSTANTS.NEWS_PLATFORM.DIARIO_LIBRE.VALUE;
    } else if (news.mainUrl.includes(CONSTANTS.NEWS_PLATFORM.LISTIN_DIARIO.LABEL)) {
        return CONSTANTS.NEWS_PLATFORM.LISTIN_DIARIO.VALUE;
    } else if (news.mainUrl.includes(CONSTANTS.NEWS_PLATFORM.MINISTERIO_DE_AGRICULTURA.LABEL)) {
        return CONSTANTS.NEWS_PLATFORM.MINISTERIO_DE_AGRICULTURA.VALUE;
    } else {
        return 'UNKNOWN'
    }
}