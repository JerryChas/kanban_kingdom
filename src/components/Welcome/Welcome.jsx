import React from "react";
import css from "./Welcome.module.css";
import { FaLinkedin } from "react-icons/fa";
import { FaSquareFacebook, FaSquareInstagram } from "react-icons/fa6";
import Crown from "../Board/Crown";
import Crown2 from "../Board/Crown2";

const Welcome = ({ toggleCollapse, asideIsCollapsed }) => {
  return (
    <>
      <button className="collapse_button" onClick={toggleCollapse}>
        {asideIsCollapsed ? <Crown/> : <Crown2/>}
      </button>
      <div className={css.welcome_container}>
        <h1 style={{fontFamily: "Bangers", fontSize: "3rem", margin: "1.2rem", letterSpacing: "0.1rem"}}>Welcome to Kanban Kingdom!</h1>
        <p>This is the landing page of your kanban application.</p>
        <p> {<Crown2 />} Select or create a new Board to start your project! {<Crown/>}</p>
        <br />
        <br />
        <br />

        <p>Follow us below for the latest updates.</p>
        <br />
        <div className={css.socials}>
          <FaLinkedin />
          <FaSquareFacebook />
          <FaSquareInstagram />
        </div>
      </div>
    </>
  );
};

export default Welcome;
