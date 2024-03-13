import MamaIcon from "../../assets/icons/mama-nav-header.svg";
import "./notfound.scss";

export default function NotFound() {
  return (
    <div id="not-found">
      <div className="not-found-header">
        <a href="https://leafrebase.app" target="_blank">
          {/* <img className="branding-header-icon" src={MamaIcon} alt="Leaf" /> */}
        <h2 style={{ textAlign: "center" }}>Page not found</h2>
        </a>

      </div>
    </div>
  );
}
