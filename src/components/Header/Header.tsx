import { Link, NavLink } from 'react-router-dom';
import css from './Header.module.css';

export default function Header() {
  return (
    <header className={css.headerPanel}>
      <nav className={css.navPanel}>
        <Link to="/" className={css.logo}>
          Rental<span className={css.logoSpan}>Car</span>
        </Link>
        <div className={css.navMenu}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? `${css.link} ${css.active}` : css.link
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/catalog"
            end
            className={({ isActive }) =>
              isActive ? `${css.link} ${css.active}` : css.link
            }
          >
            Catalog
          </NavLink>
          <NavLink
            to="/favorites"
            className={({ isActive }) =>
              isActive ? `${css.link} ${css.active}` : css.link
            }
          >
            Favorites
          </NavLink>
        </div>
      </nav>
    </header>
  );
}
