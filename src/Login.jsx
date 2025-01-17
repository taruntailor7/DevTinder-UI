import axios from "axios";
import { useState } from "react";

const Login = () => {
  const [emailId, setEmailid] = useState("akshay@gmail.com");
  const [password, setPassword] = useState("Akshay@1234");

  const handleLogin = async () => {
    try {
      const loggedInUser = await axios.post("http://localhost:5000/auth/login", {
        "email": emailId,
        "password": password,
      }, { withCredentials: true }); // we have to pass withCredentials because in backend credentials is true then itwill set the cookies in frontend browser.
      console.log('loggedInUser', loggedInUser);
    } catch (error) {
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
                type="text"
                value={password}
                placeholder="Enter your password..."
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setPassword(e.target.value)}
              />
            </label> 
          </div>
          <div className="card-actions justify-center">
            <button className="btn btn-primary" onClick={handleLogin}>Login</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
