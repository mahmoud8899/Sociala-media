import { BrowserRouter, Route } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from "./Pages/NavBar/NavBar"
import SingUp from "./Pages/Login/Singup"
import Login from "./Pages/Login/Login"
import profile from "./Pages/Profile/Profile"
import Home from "./Pages/Home/Home"
import ShowFrinds from "./Pages/Frinds/Frinds"
import TestMessage from "./Pages/TestMessage/TestMessage"
import PostId from "./Pages/PostId/PostId"
import { useState, createContext } from "react"
import "./App.css"
export const textCount = createContext()
export const noeXOS = createContext()
const App = () => {



  const [idChat, setIdChat] = useState(null)
  const [isProfile, setIsProfile] = useState(null)

  return (
    <textCount.Provider value={[idChat, setIdChat]}>
      <noeXOS.Provider value={[isProfile, setIsProfile]}>
        <BrowserRouter>
          <NavBar />
          <Route path="/login" component={Login} exact />
          <Route path="/singup" component={SingUp} exact />
          <Route path="/profile/:id/" component={profile} exact />
          <Route path="/" component={Home} exact />
          <Route path="/frinds/" component={ShowFrinds} exact />

          <Route path="/message/" component={TestMessage} exact />
          <Route path="/post/:id/" component={PostId}  exact />

        </BrowserRouter>
      </noeXOS.Provider>



    </textCount.Provider>
  );
}

export default App;




