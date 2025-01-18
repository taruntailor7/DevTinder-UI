import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addFeed } from "../utils/feedSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import UserCard from "./UserCard";

const Feed = () => {
  const dispatch = useDispatch();
  const feedData = useSelector((store) => store.feed);

  const getFeed = async () => {
    if (feedData) return;
    try {
      const res = await axios.get(BASE_URL + "/user/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res.data.data));
    } catch (error) {
      console.log("Error while getting feed", error);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  console.log("feedData", feedData);

  return (
    feedData && (
      <div className="flex justify-center my-10">
        <UserCard user={feedData[0]}/>
      </div>
    )
  );
};

export default Feed;
