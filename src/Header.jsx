import React, { useEffect, useState } from "react";

export const Header = (props) => {
  return (
    <div className="header">
      <span className="title">
        <span className="outlined">AWESOME</span>FEST
        <span className="outlined editor"> EDITOR</span>
      </span>
      <div className="buttons"></div>
    </div>
  );
};
