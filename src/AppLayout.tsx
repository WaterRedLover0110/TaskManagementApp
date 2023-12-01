import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SignIn } from "./pages";

const AppLayout = () => {
  return (
    <Router>
      <Routes>
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </Router>
  );
};

export default AppLayout;