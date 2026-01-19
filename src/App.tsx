import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router';
import Home from './views/Home';
import Layout from './views/Layout';
import DetectFace from './views/DetectFace';
import { useStore } from './stores/DBStore';
import { useEffect } from 'react';

function App() {
  const { init } = useStore();

  useEffect(() => {
    init();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/face" element={<DetectFace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
