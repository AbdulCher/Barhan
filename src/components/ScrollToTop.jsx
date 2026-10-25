// ============================================================
// SCROLL TO TOP — remet le scroll en haut à chaque changement de page
// ============================================================
//
// UTILISATION dans App.jsx :
//   import ScrollToTop from "./components/ScrollToTop";
//
//   function App() {
//     return (
//       <Router>
//         <ScrollToTop />   ← juste après <Router>, avant les <Routes>
//         <Routes>
//           ...
//         </Routes>
//       </Router>
//     );
//   }
// ============================================================

import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}
