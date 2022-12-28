import "./App.css";
import { AppComponent } from "./app";
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Routes,
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <AppComponent />
      </Router>
    </div>
  );
}

export default App;
