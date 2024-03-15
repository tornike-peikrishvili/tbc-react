import "./App.css";
import Header from "./components/Header";
import Landing from "./components/Landing";
import Footer from "./components/Footer";
import Blog from "./components/Blog";

function App() {
  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div className="overflow-auto max-h-full">
        <Landing />
        <Blog />
      </div>
      <Footer />
    </div>
  );
}

export default App;
