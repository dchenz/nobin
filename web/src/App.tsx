import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import CreatePaste from "./pages/CreatePaste";
import RecentPastes from "./pages/RecentPastes";
import ViewPaste from "./pages/ViewPaste";
import { PageRoutes } from "./shared/Routes";

export default function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Navbar />
      <div id="app-body">
        <Routes>
          <Route path={PageRoutes.home} element={<CreatePaste />} />
          <Route path={PageRoutes.viewPaste} element={<ViewPaste />} />
          <Route path={PageRoutes.recentPastes} element={<RecentPastes />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

