import React, { useState } from "react";
import { IoHomeOutline, IoPersonOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import logo from "../../assets/logo.svg";
import Search from "../ui/Search";
import Button from "../ui/Button";
import { selectCurrentUser, logOut } from "../../features/auth/authSlice";

interface User {
  email: string;
  role: string;
  firstName: string;
  lastName: string;
  phone: string;
  // include other properties as needed
}

function NavBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser) as User | null;
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    dispatch(logOut());
    setDropdownOpen(!dropdownOpen);
    navigate("/login");
  };

  return (
    <div className="fixed top-0 w-full py-4 border-b-1 border bg-white z-50">
      <div className="px-10 mx-auto">
        <div className="flex">
          <div className="flex items-center justify-between w-full">
            <a href="/">
              <img
                className="cursor-pointer"
                src={logo}
                width={121}
                alt="logo"
              />
            </a>
            <Search />
            {user ? (
              <div className="hidden md:flex cursor-pointer">
                <Button
                  onClick={handleDropdown}
                  className="hidden md:flex"
                  text={`Welcome ${user.firstName},`}
                  Icon={IoPersonOutline}
                />
                {dropdownOpen && (
                  <div className="absolute z-50 mt-12 right-10 w-48 rounded-md shadow-lg">
                    <div className="rounded-md ring-1 ring-black ring-opacity-5 overflow-hidden">
                      <div
                        className="py-1 bg-white"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="options-menu"
                      >
                        <a
                          href="/"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                          role="menuitem"
                        >
                          Your Profile
                        </a>
                        <a
                          href="/"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                          role="menuitem"
                        >
                          Settings
                        </a>
                        <button
                          type="button"
                          onClick={handleLogout}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full"
                          role="menuitem"
                        >
                          Sign out
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex gap-5">
                <Button
                  onClick={() => navigate("/register")}
                  className="hidden md:flex"
                  text="Sign up"
                  Icon={IoHomeOutline}
                />
                <Button
                  onClick={() => navigate("/login")}
                  text="Login"
                  Icon={IoPersonOutline}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
