import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";

const Signup = () => {
  const [firstname, setFirstame] = useState("");
  const [lastname, setLastName] = useState("");
  const [emailId, setEmailid] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      const user = await axios.post(
        BASE_URL + "/auth/signup",
        {
          firstName: firstname,
          lastName: firstname,
          email: emailId,
          password: password,
        },
        { withCredentials: true }
      ); // we have to pass withCredentials because in backend credentials is true then itwill set the cookies in frontend browser.
      console.log('user', user.data.data);
      dispatch(addUser(user.data.data));
      return navigate("/profile");
    } catch (error) {
      setError(error?.response?.data || "Something went wrong!");
      console.log("Error while signing up: ", error);
    }
  };

  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-300 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center">Signup</h2>
          <div>
            <label className="form-control w-full max-w-xs pb-4">
              <div className="label">
                <span className="label-text">Firstname</span>
              </div>
              <input
                type="text"
                value={firstname}
                placeholder="Enter firstname..."
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setFirstame(e.target.value)}
              />
            </label>
            <label className="form-control w-full max-w-xs pb-4">
              <div className="label">
                <span className="label-text">Lastname</span>
              </div>
              <input
                type="text"
                value={lastname}
                placeholder="Enter your lastname..."
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setLastName(e.target.value)}
              />
            </label>
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
                type="text"
                value={password}
                placeholder="Enter your password..."
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
          </div>
          <p className="text-red-600 text-center">{error}</p>
          <div className="card-actions justify-center">
            <button className="btn btn-primary" onClick={handleSignup}>
              Signup
            </button>
          </div>
          <p className="text-center">
            Existing User ? Login in here <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
