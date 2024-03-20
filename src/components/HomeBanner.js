import { useContext, useState, useEffect } from "react";
import { AlexioContext } from "../Context";
import TypingAnimation from "./TypingAnimation";

const HomeBanner = () => {
  const { nav, changeNav } = useContext(AlexioContext);
  const [socialHandles, setSocialHandles] = useState([]);

  useEffect(() => {
    fetch(
      "https://portfolio-backend-30mp.onrender.com/api/v1/get/user/65b3a22c01d900e96c4219ae"
    )
      .then((response) => response.json())
      .then((data) => {
        setSocialHandles(data.user.social_handles);
      })
      .catch((error) => {
        console.error("Error fetching social handles:", error);
      });
  }, []);

  const activePageClass = () => ("home" === nav ? "" : "page--inactive");

  return (
    <div
      className={`page home-banner white-bg ${activePageClass("home")}`}
      id={"home"}
      onClick={() => changeNav("home", false)}
    >
      <div className="container-fluid p-0">
        <div className="row no-gutters full-screen">
          <div className="col-lg-3 col-xl-4 blue-bg">
            <div className="d-flex align-items-end home-user-avtar v-center-box">
              <img src="static/img/user.png" alt="User avatar" />
            </div>
          </div>
          <div className="col-lg-9 col-xl-8">
            <div className="page-scroll">
              <div className="page-content">
                <div className="v-center-box d-flex align-items-center">
                  <div className="home-text">
                    <h6 className="dark-color theme-after">Hello, There</h6>
                    <h1 className="dark-color blue-after">I'm Alexis Larten</h1>
                    <p>
                      WEB <TypingAnimation />
                    </p>
                    <div className="btn-bar">
                      <a href="#" className="btn btn-theme">
                        Download CV
                      </a>
                    </div>
                  </div>
                  <ul className="social-icons">
                    {socialHandles &&
                      socialHandles.map((handle) => (
                        <li key={handle._id}>
                          <a
                            className={handle.platform.toLowerCase()}
                            href={handle.url}
                          >
                            <img src={handle.image.url} alt={handle.platform} />
                          </a>
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeBanner;
