import React from "react";
import { useParams } from "react-router-dom";
import RestaurantDetails from "../components/RestaurantDetails";
import Menu from "../components/Menu";
import { useGetRestaurantQuery } from "../features/restaurant/restaurantApiSlice";

function RestaurantPage() {
  const { slug } = useParams(); // Get slug from URL params
  const { data } = useGetRestaurantQuery(slug);
  return (
    <div>
      {data ? (
        <>
          <RestaurantDetails restaurant={data} />
          <Menu restaurant={data} />
        </>
      ) : (
        <div>hi</div>
      )}
    </div>
  );
}

export default RestaurantPage;
