import "./styles/main.scss";
import { Outlet } from "react-router-dom";
import Nav from "./components/Nav";

function App() {
  return (
    <div className="App">
      <Nav />
      <div id="main">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
