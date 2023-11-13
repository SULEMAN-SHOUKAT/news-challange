import { type News } from "../services/newsService";

const extractCategories = (newses?: News[]) => {
  const categories: string[] = [];
  newses?.map((news) => {
    if (news.category && !categories.includes(news.category))
      categories.push(news.category);
  });
  return categories;
};

const useCategories = (newses?: News[]) => {
  const categories = extractCategories(newses);
  return { categories };
};

export default useCategories;
