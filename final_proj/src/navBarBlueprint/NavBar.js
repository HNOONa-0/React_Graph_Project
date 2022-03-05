import React from "react";
import "./NavBarStyles.css";
// now has pre-defined height
// couldnt fix overflow behaviour
export const NavBar = () => {
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
          {/* <li>
            <a href="http://localhost:3000/About">About</a>
          </li> */}
          <li>
            <a
              href="https://www.google.com/search?q=googl&oq=googl&aqs=chrome..69i57j35i39l2j69i60l3j69i65j69i60.6083j0j7&sourceid=chrome&ie=UTF-8"
              target="_blank"
            >
              Github
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};
