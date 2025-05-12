import { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Index from "./pages/Index";
import Me from "./pages/Me";
import Tech from "./pages/Tech";
import Projects from "./pages/Projects";
import Other from "./pages/Other";
import Contact from "./pages/Contact";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="main">
      <Index />
      <div className="container">
        <Routes>
          <Route path="/" element={<Me />} />
          <Route path="/tech" element={<Tech />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/other" element={<Other />} />
          <Route path="/connect" element={<Contact />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
