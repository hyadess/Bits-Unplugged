const MainContainer = (props) => {
  return (
    <div className="mx-auto pb-5 overflow-hidden p-5 pt-0 md:p-5 md:pt-20 min-h-screen w-full md:w-3/5">
      {props.children}
    </div>
  );
};


export default MainContainer;
