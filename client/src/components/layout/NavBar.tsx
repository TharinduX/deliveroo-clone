import React from "react";
import { IoHomeOutline, IoPersonOutline } from "react-icons/io5";
import logo from "../../assets/logo.svg";
import Search from "../ui/Search";
import Button from "../ui/Button";

function NavBar() {
  return (
    <div className="fixed top-0 w-full py-4 border-b-1 border bg-white z-50">
      <div className="px-10 mx-auto">
        <div className="flex">
          <div className="flex items-center justify-between w-full">
            <img src={logo} width={121} alt="logo" />
            <Search />
            <div className="flex gap-5">
              <Button text="Sign up or Log in" Icon={IoHomeOutline} />
              <Button text="Account" Icon={IoPersonOutline} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
