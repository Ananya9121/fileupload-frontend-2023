import React, { useState } from "react";
import signupStyle from "./Signup.module.css";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useSnackbar } from "notistack";
import { config } from "../../../../App";
import Header from "../../../Shared/Header";

function Signup() {
  const { enqueueSnackbar } = useSnackbar();

  const navigate = useNavigate();

  const [userDetails, setuserDetails] = useState({
    username: "",
    email: "",
    password: "",
  });

  const register = async (userDetails) => {
    if (!validation(userDetails)) return;

    try {
      let url = `${config.endpoint}/auth/signup`;
      const res=await axios.post(url, {
        username: userDetails.username,
        email: userDetails.email,
        password: userDetails.password,
      });
      console.log('res: ', res);

      setuserDetails({
        username: "",
        email: "",
        password: "",
      });

      enqueueSnackbar("Registered Successfully", { variant: "success" });

      navigate("/user/login");
    } catch (e) {
      if (e.response && e.response.status === 409) {
        enqueueSnackbar(e.response.data.message, e.response.data.reason, {
          variant: "error",
        });
      } 
      else if (e.response && e.response.status === 400) {
        enqueueSnackbar(e.response.data.message, e.response.data.reason, {
          variant: "warning",
        })}
        else {
        enqueueSnackbar("Failed to create new user", { variant: "error" });
      }
    }
  };

  const handleChange = (e) => {
    let [key, value] = [e.target.name, e.target.value];
    setuserDetails({ ...userDetails, [key]: value });
  };

  const validation = (data) => {
    if (userDetails.username.length === 0) {
      enqueueSnackbar("Username is a required field", { variant: "warning" });
      return false;
    }

    if (userDetails.username.length < 6) {
      enqueueSnackbar("Username must be at least 6 characters", {
        variant: "warning",
      });
      return false;
    }
    if (userDetails.email.length===0) {
      console.log("line 70")
      enqueueSnackbar("Email is a required field", { variant: "warning" });
      return false;
    }

    if (!userDetails.email.includes('@')) {
      enqueueSnackbar("Invalid email", { variant: "warning" });
      return false;
    }

    if (userDetails.password.length === 0) {
      enqueueSnackbar("Password is a required field", { variant: "warning" });
      return false;
    }

    if (userDetails.password.length < 6) {
      enqueueSnackbar("Password must be at least 6 characters", {
        variant: "warning",
      });
      return false;
    }
    
    return true;
  };

  return (
    <>
      <div className='d-flex justify-content-between align-items-center'>
    <Header />
    <Link className="link" to="/user/login"> <button
    className="btn btn-outline-secondary text-white"
    type="button"
        >
            Login
        </button></Link>
   
       </div>
      <div className={signupStyle.main}>
        <p className={signupStyle.fontstyle}>Signup!</p>
        <br />

        <div>
          <form>
            <div className="row mb-3">
              <div className={signupStyle.labelwidth}>
                <label
                  htmlFor="colFormLabel"
                  className="col-sm-2 col-form-label"
                >
                  Username
                </label>
              </div>
              <div className="col-sm-8">
                <input
                  className="form-control"
                  id="colFormLabel"
                  placeholder="Enter the username"
                  onChange={(e) => handleChange(e)}
                  value={userDetails.username}
                  type="text"
                  name="username"
                ></input>
              </div>
            </div>
            <div className="row mb-3">
              <div className={signupStyle.labelwidth}>
                <label
                  htmlFor="colFormLabeloption1"
                  className="col-sm-2 col-form-label"
                >
                  Email
                </label>
              </div>
              <div className="col-sm-8">
                <input
                  className="form-control"
                  id="colFormLabeloption1"
                  placeholder="Enter the email"
                  type="email"
                  onChange={(e) => handleChange(e)}
                  value={userDetails.email}
                  name="email"
                ></input>
              </div>
            </div>
            <div className="row mb-3">
              <div className={signupStyle.labelwidth}>
                <label
                  htmlFor="colFormLabeloption2"
                  className="col-sm-2 col-form-label"
                >
                  password
                </label>
              </div>
              <div className="col-sm-8">
                <input
                  className="form-control"
                  id="colFormLabeloption2"
                  placeholder="Enter the Password"
                  type="text"
                  onChange={(e) => handleChange(e)}
                  value={userDetails.password}
                  name="password"
                ></input>
              </div>
            </div>

            <br />
            <div className={signupStyle.centrealign}>
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={async (e) => {
                  await register(userDetails);
                }}
              >
                Signup
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Signup;
