import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthController from "../../controller/authController";
import { useSearchParams, createSearchParams } from "react-router-dom";
import { CircularProgress, Switch } from "@mui/material";
import Banner from "../../Components/Banner";
import Layout1 from "../../Components/Layouts/Layout1";
import { PasswordField } from "../../Components/InputFields";
import { setLoading } from "../../App";
const authController = new AuthController();

const InputField = (props) => {
  return (
    <div>
      <label
        // for={props.name}
        className="block mb-2 text-sm font-medium bu-text-primary"
      >
        {props.label}
      </label>
      <input
        value={props.value}
        type={props.type}
        name={props.name}
        id={props.id}
        className="border sm:text-sm rounded-lg  block w-full p-2.5 bu-input-primary"
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
      setLoading(true);
      const res = await authController.login({
        email: email,
        pass: password,
        type: 2,
      });
      if (res.success) {
        setLoggingIn(true);
        navigate("/admin/topics");
      } else {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    setLoading(false);
  }, []);
  return (
    <Layout1>
      <section>
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto gap-5 min-h-screen">
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
            <div className="w-full rounded-lg shadow-lg border md:mt-0 sm:max-w-md xl:p-0 bu-card-secondary">
              <div className="p-6 space-y-6 md:space-y-6 sm:p-10">
                <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl bu-text-primary">
                  Sign in to your account
                </h1>
                <div className="space-y-4 md:space-y-6">
                  <InputField
                    label="Username/Email Address"
                    type="text"
                    name="email"
                    id="email"
                    placeholder="email"
                    required={true}
                    onChange={setEmail}
                    value={email}
                  />

                  <PasswordField
                    label="Password"
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    required={true}
                    setValue={setPassword}
                    value={password}
                    // showPassword={showPassword}
                    // setShowPassword={setShowPassword}
                  />

                  <div className="flex items-center justify-between">
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="remember"
                          aria-describedby="remember"
                          type="checkbox"
                          className="w-4 h-4 border rounded "
                          required=""
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label
                          // for="remember"
                          className="bu-text-subtitle"
                        >
                          Remember me
                        </label>
                      </div>
                    </div>
                  </div>
                  {!loggingIn && (
                    <button
                      type="submit"
                      className="w-full font-medium rounded-lg text-sm px-5 py-2.5 text-center bu-button-primary bu-text-primary"
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
