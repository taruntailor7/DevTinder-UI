import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect, useState } from "react";

const Connections = () => {
  const [connections, setConnections] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      setConnections(res?.data?.data);
    } catch (error) {
      console.log("Error while fetching connections", error);
    } finally {
      setLoading(false); // Ensure loading is set to false after data is fetched
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center mt-10">
        <h1 className="text-bold text-2xl">Loading Connections...</h1>
      </div>
    );
  }

  if (connections.length === 0) {
    return <h1 className="flex justify-center my-10">No Connection Found!</h1>;
  }

  return (
    <div className="text-center my-10">
      <h1 className="text-bold text-2xl">Connections</h1>
      <div className="flex mt-10">
        {connections?.map((connection) => {
          const { firstName, lastName, age, gender, photoUrl, about } =
            connection;

          return (
            <div
              key={connection._id}
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
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Connections;
