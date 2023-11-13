import { type News } from "../services/newsService";

const extractAuthors = (newses?: News[]) => {
  const authors: string[] = [];
  newses?.map((news) => {
    if (news.author && !authors.includes(news.author))
      authors.push(news.author);
  });
  return authors;
};

const useAuthors = (newses?: News[]) => {
  const authors = extractAuthors(newses);
  return { authors };
};

export default useAuthors;
