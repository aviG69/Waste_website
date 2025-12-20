import { Link } from "react-router-dom";
export default function Navbar(){
  return (
    <nav className="navbar" style={{padding: "12px 20px"}}>
      <div className="logo" style={{fontWeight:700}}>Smart Waste</div>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/map">Map</Link>
        <Link to="/feedback">Report</Link>
        <Link to="/consultant">Consult</Link>
        <Link to="/admin">Admin</Link>
        <Link to="/login">Login</Link>
        <Link to="/signup">Sign Up</Link>

      </div>
    </nav>
  );
}
