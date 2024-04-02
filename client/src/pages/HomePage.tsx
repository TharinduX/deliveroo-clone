import React from "react";
import RestaurantCard from "../components/home/RestaurantCard";
import { useGetRestaurantsQuery } from "../features/restaurant/restaurantApiSlice";
import { RestaurantType } from "../types";

function HomePage() {
  const { data } = useGetRestaurantsQuery(undefined, {});
  return (
    <div className="mt-32 p-10">
      <h1 className="text-text text-4xl font-bold text-center my-10">
        Restaurants
      </h1>
      <div className="grid gap-5 grid-cols-3">
        {data ? (
          data.restaurants.map((restaurant: RestaurantType) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))
        ) : (
          <div>Loading</div>
        )}
      </div>
    </div>
  );
}

export default HomePage;
