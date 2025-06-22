import { Link } from "react-router-dom";
import "../styles/Navbar.css"

export const Navbar = () => {

	return (
		<nav className="navbar navbar-light">
			<div className="container">
				<Link to="/" id="home-link">
					<img src="https://pngimg.com/d/star_wars_logo_PNG34.png" alt=""className="navbar-brand mb-0 h1" id="navbar-image"/> Blog
				</Link>
				<div className="ml-auto">
					<li className="nav-item dropdown">
						<button className="btn btn-warning dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
							Favorites
						</button>
						<ul className="dropdown-menu">
							<li><a className="dropdown-item" href="#">Action</a></li>
							<li><a className="dropdown-item" href="#">Another action</a></li>
							<li><a className="dropdown-item" href="#">Something else here</a></li>
						</ul>
        			</li>
				</div>
			</div>
		</nav>
	);
};