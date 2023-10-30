import "./App.css";

import { Toaster } from "react-hot-toast";
import "bootstrap/dist/css/bootstrap.min.css";
import { GoogleOAuthProvider } from "@react-oauth/google";

function App() {
  const {
    REACT_APP_GOOGLE_CLIENT_ID = "762709918247-ik6b48rn4gca2jprk9is44inrh7obt6n.apps.googleusercontent.com",
  } = process.env;

  return (
    <GoogleOAuthProvider clientId={REACT_APP_GOOGLE_CLIENT_ID}>
      <div className="wrapper">
        <Toaster />
      </div>
    </GoogleOAuthProvider>
  );
}

export default App;
