import "./App.css";
import Header from "./components/Header/Header.jsx";
import Main from "./components/Main/Main";
import Footer from "./components/Footer/Footer";
import { ContextProvider } from "./context/context";

function App() {
  return (
    <div className="App">
      <Header />
      <ContextProvider>
        <Main />
      </ContextProvider>
      <Footer />
    </div>
  );
}

export default App;
