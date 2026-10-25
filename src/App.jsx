import { Routes, Route } from 'react-router-dom';
import Home from "./pages/Home"
import About from "./pages/About"
import Music from "./pages/music/Music"
import Medias from "./pages/Medias.jsx";
import Bookme from "./pages/Bookme.jsx";
import ScrollToTop from "./components/ScrollToTop";
import Shop from "./pages/Shop";
import AudioPlayer from "./components/AudioPlayer";

export default function App() {
  return (
   <>
     <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/music" element={<Music />} />
        <Route path="/medias" element={<Medias />} />
        <Route path="/bookme" element={<Bookme />} />
        {/* <Route path="/shop" element={<Shop />} /> */}
      </Routes>
      <AudioPlayer />
    </>
  )
}

 