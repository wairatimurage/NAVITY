import React, { useState } from "react";
// import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/shared/Navbar";
import { Switch, Route } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import SignUp from "./components/SignUp";
import PasswordRecovery from "./components/PasswordRecovery";
import SignupRecoveryCompletion from "./components/shared/SignupRecoveryCompletion";
import PageNotFound from "./components/PageNotFound";
import Profile from "./components/Profile/Profile";
import CardList from "./components/CardList";
import AboutPage from "./components/About";
import Footer from "./components/shared/Footer";
import EditProfile from "./components/Profile/EditProfile";
import Posts from "./components/Posts";
import Bookings from "./components/Bookings";
import PlaceBooking from "./components/PlaceBooking";

function App() {
  const [toggleState, setToggleState] = useState(false);
  const [toggleDrop, setToggleDrop] = useState(false);
  const toggle = () => setToggleState(!toggleState);
  const toggleDropdown = () => setToggleDrop(!toggleDrop);
  const hideMenus = () => {
    setToggleState(false);
    setToggleDrop(false);
  };
  return (
    <div
      className="app"
      style={{
        minHeight: "100vh",
        position: "relative",
      }}
    >
      <Navbar
        toggle={toggle}
        toggleState={toggleState}
        toggleDrop={toggleDrop}
        toggleDropdown={toggleDropdown}
      />
      <div className="main" onClick={hideMenus}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/sign-up" component={SignUp} />
          <Route path="/about" component={AboutPage} />
          <Route path="/passwpord-recovery" component={PasswordRecovery} />
          <Route path="/completion" component={SignupRecoveryCompletion} />
          <Route exact path="/pilots" component={CardList} />
          <Route exact path="/institutions" component={CardList} />
          <Route exact path="/info-hub" component={Posts} />
          <Route
            path="/profile/:accountType/edit/:id"
            component={EditProfile}
          />
          <Route path="/pilots/:name" component={Profile} />
          <Route path="/institutions/:id" component={Profile} />
          <Route path="/bookings/:id" component={Bookings} />
          <Route path="/booking/:id" component={PlaceBooking} />
          <Route component={PageNotFound} />
        </Switch>
      </div>
      <Footer />
    </div>
  );
}

export default App;
