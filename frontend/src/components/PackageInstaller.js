import React, { useState } from "react";

const PackageInstaller = ({ onInstall }) => {
  const [packageName, setPackageName] = useState("");
  const [message, setMessage] = useState("");

  const handleInstall = () => {
    if (packageName) {
      onInstall(packageName);
      setMessage(`Package "${packageName}" installed successfully!`);
      setPackageName("");
    } else {
      setMessage("Please enter a package name.");
    }
  };

  return (
    <div className="package-installer">
      <input
        type="text"
        placeholder="Enter package name (e.g., lodash)"
        value={packageName}
        onChange={(e) => setPackageName(e.target.value)}
      />
      <button onClick={handleInstall}>Install Package</button>
      {message && <div className="message">{message}</div>}
    </div>
  );
};

export default PackageInstaller;