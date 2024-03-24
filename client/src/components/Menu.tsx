import React, { useRef } from "react";
import { IoArrowForward, IoArrowBack, IoCartOutline } from "react-icons/io5";
import PopularItem from "./menu/PopularItem";
import MenuNav from './layout/MenuNav';
import MenuItem from './menu/MenuItem';

function Menu() {
  const scrollContainer = useRef<HTMLDivElement>(null);

  const scroll = (scrollOffset: number) => {
    if (scrollContainer.current) {
      scrollContainer.current.scrollLeft += scrollOffset;
    }
  };
  return (
    <>
      <MenuNav />
      <div className="bg-secondarybg p-10">
        <div className="grid grid-cols-3 gap-10">
          <div className="col-span-2">
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
                  <PopularItem
                    id="12"
                    name="Avocado Caesar Salad"
                    kcal={123}
                    price={23.99}
                    img="https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                  />
                  <PopularItem
                    id="12"
                    name="Avocado Caesar Salad"
                    kcal={123}
                    price={23.99}
                    img="https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                  />
                </div>
              </div>
            </div>
            <div className='mt-10'>
              <h1 className="text-2xl font-bold mb-8 text-text">
                Platters
              </h1>
              <div className="grid grid-cols-2 gap-5">
                <MenuItem />
              </div>
            </div>
          </div>
          <div className="col-span-1 sticky top-0">
            <div className="bg-white border rounded-md p-5 h-screen">
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
