import React from "react";
import { IoAdd } from "react-icons/io5";
import { MenuItem as Item } from "../../types";

interface MenuItemProps {
  item: Item;
}

function MenuItem({ item }: MenuItemProps) {
  return (
    <div className="w-full">
      <div className="bg-white rounded-md shadow-sm p-4 w-full hover:shadow-xl cursor-pointer">
        <div className="w-full gap-5 grid grid-cols-5">
          <div className="flex flex-col gap-2 col-span-3">
            <span className="font-bold text-text">{item.name}</span>
            <span className="text-sm text-lighttext line-clamp-3">
              {item.description}
            </span>
            <span className="text-lighttext text-lg">Rs:{item.price}</span>
          </div>
          <div className="flex col-span-2">
            <div className="flex gap-5">
              <div className="w-full flex items-center justify-center">
                <img
                  src={item.image}
                  alt="food"
                  className="object-cover rounded-md w-full h-full"
                />
              </div>
              <button
                className="border items-center justify-center flex"
                type="button"
              >
                <IoAdd size={25} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MenuItem;
