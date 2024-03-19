import "./App.css";
import Header from "./components/Header";
import Landing from "./components/Landing";
import Footer from "./components/Footer";
import Products from "./components/Products";
import { Routes, Route } from "react-router-dom";
import Contact from "./components/Contact";

function App() {
  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div className=" overflow-auto max-h-full">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/landing" element={<Landing />} />
          <Route path="/products" element={<Products />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
