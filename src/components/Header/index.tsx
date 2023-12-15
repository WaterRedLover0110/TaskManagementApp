import { useDispatch } from "react-redux";
import { useGetTheme, useGetUser } from "../../hooks";
import { removeUser, toogleTheme } from "../../store/user";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { DarkIcon, LightIcon } from "../../icons";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  const user: any = useGetUser();
  const isDarkMode: boolean = useGetTheme();

  if (!user) return <></>;

  const handleThemeChange = () => {
    dispatch(toogleTheme(!isDarkMode));
  };

  const handleLogout = () => {
    dispatch(removeUser());
    navigate("/signin");
  };

  const handleShowMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <header className="h-16 w-full flex items-center relative justify-end px-5 space-x-10 bg-gray-100 dark:bg-gray-800 shadow-sm">
      <div className="flex flex-shrink-0 items-center space-x-3 text-white">
        <div className="flex flex-col justify-center ml-3">
          <button onClick={handleThemeChange}>
            <DarkIcon />
            <LightIcon />
          </button>
        </div>
        <div className="flex flex-col items-end ">
          <div className="text-sm font-small text-gray-500 dark:text-gray-400">
            {user && user.email}
          </div>
        </div>

        <div
          className="h-10 w-10 rounded-full cursor-pointer bg-gray-200 dark:bg-gray-500 border-2 border-blue-400 dark:border-gray-600"
          onClick={handleShowMenu}
        >
          {showMenu && (
            <div
              id="dropdownDivider"
              className="absolute right-2 top-16 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-800 dark:divide-gray-600"
            >
              <ul
                className="py-2 text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="dropdownDividerButton"
              >
                <li className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">
                  Profile
                </li>
                <li onClick={handleLogout} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                  Logout
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
