import { Layout } from "antd";
import "./index.css";

const { Footer } = Layout;

function CustomFooter() {
  return (
    <Footer className="footer">
      <div className="footer-content">
        <a
          href="https://github.com/seygorin"
          target="_blank"
          rel="noopener noreferrer"
          className="github-link"
        >
          <span className="link-text">GitHub: seygorin</span>
        </a>
      </div>
    </Footer>
  );
}

export default CustomFooter;
