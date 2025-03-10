// src/components/EmailTemplateEditor.js
import React, { useRef, useEffect } from "react";
import EmailEditor from "react-email-editor";
import { Button } from "antd";

const EmailTemplateEditor = () => {
  const emailEditorRef = useRef(null);

  // Export HTML function
  const exportHtml = () => {
    const unlayer = emailEditorRef.current?.editor;

    unlayer?.exportHtml((data) => {
      const { design, html } = data;
      console.log("exportHtml", html);
    });
  };

  // onReady callback for EmailEditor
  const onReady = (unlayer) => {
    // Editor is ready
    // You can load your template here
    // const templateJson = { DESIGN JSON GOES HERE };
    // unlayer.loadDesign(templateJson);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-4xl p-4 bg-white rounded-lg shadow-md">
        <div className="mb-4">
          <Button
            type="primary"
            onClick={exportHtml}
            className="bg-blue-500 text-white"
          >
            Export HTML
          </Button>
        </div>

        <EmailEditor
          ref={emailEditorRef}
          onReady={onReady}
          style={{
            minHeight: "80vh",
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
          }}
        />
      </div>
    </div>
  );
};

export default EmailTemplateEditor;
