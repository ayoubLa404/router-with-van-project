import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="not-found-container">
      this page doesn't exists
      <Link to="/" className="link-button">
        back to home
      </Link>
    </div>
  );
}
