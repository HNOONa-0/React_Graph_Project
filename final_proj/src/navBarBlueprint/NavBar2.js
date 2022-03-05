import './NavBar2Styles.css'
// now has pre-defined height
// couldnt fix overflow behaviour
export const NavBar2 = ()=>{
    return (
        <div className="wrapper-nav-bar">
            <nav className="nav-bar">
                <div className="logo">
                    {/* <h2>Graph</h2> */}
                    <a href="#">Graph</a>
                </div>
                <ul className="nav-links">
                    <li><a href="#">Guide</a></li>
                    <li><a href="#">About</a></li>
                    <li><a href="#">Github</a></li>
                </ul>
            </nav>
        </div>
    )
}
