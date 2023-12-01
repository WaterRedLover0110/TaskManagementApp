import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SignIn, SignUp } from "./pages";

const AppLayout = () => {
  return (
    <Router>
      <Routes>
        <Route path="/signin" element={<SignIn />} />
				<Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
};

export default AppLayout;