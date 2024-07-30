import Title from "@components/common/Title";
import "./index.css";

function NotFound() {
  return (
    <div className="not-found">
      <Title text="404: Not Found!" />
      <p>Do something good instead</p>
    </div>
  );
}

export default NotFound;
