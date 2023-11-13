import axios from "axios";
import type { SearchQuery } from "../../hooks/useSearchQuery";

type Doc = {
  abstract: string;
  web_url: string;
  lead_paragraph: string;
  source: string;
  multimedia: {
    type: "image";
    url: string;
  }[];
  section_name: string;
  pub_date: Date;
  byline: {
    original: string;
  };
};

type NyTimesResponse = {
  response: {
    docs: Doc[];
  };
};

type NyAPIQuery = {
  q?: string;
  begin_date?: string;
  end_date?: string;
};

const mapToNews = (newsDocs: Doc[]) =>
  newsDocs.map((news) => ({
    author: news.byline.original,
    title: news.abstract,
    description: news.lead_paragraph,
    url: news.web_url,
    urlToImage: news.multimedia[0]?.url,
    publishedAt: news.pub_date,
    source: news.source,
    category: news.section_name,
  }));

const prepareQuery = (query: SearchQuery) => {
  const newsQuery: NyAPIQuery = {};
  if (query.text) newsQuery.q = query.text;
  if (query.from) newsQuery.begin_date = query.from.replace(/-/g, "");
  if (query.to) newsQuery.end_date = query.to.replace(/-/g, "");
  return newsQuery;
};

const get = async (query: SearchQuery) => {
  try {
    const url = `${window.CONFIG.api.nyTimes.url}/articlesearch.json`;
    const response = await axios.get<NyTimesResponse>(url, {
      params: {
        ...prepareQuery(query),
        "api-key": window.CONFIG.api.nyTimes.auth,
      },
    });
    return mapToNews(response.data.response.docs);
  } catch (error) {
    console.error("Error fetching news from The news api:", error);
    return [];
  }
};

export default { get };
