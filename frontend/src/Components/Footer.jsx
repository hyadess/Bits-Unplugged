import React from "react";
import Banner from "./Banner";

export default function Footer() {
  return (
    <footer className="hidden md:flex">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <Banner width={300} height={70} />
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium bu-text-subtitle sm:mb-0">
            <li>
              <a href="#" className="mr-4 hover:underline md:mr-6 ">
                About
              </a>
            </li>
            <li>
              <a href="#" className="mr-4 hover:underline md:mr-6">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="mr-4 hover:underline md:mr-6 ">
                Licensing
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Contact
              </a>
            </li>
          </ul>
        </div>
        <hr className="my-6  sm:mx-auto lg:my-8 bu-horizontal-bar" />
        <span className="block text-sm  sm:text-center bu-text-subtitle">
          © 2023{" "}
          <a href="https://flowbite.com/" className="hover:underline">
            Bits Unplugged{" "}
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
}
