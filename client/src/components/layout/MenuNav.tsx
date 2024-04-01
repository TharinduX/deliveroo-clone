import React, { useState } from "react";
import { RestaurantType } from "../../types";

interface RestaurantDetailsProps {
  restaurant: RestaurantType;
}

function MenuNav({ restaurant }: RestaurantDetailsProps) {
  const [activeCategory, setActiveCategory] = useState<string>("");
  const scrollToCategory = (categorySlug: string) => {
    const categoryElement = document.getElementById(categorySlug);
    if (categoryElement) {
      categoryElement.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveCategory(categorySlug);
    }
  };

  return (
    <div className="bg-white border-y-1 border drop-shadow-sm py-6 sticky md:top-20 top-16 z-40 overflow-x-scroll no-scrollbar">
      <ul className="px-10 flex gap-4 text-secondary text-sm">
        {restaurant.categories.map((category) => (
          <li key={category.id}>
            <button
              type="button"
              className={`${
                activeCategory === category.categorySlug
                  ? "bg-primary text-white font-bold"
                  : "hover:text-primary"
              } px-4 py-1 text-nowrap rounded-full`}
              onClick={() => scrollToCategory(category.categorySlug)}
            >
              {category.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MenuNav;
