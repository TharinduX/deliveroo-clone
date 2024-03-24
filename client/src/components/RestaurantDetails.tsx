import React from "react";
import {
  IoInformationCircleOutline,
  IoChevronForward,
  IoStar,
  IoPeopleOutline,
} from "react-icons/io5";
import DeliveryBike from "../assets/bike.svg";
import Button from "./ui/Button";

function RestaurantDetails() {
  return (
    <div className="restaurant__details">
      <div className="bg-white mt-20 mx-auto py-5 px-10">
        <div className="flex gap-5">
          <div className="w-[50%] bg-gray-500 rounded-lg">
            <img src="" alt="" />
          </div>
          <div className="w-full justify-between xl:flex block text-text py-5">
            <div className="flex flex-col gap-2">
              <h1 className="text-4xl font-bold ">Restaurant Name</h1>
              <span className="">Chicken · Salads · Healthy</span>
              <span>
                0.20 miles away · Opens at 11:00 on Monday · £7.00 minimum ·
                £0.49 delivery
              </span>
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
