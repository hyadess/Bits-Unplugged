import { useNavigate } from "react-router-dom";
import { setLoading } from "../../App";
import ImageLoader from "../../components/ImageLoader";
import { useContext, useEffect, useRef } from "react";
import GlobalContext from "../../store/GlobalContext";
import { useIsVisible } from "../../hooks/useIsVisible";

const Solving = ({ setNav }) => {
  const navigate = useNavigate();
  const { type } = useContext(GlobalContext);
  const ref = useRef();
  const isVisible = useIsVisible(ref);

  useEffect(() => {
    if (isVisible) {
      setNav("features");
    }
  }, [isVisible]);

  return (
    <div
      id="features"
      ref={ref}
      className="mx-auto flex min-h-screen max-w-screen-xl flex-col items-center gap-8 px-4 py-8 sm:py-16 md:flex-row  md:justify-end lg:px-6 xl:gap-16"
    >
      <div className="mt-4 md:mt-0 md:w-50%">
        <h2 className="bu-text-primary mb-4 text-center text-4xl font-extrabold tracking-tight md:text-left">
          Unleash Solutions with our{" "}
          <span className="bu-text-title text-5xl">Interactive</span> canvases
        </h2>

        <p className="bu-text-subtitle mb-6 text-center  font-light md:text-left md:text-lg">
          There are plenty of canvases to choose from. Each canvas is designed
          to help you understand a particular topic in a fun and interactive
          way.
        </p>

        <div
          onClick={() => {
            setLoading(true);
            type == 2
              ? navigate("/admin/topics")
              : type == 1
                ? navigate("/problemSet")
                : type == 0
                  ? navigate("/topics")
                  : navigate("/login?type=solver");
          }}
          className="bu-button-secondary bu-text-primary inline-flex cursor-pointer items-center rounded-lg px-5 py-2.5 text-center text-sm font-medium"
        >
          Sign In
          <svg
            className="-mr-1 ml-2 h-5 w-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
        </div>
      </div>

      <div className="flex flex-row gap-0 md:w-50%">
        <ImageLoader
          className="block w-full dark:hidden"
          src="/gifs/toh_light.gif"
          alt="dashboard image"
        />
        <ImageLoader
          className="hidden w-full dark:block"
          src="/gifs/toh_dark.gif"
          alt="dashboard image"
        />
      </div>
    </div>
  );
};

export default Solving;
