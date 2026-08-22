import { Navigate, useLocation } from "react-router-dom";

function ProtectedRoute({ children, allowedRole }) {

  const token = localStorage.getItem("token");
  const userString = localStorage.getItem("user");

  const location = useLocation();

  let user = null;

  // =====================================
  // GET USER
  // =====================================

  try {

    if (userString) {
      user = JSON.parse(userString);
    }

  } catch (error) {

    console.error("Invalid user data");

    localStorage.removeItem("user");
    localStorage.removeItem("token");

  }


  // =====================================
  // NOT LOGGED IN
  // =====================================

  if (!token || !user) {

    return (
      <Navigate
        to="/login"
        replace
        state={{
          from: location.pathname
        }}
      />
    );

  }


  // =====================================
  // ROLE CHECK
  // =====================================

  if (
    allowedRole &&
    user.role !== allowedRole
  ) {

    if (user.role === "farmer") {

      return (
        <Navigate
          to="/farmer-dashboard"
          replace
        />
      );

    }

    if (user.role === "consumer") {

      return (
        <Navigate
          to="/consumer-dashboard"
          replace
        />
      );

    }

  }


  // =====================================
  // AUTHORIZED
  // =====================================

  return children;
}

export default ProtectedRoute;