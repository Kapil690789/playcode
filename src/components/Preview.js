import React, { useRef, useEffect } from "react";

const Preview = ({ code }) => {
  const iframeRef = useRef(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    const doc = iframe.contentWindow.document;
    doc.open();
    doc.write(code);
    doc.close();
  }, [code]);

  return (
    <iframe
      ref={iframeRef}
      title="Preview"
      className="w-100"
      style={{ height: "500px", border: "none" }}
    />
  );
};

export default Preview;
