import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home, SignIn, SignUp } from "./pages";

const AppLayout = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/signin" element={<SignIn />} />
				<Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
};

export default AppLayout;