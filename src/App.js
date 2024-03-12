import "./App.css";
import { InventarioProvider } from "./context/InventarioContext";
import MainPage from "./pages/MainPage";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <InventarioProvider>
      <div className="App">
        <Router>
          <MainPage />
        </Router>
      </div>
    </InventarioProvider>
  );
}

export default App;
