import React from "react";
import { IoAdd } from "react-icons/io5";

function MenuItem() {
  return (
    <div className="w-full">
      <div className="bg-white rounded-md shadow-sm p-4 w-full hover:shadow-xl cursor-pointer">
        <div className="flex w-full gap-5">
          <div className="w-[70%] flex flex-col gap-2">
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
          <div className="flex w-[30%]">
            <div className="flex w-full gap-5">
              <img
                width={100}
                height={100}
                src="https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                alt="food"
                className="object-cover rounded-lg"
              />
              <button
                className="border w-10 items-center justify-center flex"
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
