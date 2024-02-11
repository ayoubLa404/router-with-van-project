import { Link, NavLink } from 'react-router-dom';
import img from '/assets/images/avatar-icon.png';

export default function Header() {
  return (
    <header>
      <Link className="site-logo" to="/">
        #VanLife
      </Link>
      <nav>
        <NavLink to="/host">Host</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/vans">Vans</NavLink>
        <Link to="login" className="login-link">
          <img src={img} className="login-icon" />
        </Link>
        <button onClick={() => localStorage.removeItem('loggedin')}>logOutFake</button>
      </nav>
    </header>
  );
}
