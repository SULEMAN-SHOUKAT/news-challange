import { type News } from "../../services/newsService";

type NewsProps = {
  newses?: News[];
};
const News = ({ newses }: NewsProps) => {
  return (
    <div>
      {newses &&
        newses.map((news) => (
          <div
            key={news.url}
            className="w-full bg-white  mb-4 rounded drop-shadow-md"
          >
            <div className="flex justify-between border-b border-gray-200 w-full  p-3 text-gray-600">
              <div>
                {!!news.author && (
                  <>
                    <span className="font-bold ">By</span> {news.author}
                  </>
                )}
              </div>
              <div>
                <span className="font-bold">Published At : </span>{" "}
                {news.publishedAt.toLocaleString("DE")}
              </div>
            </div>
            <div className="flex justify-between flex-col md:flex-row  p-3">
              <div className="mt-2  w-full md:w-2/3">
                <div className=" font-semibold text-gray-600">{news.title}</div>
                <div className="text-justify mt-2">
                  {!!news.description && (
                    <>
                      <span className="font-semibold">Description :</span>
                      {news.description}
                      <br />
                      <a
                        href={news.url}
                        target="_blank"
                        className="font-semibold text-blue-600"
                      >
                        Read More
                      </a>
                    </>
                  )}
                </div>
              </div>
              <div>
                {!!news.source && (
                  <>
                    <span className="font-bold">Source: </span> {news.source}
                  </>
                )}
              </div>
              <div>
                {!!news.category && (
                  <>
                    <span className="font-bold">Category: </span>{" "}
                    {news.category}
                  </>
                )}
              </div>
            </div>
            <div>
              {news.urlToImage && (
                <img
                  src={news.urlToImage}
                  alt={news.source}
                  className="rounded-b"
                />
              )}
            </div>
          </div>
        ))}
    </div>
  );
};

export default News;
