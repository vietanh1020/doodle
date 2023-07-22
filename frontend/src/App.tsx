import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RegisterForm from "./pages/RegisterForm/RegisterForm";
import { HomePage } from "./pages/Home/HomePage";
import LoginPage from "./pages/Login/LoginPage";
import PollCreate from "./pages/PollForm/PollCreate";
import PollUpdate from "./pages/PollForm/PollUpdate";
import { VotePage } from "./pages/Vote/VotePage";
import { PollDetail } from "./pages/PollForm/PollDetail";
import { NotFoundPage } from "./pages/NotFound/NotFoundPage";
import { PrivateRoute } from "./hooks/auth/PrivateRoute";
import "bootstrap/dist/css/bootstrap.min.css";
import { GoogleOAuthProvider } from "@react-oauth/google";

function App() {
  const { GOOGLE_CLIENT_ID = "" } = process.env;

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <div className="wrapper">
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            {/* <Route path="/register" element={<RegisterForm />} /> */}

            <Route
              path="/poll"
              element={
                <PrivateRoute>
                  <PollCreate />
                </PrivateRoute>
              }
            />

            <Route
              path="/poll/detail/:id"
              element={
                <PrivateRoute>
                  <PollDetail />
                </PrivateRoute>
              }
            />

            <Route
              path="/poll/:id"
              element={
                <PrivateRoute>
                  <PollUpdate />
                </PrivateRoute>
              }
            />

            <Route
              path="/"
              element={
                <PrivateRoute>
                  <HomePage />
                </PrivateRoute>
              }
            />

            <Route
              path="/home"
              element={
                <PrivateRoute>
                  <HomePage />
                </PrivateRoute>
              }
            />

            <Route path="/vote/:id" element={<VotePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </GoogleOAuthProvider>
  );
}

export default App;
