import { useRef, useState } from "react";
import EmailEditor from "react-email-editor";

const EmailTemplateOptions = () => {
  const emailEditorRef = useRef(null);
  const [editorVisible, setEditorVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  // Function to load the Unlayer editor
  const onLoadEditor = () => {
    emailEditorRef.current?.editor.loadDesign({});
  };

  // Function to export the HTML from the editor
  const exportHtml = () => {
    emailEditorRef.current?.editor.exportHtml((data) => {
      const { html } = data;
      console.log("Exported HTML:", html);
      // You can save or send this HTML as needed
    });
  };

  // Handle clicking on a template option
  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setEditorVisible(true);

    if (option === "Pre-designed Templates") {
      emailEditorRef.current?.editor.loadDesign({
        body: {
          rows: [
            {
              cells: [1],
              columns: [
                {
                  contents: [
                    {
                      type: "text",
                      values: {
                        text: "<h1>Welcome to Our Newsletter</h1>",
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },
      });
    } else if (option === "Basic Templates") {
      emailEditorRef.current?.editor.loadDesign({
        body: {
          rows: [
            {
              cells: [1],
              columns: [
                {
                  contents: [
                    {
                      type: "text",
                      values: {
                        text: "<p>Add your content here...</p>",
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },
      });
    } else {
      emailEditorRef.current?.editor.loadDesign({});
    }
  };

  return (
    <div className="p-6 font-sans">
      {/* Top Section: Pre-designed and Basic Templates */}
      <div className="flex justify-around mb-10">
        <div
          className="w-80 p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md cursor-pointer transition-shadow"
          onClick={() => handleOptionClick("Pre-designed Templates")}
        >
          <div className="text-4xl mb-4">📄</div>
          <h3 className="text-lg font-semibold mb-2">Pre-designed Templates</h3>
          <p className="text-gray-600 text-sm">
            Use our pre-designed templates, personalize the content, and send
            emails quickly.
          </p>
        </div>
        <div
          className="w-80 p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md cursor-pointer transition-shadow"
          onClick={() => handleOptionClick("Basic Templates")}
        >
          <div className="text-4xl mb-4">📝</div>
          <h3 className="text-lg font-semibold mb-2">Basic Templates</h3>
          <p className="text-gray-600 text-sm">
            Pick one of our plain and simple layouts and add just text and
            images to your content.
          </p>
        </div>
      </div>

      {/* Bottom Section: Other Options */}
      <div className="flex justify-around flex-wrap gap-6">
        <div
          className="w-48 p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md cursor-pointer transition-shadow"
          onClick={() => handleOptionClick("HTML Code Editor")}
        >
          <div className="text-3xl mb-2">💻</div>
          <h4 className="text-base font-medium mb-1">HTML Code Editor</h4>
          <p className="text-gray-600 text-xs">
            Create your campaign content by manually adding HTML codes.
          </p>
        </div>
        <div
          className="w-48 p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md cursor-pointer transition-shadow"
          onClick={() => handleOptionClick("Plain Text Editor")}
        >
          <div className="text-3xl mb-2">📜</div>
          <h4 className="text-base font-medium mb-1">Plain Text Editor</h4>
          <p className="text-gray-600 text-xs">
            Create and send a simple email without any image or logo.
          </p>
        </div>
        <div
          className="w-48 p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md cursor-pointer transition-shadow"
          onClick={() => handleOptionClick("Import/Upload HTML")}
        >
          <div className="text-3xl mb-2">☁️</div>
          <h4 className="text-base font-medium mb-1">Import/Upload HTML</h4>
          <p className="text-gray-600 text-xs">
            Import/upload your HTML and CSS files, and use them for your
            content.
          </p>
        </div>
        <div
          className="w-48 p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md cursor-pointer transition-shadow"
          onClick={() => handleOptionClick("Recently Sent")}
        >
          <div className="text-3xl mb-2">⏳</div>
          <h4 className="text-base font-medium mb-1">Recently Sent</h4>
          <p className="text-gray-600 text-xs">
            Use the template from a recently sent campaign.
          </p>
        </div>
      </div>

      {/* Unlayer Email Editor */}
      {editorVisible && (
        <div className="mt-10">
          <div className="flex items-center gap-4 mb-4">
            <h2 className="text-xl font-semibold">Editing: {selectedOption}</h2>
            <button
              onClick={exportHtml}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            >
              Export HTML
            </button>
          </div>
          <EmailEditor
            ref={emailEditorRef}
            onLoad={onLoadEditor}
            style={{ height: "600px" }}
            options={{
              appearance: {
                theme: "light",
              },
            }}
          />
        </div>
      )}
    </div>
  );
};

export default EmailTemplateOptions;
