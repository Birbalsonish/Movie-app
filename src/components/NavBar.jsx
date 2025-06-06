import { Link } from "react-router-dom";
import "../css/NavBar.css";

function NavBar() {
    return <nav className="navbar">
        <div className="nav-brand">
            <Link to="/">Movie App</Link>
            </div>
            <div className="nav-links">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/favorite" className="navlink">Favorite</Link>
        </div>
    </nav>
}
export default NavBar;