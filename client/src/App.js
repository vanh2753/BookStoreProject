import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import LoginForm from "./components/Auth/LoginForm";
import RegisterForm from "./components/Auth/RegisterForm";

const App = () => {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<HomePage />} />
        <Route path='/login' element={<LoginForm />} />
        <Route path='/register' element={<RegisterForm />} />
      </Route>
    </Routes>
  );
};

export default App;
