import { forwardRef, useEffect, useRef } from "react";
import TeamCard from "../../components/Cards/TeamCard";
import { useIsVisible } from "../../hooks/useIsVisible";

const Team = ({ setNav }, ref) => {
  // const ref = useRef();
  const isVisible = useIsVisible(ref);

  useEffect(() => {
    if (isVisible) {
      setNav("aboutus");
    }
  }, [isVisible]);
  return (
    <section>
      <div
        id="aboutus"
        ref={ref}
        className="mx-auto max-w-screen-xl px-4 py-8 lg:px-6 lg:py-24 mb-20 md:mb-0"
      >
        <div className="mx-auto mb-8 max-w-screen-sm text-center lg:mb-16">
          <h2 className="bu-text-primary mb-4 text-4xl font-extrabold tracking-tight">
            Our Team
          </h2>

          <p className="bu-text-subtitle font-light sm:text-xl lg:mb-8">
            Meet our dynamic team who are here to help you at each step of your
            journey
          </p>
        </div>
        <div className="mx-auto grid h-full w-full grid-cols-1 place-items-center gap-8 md:w-75% md:grid-cols-3">
          <TeamCard
            name="Sayem Shahad Soummo"
            position="1905064"
            detail="Backend Developer"
            image="/images/sayem.jpg"
          />
          <TeamCard
            name="Mahir Labib Dihan"
            position="1905072"
            detail="Fullstack Developer"
            image="/images/dihan.jpg"
          />
          <TeamCard
            name="Souvik Ghosh"
            position="1905073"
            detail="Frontend Developer"
            image="/images/souvik.jpg"
          />
        </div>
      </div>
    </section>
  );
};

export default forwardRef(Team);
