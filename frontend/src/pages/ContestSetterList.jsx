import React from "react";
import SetterCard from "../components/Cards/SetterCard";

const ContestSettersList = ({ setterList }) => {
  return (
    <section>
      <div
        id="aboutus"
        className="mx-auto max-w-screen-xl px-4 py-8 lg:px-6 lg:py-24 mb-20 md:mb-0"
      >
        <div className="mx-auto mb-8 max-w-screen-sm text-center lg:mb-16">
          <h2 className="bu-text-primary mb-4 text-4xl font-extrabold tracking-tight">
            Our Problem Setters
          </h2>

          <p className="bu-text-subtitle font-light sm:text-xl lg:mb-8">
            Meet our dynamic team who are here to help you at each step of your journey
          </p>
        </div>
        <div className="mx-auto grid h-full w-full grid-cols-1 place-items-center gap-8 md:w-75% md:grid-cols-2">
          {/* {setterList.map((setter) => (
            <SetterCard
              key={setter.id}
              name={setter.username}
              position={setter.role}
              image={setter.image}
            />
          ))} */}
        </div>
      </div>
    </section>
  );
};

export default ContestSettersList;