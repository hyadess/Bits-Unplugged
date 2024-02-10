import CustomModal from "../components/Modal/CustomModal";
import Title from "../components/Title";
import ProblemSetCard from "../components/Cards/ProblemSetCard";
import CardContainer from "../containers/CardContainer2";
import ProblemAddButton from "../components/Buttons/ProblemAddButton";
import { useEffect } from "react";
import SearchBar from "../components/InputFields/SearchBar";
import SearchIcon from "@mui/icons-material/Search";
const SetterProblemsView = ({
  problemList,
  deleteProblem,
  openModal,
  closeModal,
  createProblem,
  modalIsOpen,
  cloneProblem,
}) => {
  useEffect(() => {
    console.log(problemList);
  });
  return (
    <div>
      <div className="flex flex-col md:flex-row items-center justify-between">
        <Title
          title={`Previous Problems`}
          sub_title={`Set problems for particular series right on our site`}
        />
        <div className="flex w-full md:w-[20rem] items-center">
          <div className="relative flex items-center w-full transition-all duration-300">
            <input
              // value={props.value}
              type="name"
              // name={props.name}
              // id={props.id}
              className="sm:text-sm rounded-lg block w-full p-2.5 pr-10 bu-nav-color bu-text-primary placeholder-gray-400  focus:outline-none"
              placeholder="problem name"
              // required={props.required}
              // onChange={(e) => props.onChange(e.target.value)}
              // onFocus={() => setSearch(true)}
              // onBlur={() => setSearch(false)}
            />
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <div className="bu-text-primary">
                <SearchIcon />
              </div>
            </span>
          </div>
        </div>
      </div>

      <ProblemAddButton onClick={openModal} />

      <CardContainer col={2}>
        {problemList.map((prob, index) => (
          <ProblemSetCard
            key={index}
            idx={index + 1}
            id={prob.id}
            name={prob.title}
            deleteAction={deleteProblem}
            isLive={prob.isLive}
            timestamp={prob.updatedAt}
            canvas={prob.canvas?.name}
            cloneProblem={cloneProblem}
          />
        ))}
      </CardContainer>

      {modalIsOpen && (
        <CustomModal
          label={"Enter Problem Title"}
          placeholder={"Problem Title"}
          onClose={closeModal}
          onSubmit={createProblem}
        />
      )}
    </div>
  );
};

export default SetterProblemsView;
