import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RegisterForm from "./pages/RegisterForm/RegisterForm";
import { HomePage } from "./pages/Home/HomePage";
import LoginPage from "./pages/Login/LoginPage";
import PollCreate from "./pages/PollForm/PollCreate";
import PollUpdate from "./pages/PollForm/PollUpdate";

function App() {
  return (
    <div className="wrapper">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/poll" element={<PollCreate />} />
          <Route path="/poll/:id" element={<PollUpdate />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
