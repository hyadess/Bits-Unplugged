import {
  useSearchParams,
  createSearchParams,
  useNavigate,
} from "react-router-dom";
import { authApi } from "../../api";
import { useState, useEffect } from "react";
import { showToast } from "../../App";
const EmailVerification = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [type, setType] = useState(searchParams.get("type"));
  const [token, setToken] = useState(searchParams.get("token"));
  const navigate = useNavigate();

  const verify = async () => {
    if (type != undefined && token != undefined) {
      const result = await authApi.verifyEmail({ type: type, token: token });
      console.log(result.success);
      if (result.success) {
        showToast("Email verified successfully", "success");
        navigate("/login?type=" + type == 0 ? "solver" : "setter");
      }
    }
  };
  useEffect(() => {
    verify();
  }, [searchParams]);
  return <div>Email Verification</div>;
};
export default EmailVerification;
