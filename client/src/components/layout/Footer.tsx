import React from "react";
import GooglePlay from "../../assets/google-play-badge.png";
import AppleStore from "../../assets/appstore.svg";

function Footer() {
  return (
    <div className="bg-dark">
      <div className="container md:flex mx-auto w-full py-8 gap-5">
        <div className="w-full text-white bg-lightdark p-5">
          <h1 className="font-bold text-lg">Discover Deliveroo</h1>
          <div className="flex flex-col gap-1 mt-5">
            <a className="hover:text-primary" href="/#">
              Investors
            </a>
            <a className="hover:text-primary" href="/#">
              About us
            </a>
            <a className="hover:text-primary" href="/#">
              Takeaway
            </a>
            <a className="hover:text-primary" href="/#">
              More
            </a>
            <a className="hover:text-primary" href="/#">
              News Room
            </a>
            <a className="hover:text-primary" href="/#">
              Engineering Blog
            </a>
            <a className="hover:text-primary" href="/#">
              Design Blog
            </a>
            <a className="hover:text-primary" href="/#">
              Gift Cards
            </a>
            <a className="hover:text-primary" href="/#">
              Careers
            </a>
          </div>
        </div>
        <div className="w-full text-white bg-lightdark p-5">
          <h1 className="font-bold text-lg">Legal</h1>
          <div className="flex flex-col gap-1 mt-5">
            <a className="hover:text-primary" href="/#">
              Terms & Conditions
            </a>
            <a className="hover:text-primary" href="/#">
              Privacy
            </a>
            <a className="hover:text-primary" href="/#">
              Cookies
            </a>
            <a className="hover:text-primary" href="/#">
              Modern Slavery Statement
            </a>
            <a className="hover:text-primary" href="/#">
              Tax Strategy
            </a>
            <a className="hover:text-primary" href="/#">
              Section 172 Statement
            </a>
          </div>
        </div>
        <div className="w-full text-white bg-lightdark p-5">
          <h1 className="font-bold text-lg">Help</h1>
          <div className="flex flex-col gap-1 mt-5">
            <a className="hover:text-primary" href="/#">
              Contact
            </a>
            <a className="hover:text-primary" href="/#">
              FAQs
            </a>
            <a className="hover:text-primary" href="/#">
              Cuisines
            </a>
            <a className="hover:text-primary" href="/#">
              Brands
            </a>
          </div>
        </div>
        <div className="w-full text-white bg-lightdark p-5">
          <h1 className="font-bold text-lg">Take Deliveroo with you</h1>
          <div className="flex flex-col mt-5">
            <img src={GooglePlay} width={150} alt="Get it on Google Play" />
            <img
              src={AppleStore}
              className="p-2"
              width={150}
              alt="Download on the App Store"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
