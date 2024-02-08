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
import { Button } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesRight, faCaretRight } from "@fortawesome/free-solid-svg-icons";
// import makeS
const Card = ({ title, description, image }) => (
  <div
    className="flex flex-col items-center m-2 bg-[#1c5b5f] dark:bg-pink-600 rounded-lg shadow-lg cursor-pointer"
    style={{ zIndex: 10 }}
  >
    <img
      className="w-full h-32 object-cover"
      src="https://img.freepik.com/free-vector/social-development-abstract-concept-vector-illustration-children-learn-social-skills-competence-positive-impact-successful-communication-career-success-education-abstract-metaphor_335657-1426.jpg?w=740&t=st=1707316499~exp=1707317099~hmac=c470bee6148a11ae758c7916257b0e887272d40d84f02397c2c602d3e03414ca"
      alt={title}
    />
    <div className="p-6 flex flex-col items-center">
      <h3 className="mb-2 text-3xl font-bold text-white">{title}</h3>
      <p className="text-gray-200">{description}</p>
    </div>
  </div>
);

// const useStyles = makeStyles({
//   customButton: {
//     backgroundColor: "#000000", // Change this to your desired color
//     color: "#ffffff", // Change this to your desired text color
//     "&:hover": {
//       backgroundColor: "#234567", // Change this to your desired hover color
//     },
//   },
// });
const Hero = ({ nav, setNav }, ref) => {
  // const classes = useStyles();
  const navigate = useNavigate();
  // const {} = useContext(GlobalContext);
  const { type, colorMode } = useContext(GlobalContext);
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

  const options = useMemo(
    () => ({
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
          value: 100,
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
          speed: 2,
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
            // other options
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
    }),
    []
  );

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
      {/* <AnimateCursor /> */}

      {/* <div
        className="mx-auto flex min-h-screen max-w-screen-xl flex-col items-center px-4 py-8 sm:py-16  md:justify-center w-3/5 gap-5"
        style={{ zIndex: 10 }}
      >
        <span
          className="text-[#1c5b5f] dark:text-[#d61f68] text-8xl  font-extrabold flex flex-row items-center gap-5"
          style={{ zIndex: 10 }}
        >
          <div className="p-5 bg-[#1c5b5f] dark:bg-pink-600 text-white">
            BITS
          </div>
          <div>UNPLUGGED</div>
        </span>{" "}
        <div className="flex">
          <Card title="Learn" description="Acquire new skills" />
          <Card title="Practice" description="Hone your skills" />
          <Card title="Compete" description="Showcase your skills" />
        </div>
      </div> */}
      <div
        id="home"
        ref={ref}
        className="mx-auto flex min-h-screen max-w-screen-xl flex-col items-center gap-8 px-4 py-8 sm:py-16 md:flex-row  md:justify-center lg:px-6 xl:gap-16"
      >
        <div className="mt-4 md:mt-0 md:w-50%" style={{ zIndex: 10 }}>
          <h2 className="bu-text-primary mb-4 text-center text-4xl font-extrabold tracking-tight md:text-left">
            A platform for learning{" "}
            <span className="bu-text-title text-5xl">Computer Science</span>{" "}
            without coding{" "}
          </h2>

          <p className="bu-text-subtitle mb-6 text-center  font-light md:text-left md:text-lg">
            Bits unplugged is a platform for students to solve CS problems
            without needing to write a single line of code through an
            interactive medium
          </p>
          <div>
            <div
              onClick={() => {
                setLoading(true);
                document.body.style.cursor = "default";
                type == 2
                  ? navigate("/admin/topics")
                  : type == 1
                    ? navigate("/problemSet")
                    : type == 0
                      ? navigate("/topics")
                      : navigate("/login");
              }}
              className="bu-button-secondary bu-text-primary cursor-pointer rounded-lg px-5 py-2.5 text-center font-semibold text-xl hidden md:flex flex-row justify-center w-[13rem]"
            >
              <div className="flex flex-row gap-2 items-center">
                Get Started
                <FontAwesomeIcon icon={faAnglesRight} />
              </div>
            </div>
          </div>

          <div className="bu-text-primary">
            {/* <Button
              variant="contained"
              sx={{
                borderRadius: "0.5rem",
                backgroundColor:
                  colorMode === "light" ? "#94cebc" : "rgb(191,18,93)",
                padding: "0.5rem 1.75rem",
                fontSize: "18px",
                color: colorMode === "light" ? "black" : "white",
                fontWeight: "bold",
                transition: "background 0.3s ease 1",
                ":hover": {
                  backgroundColor:
                    colorMode === "light"
                      ? "rgb(124, 193, 172)"
                      : "rgb(153,21,75)",
                },
              }}
              onClick={() => {
                setLoading(true);
                document.body.style.cursor = "default";
                type == 2
                  ? navigate("/admin/topics")
                  : type == 1
                    ? navigate("/problemSet")
                    : type == 0
                      ? navigate("/topics")
                      : navigate("/login");
              }}
            >
              <div className="flex flex-row gap-2 items-center">
                Get started
                <FontAwesomeIcon icon={faAnglesRight} />
              </div>
            </Button> */}
          </div>
        </div>
        <div
          className="flex flex-row gap-0 md:w-50% relative"
          style={{ zIndex: 10 }}
        >
          {/* <Particles
            id="tsparticles"
            particlesLoaded={particlesLoaded}
            options={options}
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              zIndex: 11,
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            }}
          /> */}
          <ImageLoader
            className="block w-full dark:hidden"
            // src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/cta/cta-dashboard-mockup.svg"
            src="/images/hero-drag.svg"
            alt="dashboard image"
            style={{ zIndex: 10 }}
          />
          <ImageLoader
            className="hidden w-full dark:block"
            // src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/cta/cta-dashboard-mockup-dark.svg"
            src="/images/hero-drag.svg"
            alt="dashboard image"
            style={{ zIndex: 10 }}
          />
        </div>
        <div
          onClick={() => {
            setLoading(true);
            document.body.style.cursor = "default";
            type == 2
              ? navigate("/admin/topics")
              : type == 1
                ? navigate("/problemSet")
                : type == 0
                  ? navigate("/topics")
                  : navigate("/login");
          }}
          className="bu-button-secondary bu-text-primary cursor-pointer items-center rounded-lg px-5 py-2.5 text-center font-semibold capitalize text-xl flex md:hidden w-[12rem] justify-center"
        >
          <div className="flex flex-row gap-2 items-center">
            Get Started
            <FontAwesomeIcon icon={faAnglesRight} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default forwardRef(Hero);
