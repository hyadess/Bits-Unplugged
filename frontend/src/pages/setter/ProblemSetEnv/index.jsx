import ProblemSetEnvController from "./Controller";
import ProblemContextProvider from "./Model";

const ProblemSetEnv = () => {
  return (
    <ProblemContextProvider>
      <ProblemSetEnvController />
    </ProblemContextProvider>
  );
};
export default ProblemSetEnv;
