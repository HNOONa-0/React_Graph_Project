import React from "react";
import "./NavBar3Styles.css";
// now has pre-defined height
// couldnt fix overflow behaviour
export const NavBar3 = () => {
  return (
    <div className="wrapper-nav-bar">
      <nav className="nav-bar">
        <div className="logo">
          {/* <h2>Graph</h2> */}
          <a href="http://localhost:3000/">Graph</a>
        </div>
        <ul className="nav-links">
          <li>
            <a href="http://localhost:3000/Guide">Guide</a>
          </li>
          <li>
            <a href="#">About</a>
          </li>
          <li>
            <a href="#">Github</a>
          </li>
        </ul>
      </nav>
    </div>
  );
};
