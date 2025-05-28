import { useEffect, useState } from "react";

const Themes = () => {
  const theme = {
    1: "",
    2: "bl-wh",
    3: "dark",
    4: "ocean-d",
    5: "purple-l",
    6: "ocean-l",
  };

  const [curT, setCurT] = useState(1);

  useEffect(() => {
    document.querySelector("body").setAttribute("data-theme", theme[curT]);
  }, [curT]);

  const changeTheme = () => {
    if (curT === Object.keys(theme).length) {
      setCurT(1);
    } else {
      setCurT((prev) => prev + 1);
    }
  };
  return (
    <button className="changeColor">
      <i className="th-i bx bx-palette" onClick={changeTheme}></i>
    </button>
  );
};

export default Themes;
