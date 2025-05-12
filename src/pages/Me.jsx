import React, { useEffect, useRef, useState } from "react";
import about from "../details/Aboutme";

const Me = () => {
  const [counter, setCounter] = useState(0);
  const conversationRef = useRef(null);

  useEffect(() => {
    if (conversationRef.current) {
      conversationRef.current.scrollTop = conversationRef.current.scrollHeight;
    }
  }, [counter]);

  useEffect(() => {
    if (counter < about["Conversation"].length - 1) {
      const timer = setTimeout(() => {
        setCounter((prev) => prev + 1);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [counter]);

  const rain = () =>{
    let cloud = document.querySelector('.cloud')
    let e = document.createElement('div')
    let left = Math.floor(Math.random()*400)
    e.classList.add('drop')
    cloud.appendChild(e)
    e.style.left = left + 'px';
    setTimeout(()=>{
      cloud.removeChild(e)
    },2000)
  }

  // setInterval(()=>{
  //   rain()
  // },50)

  return (
    <>
      <section className="me">
        <div className="me-left" >
          <div className="conversation" ref={conversationRef}>
            {about["Conversation"].slice(0, counter + 1).map((msg, index) => (
              <div
                key={index}
                className={msg.side === "left" ? "co-left" : "co-right"}
              >
                <p>{msg.text}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="me-right">
          <div className="sky">
            
            {/* <div className="cloud"></div> */}
          </div>
          <div className="water"></div>
          <div className="land"></div>
        </div>
      </section>
      {/* <div style={{height:'100vh'}}>
        love
      </div> */}
    </>
  );
};

export default Me;
