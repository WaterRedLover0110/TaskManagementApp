import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home, SignIn, SignUp } from "./pages";
import ProtectedRoute from "./components/ProtectedRoute";

const AppLayout = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
};

export default AppLayout;
