import React from "react";
import beTechs from "../details/beTeckStack";
import feTechs from "../details/feTeckStack";
function Skills() {
  return (
    <>
      <div className="skills-set">
        <div className="circle be">
          <div className="fe-be-in be-in">
            Back-End
            <div>
              {beTechs.map((tech, index) => (
                <div className="skill-tech tech-title" key={index}>
                  {tech.tech}
                  <a href={tech.link} target="_blank" rel="noopener noreferrer">
                    <i className={tech.icon}></i>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="tools">Tools</div>
        <div className="circle fe">
          <div className="fe-be-in fe-in">
            Front-End
            <div>
              {feTechs.map((tech, index) => (
                <div className="skill-tech tech-title" key={index}>
                  {tech.tech}
                  <a href={tech.link} target="_blank" rel="noopener noreferrer">
                    <i className={tech.icon}></i>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Skills;
