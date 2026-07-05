import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import { useEffect } from "react";
import axios from "axios";
import { ServerUrl } from "./config/api";

function App() {
  useEffect(() => {
    const getUser = async () => {
      try {
        const result = await axios.get(ServerUrl + "/api/user/current-user", {
          withCredentials: true,
        });
        console.log(result.data.user);
      } catch (error) {
        console.error(error);
      }
    }
    getUser();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth" element={<Auth />} />
    </Routes>
  );
}

export default App;
