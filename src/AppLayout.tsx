import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home, SignIn, SignUp } from "./pages";
import { useGetTheme } from "./hooks";
import ProtectedRoute from "./components/ProtectedRoute";

const AppLayout = () => {
  const isDarkMode: boolean = useGetTheme();

  return (
    <div className={isDarkMode ? 'dark' : ''}>
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
    </div>
  );
};

export default AppLayout;
