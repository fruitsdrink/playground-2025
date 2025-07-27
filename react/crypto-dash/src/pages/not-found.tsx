import type React from "react";
import { Link } from "react-router";
import { LucideArrowLeft } from "lucide-react";

export function NotFoundPage() {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>404</h1>
      <p style={styles.message}>
        Oops! The page you are looking for does not exist.
      </p>
      <Link to={"/"} style={styles.link}>
        <LucideArrowLeft />
        Go back to Home
      </Link>
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    padding: "80px 20px",
    color: "#fff",
  } as React.CSSProperties,
  title: {
    fontSize: "72px",
    marginBottom: "20px",
  } as React.CSSProperties,
  message: {
    fontSize: "18px",
    marginBottom: "30px",
  } as React.CSSProperties,
  link: {
    textDecoration: "none",
    color: "#007bff",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
  } as React.CSSProperties,
} as const;
