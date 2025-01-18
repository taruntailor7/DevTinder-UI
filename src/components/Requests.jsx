import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect, useState } from "react";

const Requests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
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

  return (
    <div className="text-center my-10">
      <h1 className="text-bold text-2xl">Requests</h1>
      <div className="flex mt-10">
        {requests.length !== 0 ? (
          requests?.map((request) => {
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
                  <button className="btn btn-primary">Reject</button>
                  <button className="btn btn-accent">Accept</button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="flex justify-center mt-10">
            <h1 className="text-bold text-2xl">No Request Found!</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default Requests;
