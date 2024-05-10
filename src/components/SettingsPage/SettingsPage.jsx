import React from "react";
import css from "./SettingsPage.module.css";
import Crown from "../Board/Crown";
import Crown2 from "../Board/Crown2";

const SettingsPage = ({ toggleCollapse, asideIsCollapsed }) => {
  return (
    <>
      <button className="collapse_button" onClick={toggleCollapse}>
        {asideIsCollapsed ? <Crown /> : <Crown2 />}
      </button>
      <main className={css.settings_container} style={{display: "flex", alignItems: "center", justifyContent: "center", flexFlow: "column nowrap", gap: "2rem", margin: "2rem", padding: "2rem"}}>
        <h2>Settings</h2>
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/dQw4w9WgXcQ?si=6JTOzwbci4woGSy9&amp;start=0&autoplay=1"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
        ></iframe>
      </main>
    </>
  );
};

export default SettingsPage;
