import React from "react";

const CodeEditor = ({ code, setCode, theme }) => {
  const handleCodeChange = (e) => {
    setCode(e.target.value);
  };

  return (
    <div className="editor">
      <textarea
        value={code}
        onChange={handleCodeChange}
        className={`form-control ${theme === "dark" ? "bg-dark text-white" : "bg-light text-dark"}`}
        style={{ height: "500px", resize: "vertical" }}
      />
    </div>
  );
};

export default CodeEditor;
