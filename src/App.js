import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import NotFoundPage from "./components/NotFoundPage";
import Auth from "./features/auth";
import Login from "./features/auth/pages/Login";
import Register from "./features/auth/pages/Register";
import ProjectFeature from "./features/project";
import DetailPage from "./features/project/pages/DetailPage";
import ListPage from "./features/project/pages/ListPage";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navigate to="/project" />} />
        <Route element={<ProtectedRoute />}>
            <Route path="/project" element={<ProjectFeature />}>
              <Route path="" element={<Navigate to="list" />} />
              <Route path="list" element={<ListPage />} />
              <Route path=":projectId" element={<DetailPage />} />
            </Route>
        </Route>
        <Route path="/auth" element={<Auth />}>
          <Route path="" element={<Navigate to="login" />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        <Route path="*" element={<NotFoundPage />}/>
      </Routes>
    </div>
  );
}

export default App;
