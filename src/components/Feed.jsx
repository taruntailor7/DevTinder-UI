import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addFeed, removeUserFromFeed } from "../utils/feedSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import UserCard from "./UserCard";

const Feed = () => {
  const dispatch = useDispatch();
  const feedData = useSelector((store) => store.feed);

  const sendRequest = async (status, userId) => {
    try {
      const res = await axios.post(
        BASE_URL + `/request/send/${status}/${userId}`,
        {},
        { withCredentials: true }
      );
      console.log("Status of request", res.data.data);
      dispatch(removeUserFromFeed(userId));
    } catch (error) {
      console.log("Error while sending request", error);
    }
  };

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

  if (feedData && feedData.length === 0) {
    return <h1 className="flex justify-center my-10">No Feed Available!</h1>;
  }

  return (
    feedData && (
      <div className="flex justify-center my-10">
        <UserCard user={feedData[0]} sendRequest={sendRequest}/>
      </div>
    )
  );
};

export default Feed;
