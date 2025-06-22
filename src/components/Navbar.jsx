import { Link } from "react-router-dom";
import "../styles/Navbar.css";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Navbar = () => {
	const { store, dispatch } = useGlobalReducer();

	return (
		<nav className="custom-navbar">
			<div className="container d-flex justify-content-between align-items-center">
				<Link to="/" id="home-link" className="d-flex align-items-center gap-2">
					<img
						src="https://pngimg.com/d/star_wars_logo_PNG34.png"
						alt="Star Wars Logo"
						className="navbar-brand mb-0 h1"
						id="navbar-image"
					/>
					<span>Blog</span>
				</Link>

				<div className="dropdown">
					<button
						className="btn btn-warning dropdown-toggle"
						type="button"
						data-bs-toggle="dropdown"
						aria-expanded="false"
					>
						Favorites <span className="badge bg-dark">{store.favorites.length}</span>
					</button>
					<ul className="dropdown-menu dropdown-menu-end">
						{store.favorites.length === 0 ? (
							<li className="dropdown-item text-muted">No favorites yet</li>
						) : (
							store.favorites.map((fav, index) => (
								<li key={index} className="dropdown-item d-flex justify-content-between align-items-center">
									<Link to={`/${fav.type}/${fav.uid}`} className="text-decoration-none text-dark">
										{fav.name}
									</Link>
									<button
										className="btn btn-sm btn-outline-danger ms-2"
										onClick={() =>
											dispatch({ type: "toggle_favorite", payload: fav })
										}
									>
										<i className="fa-solid fa-trash"></i>
									</button>
								</li>
							))
						)}
					</ul>
				</div>
			</div>
		</nav>
	);
};