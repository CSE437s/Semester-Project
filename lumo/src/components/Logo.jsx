import logo from "../assets/logo.png";

export default function Logo({ scale = 0.3 }) {
  return <img src={logo} alt="Article26 Logo" width={scale * 334} height={scale * 443} />;
}
