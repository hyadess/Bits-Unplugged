import React from "react";
import Banner from "./Banner";

export default function Footer() {
  return (
    <footer class="hidden md:flex">
      <div class="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div class="sm:flex sm:items-center sm:justify-between">
          <Banner width={300} height={70} />
          <ul class="flex flex-wrap items-center mb-6 text-sm font-medium bu-text-subtitle sm:mb-0">
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
        <hr class="my-6  sm:mx-auto lg:my-8 bu-horizontal-bar" />
        <span class="block text-sm  sm:text-center bu-text-subtitle">
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
