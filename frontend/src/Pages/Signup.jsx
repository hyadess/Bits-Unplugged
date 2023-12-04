import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthController from "../controller/authController";
import { toast } from "react-toastify";
import "./Login.scss";
import { CircularProgress, Switch } from "@mui/material";
import { useSearchParams, createSearchParams } from "react-router-dom";
import Banner from "../Components/Banner";
const authController = new AuthController();

const Signup = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [type, setType] = useState(searchParams.get("type"));
  const [checked, setChecked] = useState(type === "setter" ? true : false);
  const [fullName, setFullName] = useState("");
  const [userName, setUserName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [institution, setInstitution] = useState("");
  const [profession, setProfession] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showValidationMessage, setShowValidationMessage] = useState(false);
  const [validationMessage, setValidationMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [signingUp, setSigningUp] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate({
      pathname: "/login",
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

  const validatePassword = () => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!password) {
      setShowValidationMessage(false);
      return false;
    }
    if (passwordRegex.test(password)) {
      setShowValidationMessage(false);
      return true;
    } else {
      setShowValidationMessage(true);
      setValidationMessage(
        "Password must contain at least one lowercase letter, one uppercase letter, one digit, one special character, and be at least 8 characters long."
      );
      return false;
    }
  };

  const handleSubmit = async () => {
    if (!validatePassword()) {
      toast.error("Too weak password", {});
      return;
    } else if (!matchPassword()) {
      toast.error("Passwords don't match", {});
      return;
    } else {
      console.log(
        fullName,
        userName,
        dateOfBirth,
        institution,
        profession,
        email,
        password,
        confirmPassword
      );
      const res = await authController.signup({
        fullname: fullName,
        username: userName,
        dob: dateOfBirth,
        institution: institution,
        profession: profession,
        email: email,
        pass: password,
        confirm: confirmPassword,
        type: type == "solver" ? 0 : 1,
      });
      if (res.success) {
        setSigningUp(true);
        handleLogin();
      }
    }
  };

  const matchPassword = async () => {
    let isValid = true;
    if (password != confirmPassword) {
      isValid = false;
    }
    return isValid;
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <section class="bg-gray-900">
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto gap-5 min-h-screen">
          {/* <a
            href="#"
            class="flex items-center mb-6 text-2xl font-semibold text-gray-900 text-white"
          >
            Bits Unplugged
          </a> */}

          <Banner width={200} height={50} />

          <div class="w-full  rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700">
            <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <div className="hbox flex-center">
                <h6
                  className={
                    checked
                      ? "unchecked-role"
                      : "flex items-center text-xl font-semibold text-gray-900 text-white"
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
                      ? "flex items-center text-xl font-semibold text-gray-900 text-white"
                      : "unchecked-role"
                  }
                  style={{ width: "2vw", fontWeight: "" }}
                >
                  Setter
                </h6>
              </div>
              <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl text-white">
                Sign up for an account
              </h1>
              <div class="space-y-4 md:space-y-6" action="#">
                <div>
                  <label
                    for="name"
                    class="block mb-2 text-sm font-medium text-gray-900 text-white"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-pink-600 focus:border-pink-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Your name"
                    required="true"
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    for="username"
                    class="block mb-2 text-sm font-medium text-gray-900 text-white"
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-pink-600 focus:border-pink-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Username"
                    required="true"
                    onChange={(e) => setUserName(e.target.value)}
                  />
                </div>
                {/* <div>
                  <label
                    for="date"
                    class="block mb-2 text-sm font-medium text-gray-900 text-white"
                  >
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    name="dateofbirth"
                    id="dateofbirth"
                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-pink-600 focus:border-pink-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                    placeholder="MM/DD/YYYY"
                    required="true"
                    onChange={(e) => setDateOfBirth(e.target.value)}
                  />
                </div> */}
                {/* <div>
                  <label
                    for="institution"
                    class="block mb-2 text-sm font-medium text-gray-900 text-white"
                  >
                    Name of Institution
                  </label>
                  <input
                    type="text"
                    name="institution"
                    id="institution"
                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-pink-600 focus:border-pink-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Institution name"
                    required=""
                    onChange={(e) => setInstitution(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    for="profession"
                    class="block mb-2 text-sm font-medium text-gray-900 text-white"
                  >
                    Profession
                  </label>
                  <select
                    name="profession"
                    id="profession"
                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-pink-600 focus:border-pink-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                    required="true"
                    onChange={(e) => setProfession(e.target.value)}
                  >
                    <option value="">Select a Profession</option>
                    <option value="Student">Student</option>
                    <option value="Instructor">Instructor</option>
                    <option value="Developer">Developer</option>
                  </select>
                </div> */}
                <div>
                  <label
                    for="email"
                    class="block mb-2 text-sm font-medium text-gray-900 text-white"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-pink-600 focus:border-pink-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                    placeholder="name@company.com"
                    required="true"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    for="password"
                    class="block mb-2 text-sm font-medium text-gray-900 text-white"
                  >
                    Password
                  </label>
                  <div className="input-container">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      id="password"
                      placeholder="••••••••"
                      class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-pink-600 focus:border-pink-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                      required="true"
                      onChange={(e) => setPassword(e.target.value)}
                      onInput={validatePassword}
                    />
                    <button
                      onClick={() => setShowPassword(!showPassword)}
                      class="block mb-2 text-sm font-medium text-gray-900 text-white"
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                  {showValidationMessage && (
                    <span class="block mb-2 text-sm font-medium text-gray-900 text-white">
                      {validationMessage}
                    </span>
                  )}
                </div>
                <div>
                  <label
                    for="confirmpassword"
                    class="block mb-2 text-sm font-medium text-gray-900 text-white"
                  >
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="confirmpassword"
                    id="confirmpassword"
                    placeholder="••••••••"
                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-pink-600 focus:border-pink-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                    required="true"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                {!signingUp && (
                  <button
                    // type="submit"
                    class="w-full text-white bg-pink-600 hover:bg-pink-700 focus:ring-4 focus:outline-none focus:ring-pink-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-pink-600 hover:bg-pink-700 focus:ring-pink-800"
                    onClick={handleSubmit}
                  >
                    Sign up
                  </button>
                )}

                <p class="text-sm font-light text-gray-500 text-gray-400">
                  Already have an account?{" "}
                  <a
                    onClick={handleLogin}
                    className="font-medium  hover:underline text-pink-500"
                  >
                    Sign in
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Signup;
