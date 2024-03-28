import React from "react";
import { IoAdd } from "react-icons/io5";

function MenuItem() {
  return (
    <div className="w-full">
      <div className="bg-white rounded-md shadow-sm p-4 w-full hover:shadow-xl cursor-pointer">
        <div className="w-full gap-5 grid grid-cols-5">
          <div className="flex flex-col gap-2 col-span-3">
            <span className="font-bold text-text">
              Halloumi & roasted veg salad platter
            </span>
            <span className="text-sm text-lighttext line-clamp-2">
              A feast for 6 people! halloumi with pesto, roasted peppers,
              roasted tomatoes, sweet potato, pickled red onion and balsamic
              dressing served on a mixed leaf base.
            </span>
            <span className="text-lighttext text-lg">Rs: 100</span>
          </div>
          <div className="flex col-span-2">
            <div className="flex gap-5">
              <div className="w-full flex items-center justify-center">
                <img
                  src="https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
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
