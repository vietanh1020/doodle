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

function App() {
  return (
    <div className="wrapper">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/poll" element={<PollCreate />} />
          <Route path="/poll-detail/:id" element={<PollDetail />} />
          <Route path="/poll/:id" element={<PollUpdate />} />
          <Route path="/vote/:id" element={<VotePage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
