import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSearchParams, createSearchParams } from "react-router-dom";
import Banner from "../../components/Banner";
import Layout1 from "../../components/Layouts/Layout1";
import { PasswordField } from "../../components/InputFields";
import { setLoading } from "../../App";
import AuthService from "../../services/authService";
import GlobalContext from "../../store/GlobalContext";
import { FormControl, InputLabel, OutlinedInput } from "@mui/material";
import EyeIcon from "../../components/Icons/EyeIcon";
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

const MuiTextField = (props) => {
  return (
    <div className="no-ring-input">
      <FormControl fullWidth variant="outlined" size="small">
        <InputLabel
          htmlFor="outlined-adornment"
          className="bu-text-primary"
          sx={{
            "&.Mui-focused": {
              color: "#000000 !important",
              fontWeight: "bold",
            },
          }}
        >
          {props.label}
        </InputLabel>
        <OutlinedInput
          required
          placeholder={props.placeholder}
          id="outlined-adornment"
          className="outlined-input bu-text-primary"
          type="text"
          value={props.value}
          onChange={props.onChange}
          label={props.label}
          size="small"
          fullWidth
          sx={{
            // color: "white",
            ".MuiOutlinedInput-notchedOutline": {
              borderColor: "#1c5b5f",
              borderRadius: ".4rem",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#1c5b5f",
              borderWidth: ".2rem",
              borderRadius: ".4rem",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#1c5b5f",
            },
            "&.Mui-focused": {
              color: "#000000 !important",
            },
          }}
        />
      </FormControl>
    </div>
  );
};

const MuiPasswordField = (props) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="no-ring-input">
      <FormControl fullWidth variant="outlined" size="small">
        <InputLabel
          htmlFor="outlined-adornment"
          className="bu-text-primary"
          sx={{
            "&.Mui-focused": {
              color: "#000000 !important",
              fontWeight: "bold",
            },
          }}
        >
          {props.label}
        </InputLabel>
        <OutlinedInput
          required
          placeholder={props.placeholder}
          id="outlined-adornment"
          className="outlined-input bu-text-primary"
          type={showPassword ? "text" : "password"}
          value={props.value}
          onChange={props.onChange}
          label={props.label}
          size="small"
          fullWidth
          sx={{
            // color: "white",
            ".MuiOutlinedInput-notchedOutline": {
              borderColor: "#1c5b5f",
              borderRadius: ".4rem",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#1c5b5f",
              borderWidth: ".2rem",
              borderRadius: ".4rem",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#1c5b5f",
            },
            "&.Mui-focused": {
              color: "#000000 !important",
            },
          }}
          endAdornment={
            <div className="bu-text-primary">
              <EyeIcon
                isVisible={props.value.length > 0}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
              />
            </div>
          }
        />
      </FormControl>
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
  const { setType } = useContext(GlobalContext);

  const handleSubmit = async () => {
    if (!loggingIn) {
      setLoading(true);
      const res = await AuthService.login({
        email: email,
        pass: password,
        type: 2,
      });
      if (res.success) {
        setLoggingIn(true);
        setType(2);
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
                navigate("/landing");
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
                  <MuiTextField
                    label="Username/Email Address"
                    placeholder="example@gmail.com"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                  />
                  <MuiPasswordField
                    label="Password"
                    placeholder="••••••••"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                  />
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
