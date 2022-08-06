import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import CreatePaste from "./pages/CreatePaste";
import { PageRoutes } from "./properties/Routes";

export default function App(): JSX.Element {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path={PageRoutes.home} element={<CreatePaste />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

