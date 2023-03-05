import React from "react";

const Index = ({ color = "#ffffff", text }) => {
  const style = {
    fontWeight: 400,
    fontSize: "16px",
    lineHeight: "100%",
    color: color,
  };
  return <p style={style}>{text}</p>;
};

export default Index;
