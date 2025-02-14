import "./home.scss";

const HomePage = () => {
  return (
    <>
      <div className="navbar-container">
        <nav className="navbar bg-body-tertiary">
          <div className="container">
            <a className="navbar-brand" href="#">
              HOME
            </a>
            <div className="btn-group">
              <button type="button" className="btn btn-primary">
                Login
              </button>
              <button type="button" className="btn btn-success">
                Sign Up
              </button>
            </div>
          </div>
        </nav>
      </div>
      <div className="content-container">
        <div className="row">
          <div className="col-2">QC</div>
          <div className="col-8 content ">
            <div className="card" style={{ width: "18rem", height: "25rem" }}>
              <img src="..." className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">Price</h5>
                <p className="card-text">Title</p>
                <p className="">Author</p>
              </div>
              <div className="card-btn">
                <button type="button" className="btn btn-primary">
                  View
                </button>
                <button type="button" className="btn btn-success">
                  Buy
                </button>
              </div>
            </div>
          </div>
          <div className="col-2">QC</div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
