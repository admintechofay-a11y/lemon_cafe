import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import LoadingScreen from './components/common/LoadingScreen';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Experience from './pages/Experience';
import Gallery from './pages/Gallery';
import About from './pages/About';
import Visit from './pages/Visit';
import Admin from './pages/Admin';
import NotFound from './pages/NotFound';

export default function App() {
  const [loadingComplete, setLoadingComplete] = useState(false);

  return (
    <BrowserRouter>
      {/* Cinematic Logo Preloader */}
      <LoadingScreen onComplete={() => setLoadingComplete(true)} />

      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="menu" element={<Menu />} />
          <Route path="experience" element={<Experience />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="about" element={<About />} />
          <Route path="visit" element={<Visit />} />
          <Route path="admin" element={<Admin />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
