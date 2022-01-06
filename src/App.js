import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Auth from "./features/auth";
import Login from "./features/auth/pages/Login";
import Register from "./features/auth/pages/Register";
import ProjectFeature from "./features/project";
import ListPage from "./features/project/pages/ListPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/auth" element={<Auth />}>
          <Route path="" element={<Navigate to="login" />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        <Route path="/project" element={<ProjectFeature />}>
          <Route path="" element={<Navigate to="list" />} />
          <Route path="list" element={<ListPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
