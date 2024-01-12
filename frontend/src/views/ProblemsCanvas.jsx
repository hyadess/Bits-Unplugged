const Title = ({ problem }) => {
  return (
    <div className="flex max-w-screen-xl flex-col gap-3 py-4 sm:pt-12">
      <div className="mt-4 md:mt-0">
        <h2 className="text-left text-5xl font-extrabold tracking-tight ">
          <span className="bu-text-title">{problem.title}</span>
        </h2>
      </div>
      <span className="bu-text-subtitle text-xl">
        {problem
          ? problem?.series?.topic?.name + " > " + problem?.series?.name
          : ""}
      </span>
    </div>
  );
};

const Header = () => (
  <div className="flex flex-row justify-between">
    <Title />
    {type != 0 ? (
      <div className="flex items-center">
        <button
          className="bu-button-primary rounded-lg px-7 py-3.5 text-center text-lg font-medium text-white"
          onClick={() => {
            setLoading(true);
            navigator(
              type == 2 ? `/admin/problems/${id}` : `/problem/${id}/edit`
            );
          }}
        >
          <div className="flex flex-row items-center gap-4">
            <FontAwesomeIcon icon={faPenToSquare} size="sm" />
            EDIT
          </div>
        </button>
      </div>
    ) : (
      <div className="flex items-center">
        <button
          className="bu-button-primary rounded-lg px-7 py-3.5 text-center text-lg font-medium text-white"
          onClick={() => {
            setLoading(true);
            console.log(problem);
            navigator(`/submission/${id}`);
          }}
        >
          <div className="flex flex-row items-center gap-4">SUBMISSIONS</div>
        </button>
      </div>
    )}
  </div>
);

const Statement = () => (
  <div className="mx-auto max-w-screen-2xl items-center">
    <div className="bu-text-primary mb-6  text-left font-light md:text-lg">
      <div
        style={{
          width: "100%",
          padding: "30px 0",
          fontSize: "25px",
          border: "none",
          borderRadius: "20px",
        }}
      >
        <MarkdownPreview
          colorMode={colorMode}
          text={statement}
          customStyle={{ padding: "20px" }}
        />
      </div>
    </div>
  </div>
);

const Canvas = () =>
  canvasId &&
  canvasRef && (
    <div className="flex w-full flex-col gap-5">
      <CanvasContainer
        canvasId={canvasId}
        input={input}
        setInput={setInput}
        mode={"preview"}
        ref={canvasRef}
        editOptions={editOptions}
        setEditOptions={setEditOptions}
        previewOptions={previewOptions}
        setPreviewOptions={setPreviewOptions}
      />
      <div className="flex flex-row justify-between">
        <Button
          variant="contained"
          color="success"
          onClick={() => {
            reset();
            // canvasRef.current.handleReset(); // Call this after reset
          }}
          startIcon={
            <RotateLeftIcon sx={{ fontSize: "2rem", color: "white" }} />
          }
        >
          Reset
        </Button>
        <Button
          variant="contained"
          onClick={solutionSubmit}
          endIcon={<SendIcon sx={{ fontSize: "2rem", color: "white" }} />}
        >
          Submit
        </Button>
      </div>
    </div>
  );

const ProblemsCanvasView = ({ problem, onSubmit, onReset }) => {
  return (
    <div>
      {problem && (
        <>
          <div>
            <Header />
            <Statement />
          </div>
          <Canvas />
        </>
      )}
    </div>
  );
};
