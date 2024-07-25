import React from "react";
import style from "./Footer.module.scss";

export default function Footer() {
  return (
    <div className={`f-center w-100 ${style.Footer}`}>
      <p>
        Copyright 2024 © <span> </span>
        <a href="https://www.linkedin.com/in/pierre-alexandre-crabbé-679058182/">
          Crabbé Pierre-Alexandre
        </a>
      </p>
    </div>
  );
}
