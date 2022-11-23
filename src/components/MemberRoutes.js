import React from "react";
import {
  Routes,
  Route,
  Link,
  Navigate,
  BrowserRouter as Router,
} from "react-router-dom";
import ProtectedRoute from "../routes/ProtectedRoute";
import PublicRoute from "../routes/PublicRoute";
import EditData from "./EditData";
import GetItem from "./GetItem";
import Login from "./Login";
import Register from "./Register";

const MemberRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route>
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="*" element={<NotFound />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route path="/getitem" element={<GetItem />} />
            <Route path="/editdata" element={<EditData />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};
const NotFound = () => (
  <div>
    <h1>404 - Not Found!</h1>
    <Link to="/">Go Home</Link>
  </div>
);
export default MemberRoutes;
