import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthController from "../../controller/authController";
import { useSearchParams, createSearchParams } from "react-router-dom";
import { CircularProgress, Switch } from "@mui/material";
import "./Login.scss";
import Banner from "../../Components/Banner";
import Layout1 from "../../Components/Layouts/Layout1";
import { PasswordField } from "../../Components/InputFields";
import { setLoading } from "../../App";
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
        class="border sm:text-sm rounded-lg  block w-full p-2.5 bu-input-primary"
        placeholder={props.placeholder}
        required={props.required}
        onChange={(e) => props.onChange(e.target.value)}
      />
    </div>
  );
};
const AdminLogin = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loggingIn, setLoggingIn] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!loggingIn) {
      console.log("Trying to Login");
      const res = await authController.login({
        email: email,
        pass: password,
        type: 2,
      });
      if (res.success) {
        setLoading(true);
        console.log("Logged IN");
        setLoggingIn(true);
        navigate("/admin");
      }
    }
  };
  return (
    <Layout1>
      <section>
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto gap-5 min-h-screen">
          <>
            <div
              onClick={() => {
                setLoading(true);
                navigate("/home");
              }}
              className="cursor-pointer"
            >
              <Banner width={200} height={50} />
            </div>
            <div class="w-full rounded-lg shadow-lg border md:mt-0 sm:max-w-md xl:p-0 bu-card-secondary">
              <div class="p-6 space-y-6 md:space-y-6 sm:p-10">
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

                  <PasswordField
                    label="Password"
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    required="true"
                    setValue={setPassword}
                    value={password}
                    // showPassword={showPassword}
                    // setShowPassword={setShowPassword}
                  />

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
                </div>
              </div>
            </div>
          </>
        </div>
      </section>
    </Layout1>
  );
};

export default AdminLogin;
