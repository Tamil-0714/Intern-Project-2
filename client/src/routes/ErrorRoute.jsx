import React from "react";

const ErrorRoute = () => {
  return (
    <div className="error-element">
      <h2>
        Page Not found <span style={{ color: "orangered" }}>404</span>
      </h2>
      <a href="/">Home Page</a>
    </div>
  );
};

export default ErrorRoute;
