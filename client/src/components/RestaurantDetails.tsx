import React from "react";
import {
  IoInformationCircleOutline,
  IoChevronForward,
  IoStar,
  IoPeopleOutline,
} from "react-icons/io5";
import DeliveryBike from "../assets/bike.svg";
import Button from "./ui/Button";
import { RestaurantType } from "../types";

interface RestaurantDetailsProps {
  restaurant: RestaurantType;
}

function RestaurantDetails({ restaurant }: RestaurantDetailsProps) {
  return (
    <div className="restaurant-details">
      <div className="bg-white mt-18 md:mt-20 mx-auto py-5 md:px-10">
        <div className=" md:flex gap-5">
          <div className="md:w-[50%] h-[400px] w-full bg-gray-500 ">
            <img
              className="object-cover h-full w-full"
              src={restaurant.image}
              alt=""
            />
          </div>
          <div className="w-full justify-between xl:flex block text-text py-5 px-5">
            <div className="flex flex-col gap-2">
              <h1 className="text-4xl font-bold ">{restaurant.name}</h1>
              <span className="">{restaurant.address}</span>
              <span>{restaurant.description}</span>
              <div className="pt-5 flex items-center gap-3 text-lighttext hover:cursor-pointer">
                <IoInformationCircleOutline size={22} />
                <div className="flex flex-col">
                  <span>Info</span>
                  <span className="text-sm">
                    Map, allergens and hygiene rating
                  </span>
                </div>
                <IoChevronForward className="text-primary" size={20} />
              </div>
              <div className="pt-5 flex items-center gap-3  hover:cursor-pointer text-darkgreen">
                <IoStar size={22} />
                <div className="flex flex-col">
                  <span className="">4.7 Excellent</span>
                  <span className="text-sm text-lighttext">
                    See all 500 reviews
                  </span>
                </div>
                <IoChevronForward className="text-primary" size={20} />
              </div>
            </div>
            <div className="flex flex-col justify-start pt-5 xl:items-end items-start xl:pt-0 w-[40%] gap-2">
              <div className="flex items-center gap-4">
                <img src={DeliveryBike} width={40} alt="delivery bike" />
                <p>Deliver</p>
                <button className="text-secondary" type="button">
                  Change
                </button>
              </div>
              <Button Icon={IoPeopleOutline} text="Start group order" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RestaurantDetails;
