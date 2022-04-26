import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginForm from "./pages/Login/LoginForm";
import RegisterForm from "./pages/RegisterForm/RegisterForm";
import PollForm from "./pages/PollForm/PollForm";

function App() {
  return (
    <div className="wrapper">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/poll" element={<PollForm />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
