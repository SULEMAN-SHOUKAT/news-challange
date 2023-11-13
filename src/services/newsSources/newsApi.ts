import axios from "axios";
import type { SearchQuery } from "../../hooks/useSearchQuery";

type Article = {
  source: {
    name: string;
  };
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: Date;
  content: string;
};

type NewsApiResponse = {
  articles: Article[];
};

type NewsAPIQuery = {
  q?: string;
  from?: string;
  to?: string;
};

const mapToNews = (articles: Article[]) =>
  articles.map((article) => ({
    author: article.author,
    title: article.title,
    description: article.description,
    url: article.url,
    urlToImage: article.urlToImage,
    publishedAt: article.publishedAt,
    source: article.source.name,
  }));

const prepareQuery = (query: SearchQuery) => {
  const newsQuery: NewsAPIQuery = {};
  if (query.text) newsQuery.q = query.text;
  if (query.from) newsQuery.from = query.from;
  if (query.to) newsQuery.to = query.to;
  return newsQuery;
};

const get = async (query: SearchQuery) => {
  try {
    const url = `${window.CONFIG.api.newsApi.url}/everything`;
    const response = await axios.get<NewsApiResponse>(url, {
      params: {
        ...prepareQuery(query),
        apiKey: window.CONFIG.api.newsApi.auth,
      },
    });
    return mapToNews(response.data.articles);
  } catch (error) {
    console.error("Error fetching news from The news api:", error);
    return [];
  }
};

export default { get };
