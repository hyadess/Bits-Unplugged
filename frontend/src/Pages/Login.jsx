import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthController from "../controller/authController";
import { useSearchParams, createSearchParams } from "react-router-dom";
import { CircularProgress, Switch } from "@mui/material";
import "./Login.scss";
import Banner from "../Components/Banner";
const authController = new AuthController();


const InputField = (props) => {
  return (
    <div>
      <label
        for={props.name}
        class="block mb-2 text-sm font-medium bu-text-primary"
      >
        {props.label}
      </label>
      <input
        value={props.value}
        type={props.type}
        name={props.name}
        id={props.id}
        class="border sm:text-sm rounded-lg  block w-full p-2.5   bu-input-primary"
        placeholder={props.placeholder}
        required={props.required}
        onChange={(e) => props.onChange(e.target.value)}
      />
    </div>
  );
};
const Login = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);
  const [type, setType] = useState(searchParams.get("type"));
  const [checked, setChecked] = useState(type === "setter" ? true : false);
  const navigate = useNavigate();

  const handleSignup = () => {
    navigate({
      pathname: "/signup",
      search: createSearchParams({
        type: type,
      }).toString(),
    });
  };

  useEffect(() => {
    if (type == undefined) {
      searchParams.set("type", "solver");
      setSearchParams(searchParams);
      setType("solver");
    } else {
      if (type !== searchParams.get("type")) {
        searchParams.set("type", type);
        setSearchParams(searchParams);
      }
    }
  }, [type]);

  const handleSubmit = async () => {
    if (!loggingIn) {
      const res = await authController.login({
        email: email,
        pass: password,
        type: type == "solver" ? 0 : 1,
      });
      if (res.success) {
        console.log("Logged IN");
        setLoggingIn(true);
        type == "solver" ? navigate("/topics") : navigate("/problemSet");
      }
    }
  };
  return (
    <div className="min-h-screen bu-bg-color">
      <section>
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto gap-5 min-h-screen">
          <>
            <div onClick={() => navigate("/home")} className="cursor-pointer">
              <Banner width={200} height={50} />
            </div>
            <div class="w-full rounded-lg shadow-lg border md:mt-0 sm:max-w-md xl:p-0 bu-card-secondary">
              <div class="p-6 space-y-6 md:space-y-6 sm:p-10">
                <div className="hbox flex-center">
                  <h6
                    className={
                      checked
                        ? "flex items-center bu-text-subtitle"
                        : "flex items-center text-xl font-semibold bu-text-primary"
                    }
                  >
                    User
                  </h6>
                  <Switch
                    checked={checked}
                    onChange={() => {
                      if (checked) {
                        setChecked(false);
                        setType("solver");
                      } else {
                        setChecked(true);
                        setType("setter");
                      }
                    }}
                  />
                  <h6
                    className={
                      checked
                        ? "flex items-center text-xl font-semibold bu-text-primary"
                        : "flex items-center bu-text-subtitle"
                    }
                    style={{ width: "2vw", fontWeight: "" }}
                  >
                    Setter
                  </h6>
                </div>
                <h1 class="text-xl font-bold leading-tight tracking-tight md:text-2xl bu-text-primary">
                  Sign in to your account
                </h1>
                <div class="space-y-4 md:space-y-6">
                  <InputField
                    label="Username/Email Address"
                    type="text"
                    name="email"
                    id="email"
                    placeholder="email"
                    required="true"
                    onChange={setEmail}
                    value={email}
                  />

                  {/* <div>
                    <label
                      for="email"
                      class="block mb-2 text-sm font-medium bu-text-primary"
                    >
                      Username/Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-pink-600 focus:border-pink-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                      placeholder="name@company.com"
                      required=""
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div> */}
                  <div>
                    <label
                      for="password"
                      class="block mb-2 text-sm font-medium bu-text-primary"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="••••••••"
                      class="border sm:text-sm rounded-lg  block w-full p-2.5  placeholder-gray-400 bu-input-primary"
                      required=""
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div class="flex items-center justify-between">
                    <div class="flex items-start">
                      <div class="flex items-center h-5">
                        <input
                          id="remember"
                          aria-describedby="remember"
                          type="checkbox"
                          class="w-4 h-4 border rounded "
                          required=""
                        />
                      </div>
                      <div class="ml-3 text-sm">
                        <label for="remember" class="bu-text-subtitle">
                          Remember me
                        </label>
                      </div>
                    </div>
                    <a
                      href="#"
                      class="text-sm font-medium  hover:underline bu-text-title"
                    >
                      Forgot password?
                    </a>
                  </div>
                  {!loggingIn && (
                    <button
                      type="submit"
                      class="w-full font-medium rounded-lg text-sm px-5 py-2.5 text-center bu-button-primary bu-text-primary"
                      onClick={handleSubmit}
                    >
                      Sign in
                    </button>
                  )}

                  {/* <button
                  type="submit"
                  class="w-full text-white bg-pink-600 hover:bg-pink-700 focus:ring-4 focus:outline-none focus:ring-pink-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-pink-600 hover:bg-pink-700 focus:ring-pink-800"
                  onClick={() => navigate("/home")}
                >
                  View As Guest
                </button> */}
                  <p class="text-sm font-light bu-text-subtitle">
                    Don’t have an account yet?{" "}
                    <a
                      onClick={handleSignup}
                      class="font-medium  hover:underline bu-text-title"
                    >
                      Sign up
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </>
        </div>
      </section>
    </div>
  );
};

export default Login;
