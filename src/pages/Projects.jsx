import React from "react";
import projects from "../details/projects";
const Projects = () => {
  return (
    <>
      <p>Applied</p>
      <div className="project-container">
        {projects.map((project, index) => (
          <div className="project-card" key={index}>
            <div className="project-title">
              {project.name}
              <a href={project.git} target="_blank" rel="noopener noreferrer">
                <i className="bx bxl-github"></i>
              </a>
            </div>
            <div className="project-content">
              <p>{project.about}</p>
              <div className="techstack">{project.tech}</div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Projects;
