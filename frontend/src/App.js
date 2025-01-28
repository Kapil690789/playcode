import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from "react-router-dom";
import axios from "axios";
import CodeEditor from "./components/CodeEditor";
import Preview from "./components/Preview";
import PackageInstaller from "./components/PackageInstaller";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import Logout from "./components/Logout"; // Import the Logout component
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap styles

const BACKEND_URL = "https://playcode-g265.onrender.com"; // Updated Backend URL

const inbuiltCode = `<!DOCTYPE html>
<html>
<head>
  <script>
    function myFunction() {
      document.getElementById("demo").innerHTML = "Paragraph changed.";
    }
  </script>
</head>
<body>
  <h2>Demo JavaScript in Head</h2>
  <p id="demo">A Paragraph</p>
  <button type="button" onclick="myFunction()">Try it</button>
</body>
</html>`;

const App = () => {
  const isAuthenticated = !!localStorage.getItem("token");
  const [code, setCode] = useState(inbuiltCode);
  const [theme, setTheme] = useState("dark");

  // Fetch saved code from the backend on component mount
  useEffect(() => {
    if (isAuthenticated) {
      const fetchCode = async () => {
        try {
          const response = await axios.get(`${BACKEND_URL}/api/code`, {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          });
          if (response.data.length > 0) {
            setCode(response.data[0].code);
          }
        } catch (err) {
          console.error("Failed to fetch code:", err);
        }
      };
      fetchCode();
    }
  }, [isAuthenticated]);

  // Save code to the backend whenever it changes
  useEffect(() => {
    if (isAuthenticated) {
      const saveCode = async () => {
        try {
          await axios.post(
            `${BACKEND_URL}/api/code/save`,
            { code },
            { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
          );
        } catch (err) {
          console.error("Failed to save code:", err);
        }
      };
      saveCode();
    }
  }, [code, isAuthenticated]);

  const handleInstallPackage = (packageName) => {
    const script = document.createElement("script");
    script.src = `https://unpkg.com/${packageName}`;
    script.async = true;
    script.onload = () => {
      console.log(`Package "${packageName}" loaded successfully!`);
    };
    script.onerror = () => {
      console.error(`Failed to load package "${packageName}".`);
    };
    document.head.appendChild(script);
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const exportCode = () => {
    const blob = new Blob([code], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "index.html";
    link.click();
  };

  const saveCode = () => {
    alert("Code Saved!");
  };

  const clearCode = () => {
    setCode(""); // Clear the editor
  };

  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/logout" element={<Logout />} />
        <Route
          path="/editor"
          element={
            isAuthenticated ? (
              <div className={`app ${theme}`}>
                <h1 className="text-center mb-4">Playcode HTML Editor Clone</h1>
                <div className="d-flex justify-content-center gap-3 mb-4">
                  <button className="btn btn-primary" onClick={toggleTheme}>
                    Switch to {theme === "dark" ? "Light" : "Dark"} Mode
                  </button>
                  <button className="btn btn-success" onClick={exportCode}>
                    Export Code
                  </button>
                  <button className="btn btn-danger" onClick={clearCode}>
                    Clear Code
                  </button>
                  <button className="btn btn-warning" onClick={saveCode}>
                    Save Code
                  </button>
                  <Link to="/logout">
                    <button className="btn btn-secondary">Logout</button>
                  </Link>
                </div>

                <div className="editor-preview-container d-flex gap-4">
                  <PanelGroup direction="horizontal">
                    <Panel>
                      <div className="editor-container p-3 border">
                        <CodeEditor code={code} setCode={setCode} theme={theme} />
                      </div>
                    </Panel>
                    <PanelResizeHandle className="resize-handle" />
                    <Panel>
                      <div className="preview-container p-3 border">
                        <Preview code={code} />
                      </div>
                    </Panel>
                  </PanelGroup>
                </div>

                <PackageInstaller onInstall={handleInstallPackage} />
              </div>
            ) : (
              <Navigate to="/signin" />
            )
          }
        />
        <Route path="/" element={<Navigate to="/signin" />} />
      </Routes>
    </Router>
  );
};

export default App;
