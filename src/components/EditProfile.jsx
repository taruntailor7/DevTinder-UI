/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants.js";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice.js";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLasame] = useState(user.lastName);
  const [age, setAge] = useState(user.age || "");
  const [gender, setGender] = useState(user.gender || "");
  const [about, setAbout] = useState(user.about || "");
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl || "");
  const [userMessage, setUserMessage] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setTimeout(() => {
      setUserMessage("");
      setError("");
    }, 3000); // 3000ms = 3 seconds

    return () => clearTimeout(timer); // Cleanup the timer on component unmount
  }, [userMessage, error]);

  const saveProfile = async () => {
    setError("");
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, age, gender, about, photoUrl },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
      setUserMessage(res?.data?.message);
    } catch (error) {
      setError(error?.response?.data || "Something went wrong!");
      console.log("Error while saving profile", error);
    }
  };

  return (
    <>
      {userMessage && (
        <div role="alert" className="alert alert-success">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{userMessage}</span>
        </div>
      )}
      <div className="flex justify-center my-10">
        <div className="flex justify-center mx-10">
          <div className="card bg-base-300 w-96 shadow-xl">
            <div className="card-body">
              <h2 className="card-title justify-center">Edit Profile</h2>
              <div>
                <label className="form-control w-full max-w-xs pb-4">
                  <div className="label">
                    <span className="label-text">Firstname</span>
                  </div>
                  <input
                    type="text"
                    value={firstName}
                    placeholder="Enter your firstname..."
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </label>
                <label className="form-control w-full max-w-xs pb-4">
                  <div className="label">
                    <span className="label-text">Lastname</span>
                  </div>
                  <input
                    type="text"
                    value={lastName}
                    placeholder="Enter your lastname..."
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setLasame(e.target.value)}
                  />
                </label>
                <label className="form-control w-full max-w-xs pb-4">
                  <div className="label">
                    <span className="label-text">Photo URL</span>
                  </div>
                  <input
                    type="text"
                    value={photoUrl}
                    placeholder="Enter your firstname..."
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setPhotoUrl(e.target.value)}
                  />
                </label>
                <label className="form-control w-full max-w-xs pb-4">
                  <div className="label">
                    <span className="label-text">Age</span>
                  </div>
                  <input
                    type="number"
                    value={age}
                    placeholder="Enter your firstname..."
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setAge(e.target.value)}
                  />
                </label>
                <label className="form-control w-full max-w-xs pb-4">
                  <div className="label">
                    <span className="label-text">Gender</span>
                  </div>
                  <input
                    type="text"
                    value={gender}
                    placeholder="Enter your firstname..."
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setGender(e.target.value)}
                  />
                </label>
                <label className="form-control w-full max-w-xs pb-4">
                  <div className="label">
                    <span className="label-text">About</span>
                  </div>
                  <input
                    type="text"
                    value={about}
                    placeholder="Enter your firstname..."
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setAbout(e.target.value)}
                  />
                </label>
              </div>
              <p className="text-green-600 text-center">{userMessage}</p>
              <p className="text-red-600 text-center">{error}</p>
              <div className="card-actions justify-center">
                <button className="btn btn-primary" onClick={saveProfile}>
                  Save Profile
                </button>
              </div>
            </div>
          </div>
        </div>
        <UserCard
          user={{ firstName, lastName, age, gender, about, photoUrl }}
        />
      </div>
    </>
  );
};

export default EditProfile;
