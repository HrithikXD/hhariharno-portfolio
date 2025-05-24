import React from "react";
import techs from "../details/techStack";

const Tech = () => {
  return (
    <>
        <p>Possess</p>
      <div className="tech-container">
        {techs.map((tech, index) => (
          <div className="tech-card" key={index}>
            <div className="tech-title">
              {tech.tech}
              <a href={tech.link} target="_blank" rel="noopener noreferrer">
                <i className={tech.icon}></i>
              </a>
            </div>
            <div className="tech-content">
              <p>{tech.about}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Tech;
