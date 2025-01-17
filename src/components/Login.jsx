import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmailid] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const loggedInUser = await axios.post(BASE_URL + "/auth/login", {
        "email": emailId,
        "password": password,
      }, { withCredentials: true }); // we have to pass withCredentials because in backend credentials is true then itwill set the cookies in frontend browser.
      dispatch(addUser(loggedInUser.data.data));
      return navigate("/");
    } catch (error) {
      setError(error?.response?.data || "Something went wrong!")
      console.log('Error while loging in: ', error);
    }
  }

  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-300 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center">Login</h2>
          <div>
            <label className="form-control w-full max-w-xs pb-4">
              <div className="label">
                <span className="label-text">Email</span>
              </div>
              <input
                type="text"
                value={emailId}
                placeholder="Enter your email..."
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setEmailid(e.target.value)}
              />
            </label> 
            <label className="form-control w-full max-w-xs pb-4">
              <div className="label">
                <span className="label-text">Password</span>
              </div>
              <input
                type="password"
                value={password}
                placeholder="Enter your password..."
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setPassword(e.target.value)}
              />
            </label> 
          </div>
          <p className="text-red-600 text-center">{error}</p>
          <div className="card-actions justify-center">
            <button className="btn btn-primary" onClick={handleLogin}>Login</button>
          </div>
          <p className="text-center">New User ? Sign up here <Link to='/signup'>Signup</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
