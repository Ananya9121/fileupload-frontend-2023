import "./App.css";
import Signup from "./Components/Main/User/Auth/Signup";
import Login from "./Components/Main/User/Auth/Login";
import { Route, Routes } from "react-router-dom";
import DocumentUpload from "./Components/Main/User/DocumentUpload/DocumentUpload";


export const config = {
  endpoint: `http://localhost:3004`,
};

function App() {

  
  return (
    <div className="App container-fluid">
      <Routes>
        <Route path="/user/documentUpload" element={<DocumentUpload />} exact />
        
        <Route path="/user/login" element={<Login />} exact />

        <Route path="/" element={<Signup />} exact />
      </Routes>
    </div>
  );
}

export default App;
