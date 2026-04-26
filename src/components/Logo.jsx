import { Link } from "react-router-dom";
import vplogo from "/LogoX.jpeg";

function Logo() {
  return (
    <Link to="/">
      <img src={vplogo} className="w-18 h-15 bg-white" />
    </Link>
  );
}

export default Logo;
