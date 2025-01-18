/* eslint-disable react/prop-types */
const UserCard = ({ user }) => {
  console.log("user", user);
  const {firstName, lastName, about, photoUrl, age, gender} = user;
  return (
    <div className="card bg-base-300 w-96 shadow-xl">
      <figure>
        <img src={photoUrl} alt="Photo" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        {age && gender && <p>{age + ", " + gender}a</p>}
        <p>{about}</p>
        <div className="card-actions justify-center my-4 ">
            <button className="btn btn-primary">Ignore</button>
          <button className="btn btn-secondary">Interested</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
