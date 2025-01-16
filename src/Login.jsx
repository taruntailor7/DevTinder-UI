const Login = () => {
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
                placeholder="Enter your email..."
                className="input input-bordered w-full max-w-xs"
              />
            </label> 
            <label className="form-control w-full max-w-xs pb-4">
              <div className="label">
                <span className="label-text">Password</span>
              </div>
              <input
                type="text"
                placeholder="Enter your password..."
                className="input input-bordered w-full max-w-xs"
              />
            </label> 
          </div>
          <div className="card-actions justify-center">
            <button className="btn btn-primary">Login</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
