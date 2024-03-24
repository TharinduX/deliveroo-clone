import React from "react";

function MenuNav() {
  return (
    <div className="bg-white border-y-1 border drop-shadow-sm py-6 sticky top-20 z-50">
      <ul className="px-10 flex gap-4 text-secondary text-sm">
        <li>
          <a
            className="hover:text-primary bg-primary px-4 py-1 rounded-full font-bold text-white"
            href="#Platters"
          >
            Platters
          </a>
        </li>
        <li>
          <a className="hover:text-primary px-4 py-1" href="#Salads">
            New daily specials
          </a>
        </li>
        <li>
          <a className="hover:text-primary  px-4 py-1" href="#Starters">
            Create your own
          </a>
        </li>
        <li>
          <a className="hover:text-primary  px-4 py-1" href="#Main">
            Salads
          </a>
        </li>
        <li>
          <a className="hover:text-primary  px-4 py-1" href="#Desserts">
            Desserts
          </a>
        </li>
        <li>
          <a className="hover:text-primary  px-4 py-1" href="#Drinks">
            Drinks
          </a>
        </li>
      </ul>
    </div>
  );
}

export default MenuNav;
