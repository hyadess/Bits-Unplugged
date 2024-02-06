import { useNavigate } from "react-router-dom";
import { setLoading } from "../../App";
import ImageLoader from "../../components/ImageLoader";
import {
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import GlobalContext from "../../store/GlobalContext";
import { useIsVisible } from "../../hooks/useIsVisible";
import Particles, { initParticlesEngine } from "@tsparticles/react";
// import { loadAll } from "@/tsparticles/all"; // if you are going to use `loadAll`, install the "@tsparticles/all" package too.
// import { loadFull } from "tsparticles"; // if you are going to use `loadFull`, install the "tsparticles" package too.
import { loadSlim } from "@tsparticles/slim"; // if you are going to use `loadSlim`, install the "@tsparticles/slim" package too.
// import { loadBasic } from "@tsparticles/basic"; // if you are going to use `loadBasic`, install the "@tsparticles/basic" package too.
import "./styles.scss";
import AnimateCursor from "./AnimatedCursor";
const Hero = ({ nav, setNav }, ref) => {
  const navigate = useNavigate();
  const { type } = useContext(GlobalContext);
  //   const ref = useRef();
  const isVisible = useIsVisible(ref);

  useEffect(() => {
    if (isVisible) {
      setNav("home");
    }
  }, [isVisible]);
  const [init, setInit] = useState(false);

  // this should be run only once per application lifetime
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
      // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
      // starting from v2 you can add only the features you need reducing the bundle size
      //await loadAll(engine);
      //await loadFull(engine);
      await loadSlim(engine);
      //await loadBasic(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = (container) => {
    console.log(container);
  };

  const options = {
    background: {
      // color: {
      //   value: "#232741",
      // },
      // position: "50% 50%",
      // repeat: "no-repeat",
      // size: "100%",
    },
    particles: {
      number: {
        value: 50,
        density: {
          enable: true,
          area: 800,
        },
      },
      color: {
        value: ["#3cba54", "#f4c20d", "#db3236", "#4885ed"],
      },
      shape: {
        type: "circle",
      },
      opacity: {
        value: 0.6,
      },
      size: {
        value: { min: 1, max: 8 },
      },
      links: {
        enable: true,
        distance: 150,
        color: "#808080",
        opacity: 0.4,
        width: 1,
      },
      move: {
        enable: true,
        speed: 3,
        direction: "none",
        random: false,
        straight: false,
        outModes: "out",
      },
    },
    fullScreen: false,
    interactivity: {
      events: {
        onHover: {
          enable: true,
          mode: "grab",
        },
        onClick: {
          enable: true,
          mode: "push",
        },
      },
      modes: {
        grab: {
          distance: 140,
          links: {
            opacity: 1,
          },
        },
        push: {
          quantity: 4,
        },
      },
    },
  };

  // const options = useMemo(
  //   () => ({
  //     background: {
  //       color: {
  //         value: "#dedede",
  //       },
  //     },
  //     fpsLimit: 120,
  //     interactivity: {
  //       events: {
  //         onClick: {
  //           enable: true,
  //           mode: "push",
  //         },
  //         onHover: {
  //           enable: true,
  //           mode: "repulse",
  //         },
  //       },
  //       modes: {
  //         push: {
  //           quantity: 4,
  //         },
  //         repulse: {
  //           distance: 200,
  //           duration: 0.4,
  //         },
  //       },
  //     },
  //     particles: {
  //       color: {
  //         value: "#1c5b5f",
  //       },
  //       links: {
  //         color: "#1c5b5f",
  //         distance: 150,
  //         enable: true,
  //         opacity: 0.5,
  //         width: 1,
  //       },
  //       move: {
  //         direction: "none",
  //         enable: true,
  //         outModes: {
  //           default: "bounce",
  //         },
  //         random: false,
  //         speed: 6,
  //         straight: false,
  //       },
  //       number: {
  //         density: {
  //           enable: true,
  //         },
  //         value: 80,
  //       },
  //       opacity: {
  //         value: 0.5,
  //       },
  //       shape: {
  //         type: "circle",
  //       },
  //       size: {
  //         value: { min: 1, max: 8 },
  //       },
  //     },
  //     detectRetina: true,
  //   }),
  //   []
  // );

  return (
    <div className="bu-nav-color">
      <AnimateCursor />
      <Particles
        id="tsparticles"
        particlesLoaded={particlesLoaded}
        options={options}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          zIndex: -1,
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      />
      <div
        id="home"
        ref={ref}
        className="mx-auto flex min-h-screen max-w-screen-xl flex-col items-center gap-8 px-4 py-8 sm:py-16 md:flex-row  md:justify-center lg:px-6 xl:gap-16"
      >
        {/* <h2
          className="bu-text-primary mb-4 text-center tracking-tight md:text-left flex flex-col gap-3 flex-center"
          style={{ zIndex: 100 }}
        >
          <span className="bu-text-title text-8xl font-extrabold ">
            BITS UNPLUGGED
          </span>
          <br />
          <h1 className="font-semibold text-center text-5xl">
            Learn.Practice.Compete
          </h1>

          <div
            onClick={() => {
              setLoading(true);
              type == 2
                ? navigate("/admin/topics")
                : type == 1
                  ? navigate("/problemSet")
                  : type == 0
                    ? navigate("/topics")
                    : navigate("/login");
            }}
            className="flex bu-button-secondary bu-text-primary flex-row cursor-pointer items-center rounded-lg px-5 py-2.5 text-center font-medium  mt-5 text-3xl "
          >
            Get started
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
        </h2> */}

        {/* <img
        className="w-full dark:hidden"
        src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/cta/cta-dashboard-mockup.svg"
        alt="dashboard image"
      /> */}
        <div className="flex flex-row gap-0 md:w-50%" style={{ zIndex: 100 }}>
          <ImageLoader
            className="block w-full dark:hidden"
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/cta/cta-dashboard-mockup.svg"
            alt="dashboard image"
          />
          <ImageLoader
            className="hidden w-full dark:block"
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/cta/cta-dashboard-mockup-dark.svg"
            alt="dashboard image"
          />
        </div>
        <div className="mt-4 md:mt-0 md:w-50%" style={{ zIndex: 100 }}>
          <h2 className="bu-text-primary mb-4 text-center text-4xl font-extrabold tracking-tight md:text-left">
            A platform for exploring{" "}
            <span className="bu-text-title text-5xl">Computer Science</span>{" "}
            without coding{" "}
          </h2>

          <p className="bu-text-subtitle mb-6 text-center  font-light md:text-left md:text-lg">
            Bits unplugged is a platform for students to solve CS problems
            without needing to write a single line of code through an
            interactive medium
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
                    : navigate("/login");
            }}
            className="bu-button-secondary bu-text-primary inline-flex cursor-pointer items-center rounded-lg px-5 py-2.5 text-center text-sm font-medium"
          >
            Get started
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
      </div>
    </div>
  );
};

export default forwardRef(Hero);
