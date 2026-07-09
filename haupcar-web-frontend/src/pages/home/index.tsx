import { Button } from "antd";
import { Link } from "react-router";

export function HomePage() {
  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ fontSize: 48, marginBottom: 16 }}>
        Welcome, Mr. Somchai 👋
      </div>
      <Link to="/car">
        <Button type="primary">Go to Car Management</Button>
      </Link>
    </div>
  );
}
