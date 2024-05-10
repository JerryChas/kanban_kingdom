import React from "react";
import css from "./InfoPage.module.css";
import Crown from "../Board/Crown";
import Crown2 from "../Board/Crown2";
import King from "../../assets/images/spiderking.png"

const InfoPage = ({ toggleCollapse, asideIsCollapsed }) => {
  return (
    <>
      <button className="collapse_button" onClick={toggleCollapse}>
        {asideIsCollapsed ? <Crown /> : <Crown2 />}
      </button>
      <main className={css.info_container} style={{margin: "2rem", padding: "2rem 2rem 0rem 2rem", display: "flex", alignItems: "center", justifyContent: "center", flexFlow: "column nowrap"}}>
        <h2 style={{ textAlign: "center", fontWeight: "500", margin: ".5rem" }}>
          Welcome to our KanbanBoard website with an exciting Marvel and Kingdom
          theme!
        </h2>
        <p>
          Explore the ultimate collection of superheroes and royal figures as
          you organize your projects and tasks with our KanbanBoard website.
          Inspired by the epic world of Marvel Comics and noble kingdoms, our
          website takes you on a journey where productivity meets the power of
          imagination.
        </p>
        <h4
          style={{
            textAlign: "center",
            fontWeight: "500",
            margin: ".5rem",
            fontSize: "1.2rem",
          }}
        >
          Explore the features:
        </h4>
        <ul style={{ margin: "1rem" }}>
          <li style={{ marginTop: ".5rem" }}>
            Superheroes and Royals: Assign your projects and tasks to icons from
            Marvel Comics and royal families to make your workday a bit more
            exciting.
          </li>
          <li style={{ marginTop: ".5rem" }}>
            Intuitive Drag-and-Drop Interface: Easily move your tasks between
            different stages of your workflow using our smooth drag-and-drop
            interface.
          </li>
          <li style={{ marginTop: ".5rem" }}>
            Visual Progress Tracking: Gain instant insight into your workflow
            with visual charts and graphs that help you identify bottlenecks and
            progress.
          </li>
        </ul>
        <p className="pStyle">
          Whether you're a die-hard Marvel enthusiast or an admirer of royal
          adventures, our KanbanBoard website with Marvel and Kingdom theme will
          take your productivity to new heights while adding a touch of
          excitement and imagination to your workday. Get ready to organize like
          a hero and reign like a king with our fantastic KanbanBoard website!
        </p>
        <img src={King} alt="King" style={{width: "60vh", marginTop: "2rem"}}/>
      </main>
    </>
  );
};

export default InfoPage;
