import axios from "axios";
import type { SearchQuery } from "../../hooks/useSearchQuery";

type Doc = {
  type: string;
  sectionName: string;
  webPublicationDate: string;
  webTitle: string;
  webUrl: string;
};

type GuardianApiResponse = {
  results: Doc[];
};

type NewsAPIQuery = {
  q?: string;
  "from-date"?: string;
  "to-date"?: string;
};

const mapToNews = (docs: Doc[]) =>
  docs.map((doc) => ({
    title: doc.webTitle,
    url: doc.webUrl,
    publishedAt: doc.webPublicationDate,
    source: doc.sectionName,
    category: doc.type,
  }));

const prepareQuery = (query: SearchQuery) => {
  const newsQuery: NewsAPIQuery = {};
  if (query.text) newsQuery.q = query.text;
  if (query.from) newsQuery["from-date"] = query.from;
  if (query.to) newsQuery["to-date"] = query.to;
  return newsQuery;
};

const get = async (query: SearchQuery) => {
  try {
    const url = `${window.CONFIG.api.guardian.url}/search`;
    const response = await axios.get<GuardianApiResponse>(url, {
      params: {
        ...prepareQuery(query),
        "api-key": window.CONFIG.api.guardian.auth,
      },
    });
    return response.data.results ? mapToNews(response.data.results) : [];
  } catch (error) {
    console.error("Error fetching news from The news api:", error);
    return [];
  }
};

export default { get };
