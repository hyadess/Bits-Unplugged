const Title = (props) => {
  return (
    <div>
      <div class="gap-8 items-center py-4 mx-auto max-w-screen-xl xl:gap-16 sm:pt-12">
        <div class="mt-4 md:mt-0">
          <h2 class="mb-4 text-center md:text-left text-5xl tracking-tight font-extrabold">
            <span class="bu-text-title">{props.title}</span>
          </h2>

          <p class="mb-8 text-center md:text-left  font-light  md:text-lg bu-text-subtitle">
            {props.sub_title}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Title;
