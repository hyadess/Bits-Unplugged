import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { CircularProgress, Switch } from "@mui/material";
import { useSearchParams, createSearchParams } from "react-router-dom";
import Banner from "../../components/Banner";
import Layout1 from "../../components/Layouts/Layout1";
import { setLoading } from "../../App";
import AuthService from "../../services/authService";
import GlobalContext from "../../store/GlobalContext";
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
        className="border sm:text-sm rounded-lg  block w-full p-2.5  placeholder-gray-400 bu-input-primary"
        placeholder={props.placeholder}
        required={props.required}
        onChange={(e) => props.onChange(e.target.value)}
      />
    </div>
  );
};

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
    setLoading(false);
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
      const res = await AuthService.signup({
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
    <Layout1>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto gap-5 min-h-screen">
        <div
          onClick={() => {
            setLoading(true);
            navigate("/home");
          }}
          className="cursor-pointer"
        >
          <Banner width={200} height={50} />
        </div>

        <div className="w-full  rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bu-card-secondary">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
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
            <h1 className="text-xl font-bold leading-tight tracking-tight  md:text-2xl bu-text-primary">
              Sign up for an account
            </h1>
            <div className="space-y-4 md:space-y-6" action="#">
              <InputField
                label="Full Name"
                type="text"
                name="name"
                id="name"
                placeholder="Your name"
                required={true}
                onChange={setFullName}
                value={fullName}
              />
              <InputField
                label="Username"
                type="text"
                name="username"
                id="username"
                placeholder="Username"
                required={true}
                onChange={setUserName}
                value={userName}
              />

              {/* <div>
                  <label
                    for="date"
                    className="block mb-2 text-sm font-medium text-gray-900 text-white"
                  >
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    name="dateofbirth"
                    id="dateofbirth"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-pink-600 focus:border-pink-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                    placeholder="MM/DD/YYYY"
                    required={true}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                  />
                </div> */}
              {/* <div>
                  <label
                    for="institution"
                    className="block mb-2 text-sm font-medium text-gray-900 text-white"
                  >
                    Name of Institution
                  </label>
                  <input
                    type="text"
                    name="institution"
                    id="institution"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-pink-600 focus:border-pink-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Institution name"
                    required=""
                    onChange={(e) => setInstitution(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    for="profession"
                    className="block mb-2 text-sm font-medium text-gray-900 text-white"
                  >
                    Profession
                  </label>
                  <select
                    name="profession"
                    id="profession"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-pink-600 focus:border-pink-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                    required={true}
                    onChange={(e) => setProfession(e.target.value)}
                  >
                    <option value="">Select a Profession</option>
                    <option value="Student">Student</option>
                    <option value="Instructor">Instructor</option>
                    <option value="Developer">Developer</option>
                  </select>
                </div> */}
              <InputField
                label="Your email"
                type="text"
                name="email"
                id="email"
                placeholder="email"
                required={true}
                onChange={setEmail}
                value={email}
              />

              {/* <InputField
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  required={true}
                  onChange={setPassword}
                  value={password}
                  // onInput={validatePassword}
                /> */}

              <div>
                <label
                  // for="password"
                  className="block mb-2 text-sm font-medium bu-text-primary"
                >
                  Password
                </label>
                <div className="input-container">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="border sm:text-sm rounded-lg  block w-full p-2.5  placeholder-gray-400 bu-input-primary"
                    required={true}
                    onChange={(e) => setPassword(e.target.value)}
                    onInput={validatePassword}
                  />
                  <button
                    onClick={() => setShowPassword(!showPassword)}
                    className="block mb-2 text-sm font-medium  bu-text-primary"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
                {showValidationMessage && (
                  <span className="block mb-2 text-sm font-medium  text-red-500">
                    {validationMessage}
                  </span>
                )}
              </div>
              <div>
                <label
                  // for="confirmpassword"
                  className="block mb-2 text-sm font-medium bu-text-primary"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmpassword"
                  id="confirmpassword"
                  placeholder="••••••••"
                  className="border sm:text-sm rounded-lg  block w-full p-2.5  placeholder-gray-400 bu-input-primary"
                  required={true}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              {!signingUp && (
                <button
                  // type="submit"
                  className="w-full text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center bu-button-secondary"
                  onClick={handleSubmit}
                >
                  Sign up
                </button>
              )}

              <p className="text-sm font-light bu-text-subtitle">
                Already have an account?{" "}
                <a
                  onClick={handleLogin}
                  className="font-medium  hover:underline bu-text-title"
                >
                  Sign in
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout1>
  );
};

export default Signup;
