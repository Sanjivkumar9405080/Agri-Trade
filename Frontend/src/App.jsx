import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";


import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import About from "./pages/About";

import Products from "./pages/Products";
import Rentals from "./pages/Rentals";
import Profile from "./pages/Profile";

import FarmerDashboard from "./pages/FarmerDashboard";
import ConsumerDashboard from "./pages/ConsumerDashboard";
import FarmerProducts from "./pages/FarmerProducts";
import ProductDetails from "./pages/ProductDetails";
import FarmerProductCreate from "./pages/FarmerProductCreate";
import FarmerProductEdit from "./pages/FarmerProductEdit";

import ProtectedRoute from "./components/ProtectedRoute";


// =====================================
// ROOT ROUTE
// =====================================

function RootRoute() {
  return <Home />;
}


// =====================================
// APP
// =====================================

function App() {

  return (

    <BrowserRouter>

      <Routes>

        {/* =========================
            PUBLIC ROUTES
        ========================= */}

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/home"
          element={<Home />}
        />

        <Route
          path="/about"
          element={<About />}
        />
          

             

        {/* =========================
            FARMER DASHBOARD
        ========================= */}

        <Route
          path="/farmer-dashboard"
          element={
            <ProtectedRoute allowedRole="farmer">
              <FarmerDashboard />
            </ProtectedRoute>
          }
        />


        {/* =========================
            CONSUMER DASHBOARD
        ========================= */}

        <Route
          path="/consumer-dashboard"
          element={
            <ProtectedRoute allowedRole="consumer">
              <ConsumerDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/products/:id"
          element={
            <ProtectedRoute>
              <ProductDetails />
            </ProtectedRoute>
          }
        />


        {/* =========================
            FARMER PRODUCTS
        ========================= */}

        <Route
          path="/farmer/products"
          element={
            <ProtectedRoute allowedRole="farmer">
              <FarmerProducts />
            </ProtectedRoute>
          }
        />

        <Route
          path="/farmer/products/create"
          element={
            <ProtectedRoute allowedRole="farmer">
              <FarmerProductCreate />
            </ProtectedRoute>
          }
        />

        <Route
          path="/farmer/products/:id/edit"
          element={
            <ProtectedRoute allowedRole="farmer">
              <FarmerProductEdit />
            </ProtectedRoute>
          }
        />


        {/* =========================
            PRODUCTS
        ========================= */}

        <Route
          path="/products"
          element={
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          }
        />


        {/* =========================
            RENTALS
        ========================= */}

        <Route
          path="/rentals"
          element={
            <ProtectedRoute>
              <Rentals />
            </ProtectedRoute>
          }
        />


        {/* =========================
            PROFILE
        ========================= */}

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />


        {/* =========================
            ROOT
        ========================= */}

        <Route
          path="/"
          element={<RootRoute />}
        />


        {/* =========================
            UNKNOWN ROUTE
        ========================= */}

        <Route
          path="*"
          element={<RootRoute />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;