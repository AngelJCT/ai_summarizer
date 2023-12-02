import { logo } from "../assets";

const Hero = () => {
  return (
    <header className="w-full flex justify-center items-center flex-col font-poppins">
      <nav className="flex justify-between items-center w-full mb-10 pt-3">
        <img src={logo} alt="sumz_logo" className="w-28 object-contain" />

        <button
          type="button"
          onClick={() => window.open("https://github.com/AngelJCT")}
          className="black_btn"
        >
          Github
        </button>
      </nav>

      <h1 className="head_text">
        Summarize Articles with <br className="max-md:hidden" />
        <span className="new_gradient">Summize</span>
      </h1>

      <h2 className="desc">
        Simplify your reading with an open-source article summarizer that
        transforms lengthy articles into clear and concise summaries using
        artificial intelligence.
      </h2>
    </header>
  );
};

export default Hero;
