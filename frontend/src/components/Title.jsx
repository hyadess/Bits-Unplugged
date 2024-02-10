const Title = ({ title, sub_title }) => {
  return (
    <div className="gap-8 items-center py-4 mx-auto w-full xl:gap-16 sm:pt-12">
      <div className="mt-4 md:mt-0">
        <h2 className="mb-4 text-center md:text-left text-5xl tracking-tight font-extrabold">
          <span className="bu-text-title">{title}</span>
        </h2>

        <p className="mb-5 text-center md:text-left  font-light  md:text-lg bu-text-subtitle">
          {sub_title}
        </p>
      </div>
    </div>
  );
};

export default Title;
