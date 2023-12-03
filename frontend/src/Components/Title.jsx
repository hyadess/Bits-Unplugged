const Title = (props) => {
  return (
    <div class=" bg-gray-900">
      <div class="gap-8 items-center py-4 mx-auto max-w-screen-xl xl:gap-16 sm:pt-16">
        <div class="mt-4 md:mt-0">
          <h2 class="mb-4 text-center md:text-left text-5xl tracking-tight font-extrabold text-gray-900 text-white">
            <span class=" text-pink-500">{props.title}</span>
          </h2>

          <p class="mb-6 text-center md:text-left  font-light text-gray-500 md:text-lg text-gray-400">
            {props.sub_title}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Title;
