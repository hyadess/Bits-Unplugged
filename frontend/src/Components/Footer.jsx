import React from "react";
import Banner from "./Banner";

export default function Footer() {
  return (
    <footer class=" hidden md:flex shadow bg-slate-900">
      <div class="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div class="sm:flex sm:items-center sm:justify-between">
          {/* <a href="" class="flex items-center mb-4 sm:mb-0 ">
            <div className="icon flex-1 hidden md:flex w-20 h-20 ">
              <img
                src="https://i.postimg.cc/SsnSSJVq/image.png"
                style={{ padding: "10px" }}
              />
            </div>
            <span class="self-center text-2xl font-semibold whitespace-nowrap text-white">
              Bits Unplugged
            </span>
          </a> */}
          <Banner width={300} height={70} />
          <ul class="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 text-gray-400">
            <li>
              <a href="#" class="mr-4 hover:underline md:mr-6 ">
                About
              </a>
            </li>
            <li>
              <a href="#" class="mr-4 hover:underline md:mr-6">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" class="mr-4 hover:underline md:mr-6 ">
                Licensing
              </a>
            </li>
            <li>
              <a href="#" class="hover:underline">
                Contact
              </a>
            </li>
          </ul>
        </div>
        <hr class="my-6 border-gray-200 sm:mx-auto border-gray-700 lg:my-8" />
        <span class="block text-sm text-gray-500 sm:text-center text-gray-400">
          © 2023{" "}
          <a href="https://flowbite.com/" class="hover:underline">
            Bits Unplugged{" "}
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
}
