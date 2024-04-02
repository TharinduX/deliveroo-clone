import React from "react";

interface RestaurantCardProps {
  restaurant: {
    id: string;
    ownerId: string;
    name: string;
    slug: string;
    description: string;
    address: string;
    phone: string;
    image: string;
  };
}

function RestaurantCard({ restaurant }: RestaurantCardProps) {
  return (
    <div className="p-5 border rounded-md w-full">
      <div>{restaurant.name}</div>
    </div>
  );
}

export default RestaurantCard;
