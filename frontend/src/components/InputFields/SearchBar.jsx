import SearchIcon from "@mui/icons-material/Search";

const SearchBar = ({ setSearchQuery, label, setSearch }) => {
  return (
    <div className="relative flex items-center w-full transition-all duration-300">
      <input
        // value={props.value}
        type="name"
        // name={props.name}
        // id={props.id}
        className="sm:text-sm rounded-lg block w-full p-2.5 pr-10 bu-bg-color bu-text-primary placeholder-gray-400  focus:outline-none"
        placeholder="user name"
        // required={props.required}
        // onChange={(e) => props.onChange(e.target.value)}
        onFocus={() => setSearch(true)}
        onBlur={() => setSearch(false)}
      />
      <span className="absolute right-3 top-1/2 transform -translate-y-1/2">
        <div className="bu-text-primary">
          <SearchIcon />
        </div>
      </span>
    </div>
  );
};

export default SearchBar;
