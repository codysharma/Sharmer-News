import { NavLink, Link, Route, Routes, Navigate } from "react-router-dom";
import './App.css';
import logo from "./logo2.png"
import masthead from "./masthead.png"
import HomeDisplay from './Home';
import PoliticsStories from "./Politics";
import SportsStories from "./Sports";
import LocalWeather from "./LocalWeather";


function App() {

  let routes = (
    <Routes>
        <Route path="/home" element={<HomeDisplay />}/>
        <Route path="/politics" element={<PoliticsStories />}/>
        <Route path="/sports" element={<SportsStories />}/>
        <Route path="*" element={ <Navigate to="/home" replace/>}/>
      </Routes>
  )

  return (
    <div className="App">
      <header className="App-header">
        <Link to="/home"><div><img id='headerLogo' src={logo} alt="logo"/></div></Link>
        <div><img id='masthead' src={masthead} alt="masthead"/></div>
      </header>
      <nav className="navbar">
          <NavLink className="text-link"to="/home"><h3 className="link">Home</h3></NavLink>
          <NavLink className="text-link" to="/politics"><h3 className="link">Politics</h3></NavLink>
          <NavLink className="text-link" to="/sports"><h3 className="link">Sports</h3></NavLink>
        </nav>
      <body>
        <main>
          {routes}
        </main>
        {/* <aside>
          <LocalWeather />
        </aside> */}
      </body>
    </div>
  );
}

export default App;
