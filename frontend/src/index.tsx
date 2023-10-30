import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { RecoilRoot } from "recoil";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/Home/HomePage";
import LoginPage from "./pages/Login/LoginPage";
import PollCreate from "./pages/PollForm/PollCreate";
import PollUpdate from "./pages/PollForm/PollUpdate";
import { VotePage } from "./pages/Vote/VotePage";
import { PollDetail } from "./pages/PollForm/PollDetail";
import { NotFoundPage } from "./pages/NotFound/NotFoundPage";
import { PrivateRoute } from "./hooks/auth/PrivateRoute";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <RecoilRoot>
      <App />

      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />

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

          <Route
            path="/vote/:id"
            element={
              <PrivateRoute>
                <VotePage />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  </React.StrictMode>
);

reportWebVitals();
