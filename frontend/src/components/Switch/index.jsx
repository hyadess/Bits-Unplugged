const SwitchPrimary = ({ checked, onChange }) => {
  return (
    <Switch
      checked={checked}
      onChange={onChange}
      className={`${
        checked
          ? "bg-teal-800 dark:bg-pink-500"
          : "bg-gray-400 dark:bg-gray-600"
      }
relative inline-flex h-[25px] w-[64px] shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200  ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75`}
    >
      <span
        aria-hidden="true"
        className={`${checked ? "translate-x-7" : "translate-x-[-2px]"}
  pointer-events-none inline-block h-[34px] w-[34px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
      />
    </Switch>
  );
};

const SwitchSecondary = ({ checked, onChange }) => {
  return (
    <Switch
      checked={checked}
      onChange={onChange}
      className={`${
        checked
          ? "bg-teal-800 dark:bg-pink-500"
          : "bg-gray-400 dark:bg-gray-600"
      }
          relative inline-flex h-[38px] w-[74px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75`}
    >
      <span
        aria-hidden="true"
        className={`${checked ? "translate-x-9" : "translate-x-0"}
            pointer-events-none inline-block h-[34px] w-[34px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
      />
    </Switch>
  );
};
