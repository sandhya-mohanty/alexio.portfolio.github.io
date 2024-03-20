import { useState, useEffect } from "react";
import SectionContainer from "./SectionContainer";

const Services = () => {
  const [experiences, setExperiences] = useState([]);
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://portfolio-backend-30mp.onrender.com/api/v1/get/user/65b3a22c01d900e96c4219ae"
        );
        const data = await response.json();
        if (data && data.user.timeline) {
          setExperiences(data.user.timeline);
        }
        if (data && data.user.skills) {
          setSkills(data.user.skills);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <SectionContainer
      name={"resume"}
      extraClass={"resume-section"}
      title={"My Resume"}
      subTitle={"History"}
      leftImage="static/img/title-2.jpg"
    >
      <div className="row">
        <div className="col-md-6">
          <div className="resume-row">
            <h2 className="theme-after dark-color">Experience</h2>
            <ul >
              {experiences.map((experience, index) => (
                <li key={index}>
                  <div className="r-name">
                    <i className="theme-bg ti-briefcase" />
                    <span className="dark-color">
                      {experience.company_name}
                    </span>
                    <br />
                    <span className="dark-color">{experience.jobTitle}</span>

                    <label>
                      {new Date(experience.startDate).toLocaleDateString()} -{" "}
                      {new Date(experience.endDate).toLocaleDateString()},
                      &nbsp;{experience.jobLocation}
                    </label>
                  </div>
                  <div className="r-info">
                    <p className="dark-color">{experience.summary}</p>
                    <ul>
                      {experience.bulletPoints.map((point, idx) => (
                        <p>--{point}</p>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>{" "}
        <div className="col-md-6">
          <div className="resume-row">
            <h2 className="theme-after dark-color">Education</h2>
            <ul>
              <li>
                <div className="r-name">
                  <i className="theme-bg fas fa-graduation-cap" />
                  <span className="dark-color">University</span>
                  <label>OCT 2015 - JUNE 2016</label>
                </div>
                <div className="r-info">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo
                  </p>
                </div>
              </li>
              <li>
                <div className="r-name">
                  <i className="theme-bg fas fa-graduation-cap" />
                  <span className="dark-color">Design and Art</span>
                  <label>OCT 2015 - JUNE 2016</label>
                </div>
                <div className="r-info">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>{" "}
        {/* col */}
      </div>{" "}
      {/* row */}
      <div className="skill-row m-30px-t sm-m-20px-t">
        <div className="sub-title m-30px-b">
          <h2 className="dark-color theme-after">My Skills</h2>
        </div>
        <div className="row">
          {skills.map((skill, index) => (
            <div className="col-md-6 p-30px-r sm-p-15px-r" key={index}>
              
              <div className="skills">
                <div className="progress-lt">
                  <h6 className="dark-color">{skill.name}</h6>
                  <span className="theme-bg">{skill.percentage}%</span>
                  <div className="progress">
                    <div
                      className="progress-bar"
                      style={{ width: `${skill.percentage}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionContainer>
  );
};

export default Services;
