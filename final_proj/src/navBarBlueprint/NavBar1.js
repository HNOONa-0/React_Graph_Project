import './NavBar1Styles.css'
// problems
// 1-text wont fill height fully
// 2-we need logo to also be a link
// 3-we if we like to have fixed height for flexbar nav
// 4-we need better overflow handling
export const NavBar1 = ()=>{
    return (
        <nav className="nav-bar">
            <div className="logo">
                <h2>Graph</h2>
            </div>
            <ul className="nav-links">
                <li><a href="#">Guide</a></li>
                <li><a href="#">About</a></li>
                <li><a href="#">Github</a></li>
            </ul>
        </nav>
    )
}
