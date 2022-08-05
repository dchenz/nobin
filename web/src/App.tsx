import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import CreatePaste from "./pages/CreatePaste";
import { PageRoutes } from "./properties/Routes";

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path={PageRoutes.home} element={<CreatePaste />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

