import React from "react";
import { IoAddOutline } from "react-icons/io5";

interface PopularItemProps {
  id: string;
  name: string;
  kcal: number;
  price: number;
  img: string;
}

function PopularItem({ id, name, kcal, price, img }: PopularItemProps) {
  return (
    <div
      key={id}
      className="bg-white w-20 shadow-md rounded-md overflow-hidden min-w-[150px] cursor-pointer"
    >
      <div className="w-full">
        <img
          className="w-full h-36 object-cover rounded-sm"
          src={img}
          alt="food"
        />
        <div className="p-2 flex flex-col gap-2 w-full">
          <h3 className="text-sm font-bold leading-tight text-text">{name}</h3>
          <p className="text-sm text-lighttext">{kcal} Kcal</p>
          <p className="text-sm text-lighttext">Rs. {price}</p>
          <button
            className="text-lighttext w-full mt-2 p-2 border  items-center justify-center text-center flex rounded-md"
            aria-label="Add to basket"
            type="button"
          >
            <IoAddOutline />
          </button>
        </div>
      </div>
    </div>
  );
}

export default PopularItem;
