import {
    useSearchParams,
    createSearchParams,
    useNavigate,
  } from "react-router-dom";

import { contestApi } from "../../../api";
  import { useState, useEffect } from "react";
  import { showToast } from "../../../App";
  const AcceptRequest = () => {
    console.log("hellooooo");
    const [searchParams, setSearchParams] = useSearchParams();
    const [token, setToken] = useState(searchParams.get("token"));
    const navigate = useNavigate();
  
    const verify = async () => {
      if ( token != undefined) {
        const result = await contestApi.acceptInvitation(token);
        console.log(result.success);
        if (result.success) {
          showToast("Invitation Accepted", "success");
          navigate("/setter/contests");
        }
      }
    };
    useEffect(() => {
      verify();
    }, [searchParams]);
    return <div>Email Verification</div>;
  };
  export default AcceptRequest;
  