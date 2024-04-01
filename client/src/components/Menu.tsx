import React, { useRef } from "react";
import { IoArrowForward, IoArrowBack, IoCartOutline } from "react-icons/io5";
import PopularItem from "./menu/PopularItem";
import MenuNav from "./layout/MenuNav";
import MenuItem from "./menu/MenuItem";
import { RestaurantType } from "../types";

interface RestaurantDetailsProps {
  restaurant: RestaurantType;
}

function Menu({ restaurant }: RestaurantDetailsProps) {
  const scrollContainer = useRef<HTMLDivElement>(null);

  const scroll = (scrollOffset: number) => {
    if (scrollContainer.current) {
      scrollContainer.current.scrollLeft += scrollOffset;
    }
  };

  return (
    <>
      <MenuNav restaurant={restaurant} />
      <div className="bg-secondarybg p-5 md:p-10">
        <div className="grid grid-cols-3 gap-10">
          <div className="col-span-3 md:col-span-2">
            <div className="popular-items">
              <h1 className="text-2xl font-bold mb-8 text-text">
                Popular with other people
              </h1>
              <div className="relative">
                <div
                  className="absolute right-0 top-0 bottom-0 w-48 bg-gradient-to-l from-white/80 to-transparent"
                  aria-label="gradient"
                />
                <button
                  className="absolute -left-5 top-1/2 transform -translate-y-1/2 rounded-full p-3 bg-white text-primary shadow-md"
                  aria-label="Left scroll"
                  type="button"
                  onClick={() => scroll(-300)}
                >
                  <IoArrowBack size={20} />
                </button>
                <button
                  className="absolute -right-5 top-1/2 transform -translate-y-1/2 rounded-full p-3 bg-white text-primary shadow-md"
                  aria-label="Right scroll"
                  type="button"
                  onClick={() => scroll(300)}
                >
                  <IoArrowForward size={20} />
                </button>
                <div
                  ref={scrollContainer}
                  className=" flex gap-5 overflow-x-scroll no-scrollbar py-2 scroll-smooth"
                >
                  {restaurant.categories.map((category) =>
                    category.menuItems
                      .filter((item) => item.isPopular)
                      .map((item) => (
                        <div key={item.id}>
                          <PopularItem
                            id={item.id}
                            name={item.name}
                            kcal={item.kcal}
                            price={item.price}
                            img={item.image}
                          />
                        </div>
                      )),
                  )}
                </div>
              </div>
            </div>
            {restaurant.categories.map((category) => (
              <div
                key={category.id}
                id={category.categorySlug}
                className="mt-10"
              >
                <h1 className="text-2xl capitalize font-bold mb-8 text-text">
                  {category.name}
                </h1>
                <div className="grid lg:grid-cols-2 gap-5">
                  {category.menuItems.map((item) => (
                    <MenuItem key={item.id} item={item} />
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="col-span-1 sticky top-0 hidden md:block">
            <div className="bg-white border rounded-md p-5">
              <div className="text-lighttext/50 items-center mx-auto justify-center flex flex-col h-[450px]">
                <IoCartOutline size={60} />
                <p>Your basket is empty</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Menu;
