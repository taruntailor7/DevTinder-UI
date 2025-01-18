import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect, useState } from "react";

const Requests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const reviewRequest = async (status, userId) => {
    try {
      const res = await axios.post(
        BASE_URL + `/request/review/${status}/${userId}`,
        {},
        { withCredentials: true }
      );
      console.log("Status of request", res.data.data);
      fetchRequests();
    } catch (error) {
      console.log("Error while reviwing request", error);
    }
  };

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      setRequests(res?.data?.data);
    } catch (error) {
      console.log("Error while fetching requests", error);
    } finally {
      setLoading(false); // Ensure loading is set to false after data is fetched
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center mt-10">
        <h1 className="text-bold text-2xl">Loading Requests...</h1>
      </div>
    );
  }

  if (requests.length === 0) {
    return <h1 className="flex justify-center my-10">No Request Found!</h1>;
  }

  return (
    <div className="text-center my-10">
      <h1 className="text-bold text-2xl">Requests</h1>
      <div className="flex mt-10">
        {requests?.map((request) => {
          const { firstName, lastName, age, gender, photoUrl, about } =
            request.fromUserId;

          return (
            <div
              key={request._id}
              className="card bg-base-300 w-96 shadow-xl ml-10"
            >
              <figure>
                <img src={photoUrl} alt="Photo" />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{firstName + " " + lastName}</h2>
                {age && gender && <p>{age + ", " + gender}</p>}
                <p>{about}</p>
              </div>
              <div className="flex justify-evenly mb-5">
                <button
                  className="btn btn-primary"
                  onClick={() => reviewRequest("rejected", request._id)}
                >
                  Reject
                </button>
                <button
                  className="btn btn-accent"
                  onClick={() => reviewRequest("accepted", request._id)}
                >
                  Accept
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Requests;
