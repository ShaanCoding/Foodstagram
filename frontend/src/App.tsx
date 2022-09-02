import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import Home from "./pages/Home";
import Test from "./pages/Test";

function App() {
  return (
    <>
      <Router>
        <Header />

        <Routes>
          <Route index element={<Home />} />
          <Route path="/test" element={<Test />} />
        </Routes>

        <Footer />
      </Router>
    </>
  );
}

export default App;
