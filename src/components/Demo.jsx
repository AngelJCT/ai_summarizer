import { useState, useEffect } from "react";
import { copy, linkIcon, loader, tick } from "../assets";
import { useLazyGetSummaryQuery } from "../services/article";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

const Demo = () => {
  const [article, setArticle] = useState({
    url: "",
    summary: "",
  });
  const [allArticles, setAllArticles] = useState([]);
  const [copied, setCopied] = useState("");

  const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();

  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const articlesFromLocalStorage = JSON.parse(
      localStorage.getItem("articles")
    );

    if (articlesFromLocalStorage) {
      setAllArticles(articlesFromLocalStorage);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data } = await getSummary({ articleUrl: article.url });

    if (data?.summary) {
      const newArticle = { ...article, summary: data.summary };
      const updatedAllArticles = [newArticle, ...allArticles];

      setArticle(newArticle);
      setAllArticles(updatedAllArticles);

      localStorage.setItem("articles", JSON.stringify(updatedAllArticles));
    }
  };

  const handleCopy = (copyUrl) => {
    setCopied(copyUrl);
    navigator.clipboard.writeText(copyUrl);
    setTimeout(() => setCopied(false), 3000);
  };

  const displayedArticles = isExpanded ? allArticles : allArticles.slice(0, 1);

  return (
    <section className="mt-16 w-full max-w-xl">
      {/* Search */}
      <div className="flex flex-col w-full gap-2">
        <form
          className="relative flex justify-center items-center"
          onSubmit={handleSubmit}
        >
          <img
            src={linkIcon}
            alt="link_icon"
            className="absolute left-0 my-2 ml-3 w-5"
          />

          <input
            type="url"
            placeholder="Enter a URL"
            value={article.url}
            onChange={(e) =>
              setArticle({
                ...article,
                url: e.target.value,
              })
            }
            required
            className="url_input peer"
          />

          <button
            type="submit"
            className="submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700 shadow-sm"
          >
            ➤
          </button>
        </form>

        {/* Browse URL History */}
        <div>
          <div className="flex flex-col gap-1 max-h-60 overflow-y-auto shadow-md rounded-lg">
            {/* Arrow to toggle expand/collapse */}
            {allArticles.length > 1 && (
              <div
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex justify-center items-center cursor-pointer p-2 drop-shadow-lg"
              >
                {isExpanded ? (
                  <FiChevronUp size={24} />
                ) : (
                  <FiChevronDown size={24} />
                )}
              </div>
            )}

            {displayedArticles.map((item, index) => (
              <div
                key={`link-${index}`}
                onClick={() => setArticle(item)}
                className="link_card"
              >
                <div className="copy_btn" onClick={() => handleCopy(item.url)}>
                  <img
                    src={copied === item.url ? tick : copy}
                    alt="copy_icon"
                    className="w-[40%] h-[40%] object-contain"
                  />
                </div>
                <p className="flex-1 font-poppins text-blue-800 font-medium text-sm truncate">
                  {item.url}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Display Result */}
      <div className="my-10 max-w-full flex justify-center items-center border-none">
        {isFetching ? (
          <img src={loader} alt="loader" className="w-20 h-20 object-contain" />
        ) : error ? (
          <p className="font-poppins font-bold text-black text-center">
            Well, that wasn&apos;t supposed to happen...
            <br />
            <span className="font-poppins font-normal text-gray-700">
              {error?.data?.error}
            </span>
          </p>
        ) : (
          article.summary && (
            <div className="flex flex-col gap-3 border-none">
              <h2 className="font-poppins font-bold text-gray-700 text-xl">
                Article <span className="new_gradient">Summary</span>
              </h2>
              <div className="summary_box">
                <p className="font-poppins font-medium text-sm text-gray-700 break-words whitespace-pre-wrap">
                  {article.summary}
                </p>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
};

export default Demo;
