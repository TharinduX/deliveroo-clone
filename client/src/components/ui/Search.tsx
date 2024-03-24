import React from "react";
import { IoSearchOutline } from "react-icons/io5";

function Search() {
  return (
    <div className="bg-slate-200/60 hidden md:flex items-center gap-5 py-3 px-5 rounded-md border text-slate-400 w-[30%]">
      <IoSearchOutline size={18} />
      <input
        type="text"
        className="bg-transparent w-full focus:outline-none "
        placeholder="Search for anything"
      />
    </div>
  );
}

export default Search;
