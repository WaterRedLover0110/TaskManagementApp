import { useDispatch } from "react-redux";
import { useGetTheme, useGetUser } from "../../hooks";
import { KanbanUserTypes } from "../../types";
import { toogleTheme } from "../../store/user";

const Header = () => {
  const dispatch = useDispatch();

  const user: any = useGetUser();
  const isDarkMode: boolean = useGetTheme();

  if (!user) return <></>;

  const handleThemeChange = () => {
    dispatch(toogleTheme(!isDarkMode));
  };

  return (
    <header className="h-16 w-full flex items-center relative justify-end px-5 space-x-10 bg-gray-100 dark:bg-gray-800 shadow-sm">
      <div className="flex flex-shrink-0 items-center space-x-3 text-white">
        <div className="flex flex-col justify-center ml-3">
          <button onClick={handleThemeChange}>
            <svg
              className="dark:hidden"
              width="16"
              height="16"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                className="fill-slate-300"
                d="M7 0h2v2H7zM12.88 1.637l1.414 1.415-1.415 1.413-1.413-1.414zM14 7h2v2h-2zM12.95 14.433l-1.414-1.413 1.413-1.415 1.415 1.414zM7 14h2v2H7zM2.98 14.364l-1.413-1.415 1.414-1.414 1.414 1.415zM0 7h2v2H0zM3.05 1.706 4.463 3.12 3.05 4.535 1.636 3.12z"
              />
              <path
                className="fill-slate-400"
                d="M8 4C5.8 4 4 5.8 4 8s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4Z"
              />
            </svg>
            <svg
              className="hidden dark:block"
              width="16"
              height="16"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                className="fill-slate-400"
                d="M6.2 1C3.2 1.8 1 4.6 1 7.9 1 11.8 4.2 15 8.1 15c3.3 0 6-2.2 6.9-5.2C9.7 11.2 4.8 6.3 6.2 1Z"
              />
              <path
                className="fill-slate-500"
                d="M12.5 5a.625.625 0 0 1-.625-.625 1.252 1.252 0 0 0-1.25-1.25.625.625 0 1 1 0-1.25 1.252 1.252 0 0 0 1.25-1.25.625.625 0 1 1 1.25 0c.001.69.56 1.249 1.25 1.25a.625.625 0 1 1 0 1.25c-.69.001-1.249.56-1.25 1.25A.625.625 0 0 1 12.5 5Z"
              />
            </svg>
          </button>
        </div>
        <div className="flex flex-col items-end ">
          <div className="text-sm font-small text-gray-500 dark:text-gray-400">
            {user && user.email}
          </div>
        </div>

        <div className="h-10 w-10 rounded-full cursor-pointer bg-gray-200 dark:bg-gray-500 border-2 border-blue-400 dark:border-gray-600"></div>
      </div>
    </header>
  );
};

export default Header;
