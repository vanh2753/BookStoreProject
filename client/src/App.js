import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';

const App = () => {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<HomePage />} />
      </Route>
    </Routes>
  )

}

export default App;
