import React from "react";

const Contact = () => {
  return (
    <>
      <section className="contact">
        <div className="head">
          <h3>connect</h3>
        </div>
        <div className="social">
          <a
            className="item"
            href="https://www.linkedin.com/in/hrithik-hariharno-20228b1a2/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="bx bxl-linkedin-square"></i>
            <p>Linkdin</p>
          </a>
          <a
            className="item"
            href="https://github.com/HrithikXD"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="bx bxl-github"></i>
            <p>Github</p>
          </a>
        </div>
      </section>
    </>
  );
};

export default Contact;
