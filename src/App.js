import "./App.css";
import Header from "./components/Header";
import Landing from "./components/Landing";
import Footer from "./components/Footer";
import Products from "./components/Products";

function App() {
  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div className=" overflow-auto max-h-full">
        <Landing />
        <Products />
      </div>
      <Footer />
    </div>
  );
}

export default App;
