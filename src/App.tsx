import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router';
import Home from './views/Home';
import Layout from './views/Layout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
