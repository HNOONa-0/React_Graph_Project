import React from "react";
import "./NavbarStyles.css";
// changes
// name change to Navbar from NavBar
const url = "https://hnoona-0.github.io/React_Graph_Project/";
const Navbar = () => {
  return (
    <div className="wrapper-nav-bar">
      <nav className="nav-bar">
        <div className="logo">
          {/* <h2>Graph</h2> */}
          <a href={url}>Graph</a>
        </div>
        <ul className="nav-links">
          <li>
            <a href={url + "Guide"}>Guide</a>
          </li>
          {/* <li>
            <a href="http://localhost:3000/About">About</a>
          </li> */}
          <li>
            <a
              href="https://github.com/HNOONa-0/React_Graph_Project"
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
export default Navbar;
