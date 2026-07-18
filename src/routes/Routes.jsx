import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../Pages/Home/Home";
import SouthKorea from "../Pages/Countries/SouthKorea";
import Uk from "../Pages/Countries/Uk";
import Australia from "../Pages/Countries/Australia";
import Europe from "../Pages/Countries/Europe";
import Portfolio from "../Pages/Portfolio/Portfolio";
import About from "../Pages/about/About";
import Contact from "../Pages/Contact/Contact";
import PrivacyPolicy from "../Pages/Legal/PrivacyPolicy";
import TermsOfService from "../Pages/Legal/TermsOfService";
import CookiePolicy from "../Pages/Legal/CookiePolicy";
import NotFound from "../Pages/NotFound/NotFound";
import ReviewPage from "../Pages/Review/ReviewPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
      { path: "/", element: <Home></Home> },
      { path: "/portfolio", element: <Portfolio></Portfolio> },
      { path: "/about", element: <About></About> },
      { path: "/contact", element: <Contact></Contact> },

      {
        path: "/review",
        element: <ReviewPage></ReviewPage>,
      },

      // Countries — South Korea, UK, Australia, Europe only
      { path: "/southkorea", element: <SouthKorea></SouthKorea> },
      { path: "/australia", element: <Australia></Australia> },
      { path: "/uk", element: <Uk></Uk> },
      { path: "/europe", element: <Europe></Europe> },

      // Legal
      { path: "/privacy-policy", element: <PrivacyPolicy></PrivacyPolicy> },
      { path: "/terms-of-service", element: <TermsOfService></TermsOfService> },
      { path: "/cookie-policy", element: <CookiePolicy></CookiePolicy> },

      // Fallback
      { path: "*", element: <NotFound></NotFound> },
    ],
  },
]);

export default router;
