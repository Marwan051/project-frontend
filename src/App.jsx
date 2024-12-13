import { Routes, Route } from "react-router";
import "./App.css";
import { Home, Landing, PageNotFound, Signup, Login, Profile } from "./pages";
import { AuthProvider } from "./components/AuthContext";
import ProtectedRoutes from "./components/ProtectedRoutes";
import BlockLogin from "./components/BlockLogin";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Landing />} />

        <Route element={<ProtectedRoutes />}>
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
        </Route>

        <Route element={<BlockLogin />}>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Route>

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
