import Isotope from "isotope-layout";
import { useCallback, useEffect, useRef, useState } from "react";
import SectionContainer from "./SectionContainer";
import Testimonials from "./Testimonials";

const Portfolio = () => {
  const [projects, setProjects] = useState([]);
  const isotope = useRef();
  const [filterKey, setFilterKey] = useState("*");

  useEffect(() => {
    fetch(
      "https://portfolio-backend-30mp.onrender.com/api/v1/get/user/65b3a22c01d900e96c4219ae"
    )
      .then((response) => response.json())
      .then((data) => {
        setProjects(data.user.projects );
      })
      .catch((error) => {
        console.error("Error fetching projects:", error);
      });
  }, []);

  useEffect(() => {
    const imagesLoaded = require("imagesloaded");
    imagesLoaded(
      document.querySelector(".portfolio-cols"),
      function (instance) {
        isotope.current = new Isotope(".portfolio-cols", {
          itemSelector: ".portfolio-item",
          percentPosition: true,
          masonry: {
            columnWidth: ".portfolio-item",
          },
          animationOptions: {
            duration: 750,
            easing: "linear",
            queue: false,
          },
        });
      }
    );
  }, []);

  useEffect(() => {
    if (isotope.current) {
      filterKey === "*"
        ? isotope.current.arrange({ filter: `*` })
        : isotope.current.arrange({ filter: `.${filterKey}` });
    }
  }, [filterKey]);

  const handleFilterKeyChange = useCallback(
    (key) => () => {
      setFilterKey(key);
    },
    []
  );

  const activeBtn = (value) => (value === filterKey ? "active" : "");

  return (
    <>
      <SectionContainer
        name={"portfolio"}
        title={"My Projects"}
        subTitle={"Latest Work"}
        leftImage="static/img/title-3.jpg"
      >
        <div className="portfolio-section">
          <div className="portfolio-filter m-10px-b">
            <ul className="filter text-left text-md-center">
              <li
                className={`${activeBtn("*")} theme-after`}
                onClick={handleFilterKeyChange("*")}
              >
                All
              </li>
              {projects &&
                projects.map((project, index) => (
                  <li
                    key={index}
                    className={`${activeBtn(project.title)} theme-after`}
                    onClick={handleFilterKeyChange(project.title)}
                  >
                    {project.title}
                  </li>
                ))}
            </ul>
          </div>
          <div className="portfolio-content">
            <ul className="portfolio-cols portfolio-cols-3">
              {projects &&
                projects.reverse().map((project, index) => (
                  <li key={index} className={`portfolio-item ${project.title}`}>
                    <div className="portfolio-col portfolio-hover-01">
                      <div className="portfolio-img">
                        <a href="#">
                          <img src={project.image.url} alt={project.title} />
                        </a>
                        <div className="hover">
                          <div className="action-btn">
                            <a
                              href={project.liveurl}
                              className="popup-video theme-color"
                            >
                              <i className="fa fa-play" />
                            </a>
                            <a
                              className="lightbox-gallery theme-color"
                              href={project.image.url}
                              title={project.title}
                            >
                              <i className="fas fa-expand" />
                            </a>
                            <a href={project.githuburl} className="theme-color">
                              <i className="fa fa-link" />
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className="portfolio-info">
                        <h5>{project.title}</h5>
                        <span>{project.description}</span>
                      </div>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        </div>

        <Testimonials />
      </SectionContainer>
    </>
  );
};

export default Portfolio;
