import { NavLink, Outlet } from 'react-router-dom';

const inlineStyle = {
  textDecoration: 'none',
  fontWeight: 'bold',
  color: '#1289',
};

export default function HostLayout() {
  return (
    <>
      <nav className="host-nav">
        <NavLink end style={({ isActive }) => (isActive ? inlineStyle : null)} to=".">
          Dashboard
        </NavLink>
        <NavLink style={({ isActive }) => (isActive ? inlineStyle : null)} to="income">
          Income
        </NavLink>
        <NavLink style={({ isActive }) => (isActive ? inlineStyle : null)} to="vans">
          Vans
        </NavLink>
        <NavLink style={({ isActive }) => (isActive ? inlineStyle : null)} to="reviews">
          Reviews
        </NavLink>
      </nav>

      <Outlet />
    </>
  );
}
