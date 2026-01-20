import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { SiCodemagic } from "react-icons/si";
import { HiCode } from "react-icons/hi";
import Editor from "@monaco-editor/react";
import { AiFillCopy } from "react-icons/ai";
import { PiExportBold } from "react-icons/pi";
import { ImNewTab } from "react-icons/im";
import { LuRefreshCcw } from "react-icons/lu";
import Groq from "groq-sdk"; 
import { ClipLoader } from "react-spinners";

// 🔴 PASTE YOUR GROQ KEY HERE 
const GROQ_API_KEY = " ENTER YOUR API KEY HERE"; 

const Home = () => {
  const options = [
    { value: "html-css", label: "HTML + CSS" },
    { value: "html-tailwind", label: "HTML + Tailwind" },
    { value: "html-bootstrap", label: "HTML + Bootstrap" },
    { value: "html-css-js", label: "HTML + CSS + JavaScript" },
    { value: "html-tailwind-bootstrap", label: "HTML + Tailwind + Bootstrap" },
  ];

  const [framework, setFramework] = useState(options[0]);
  const [prompt, setPrompt] = useState("");
  const [outputScreen, setOutputScreen] = useState(false);
  const [tab, setTab] = useState(1);
  const [code, setCode] = useState("");
  const [loader, setLoader] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      alert("Please describe your component first!");
      return;
    }

    try {
      setLoader(true);
      
      const groq = new Groq({ 
        apiKey: GROQ_API_KEY, 
        dangerouslyAllowBrowser: true 
      });

      const promptText = `
      You are an expert web developer.
      Generate a modern, responsive component for: "${prompt}"
      
      Strict Requirements:
      1. Use the framework: ${framework.label}.
      2. Return a COMPLETE HTML file (<html>, <head>, <body>).
      3. If Tailwind or Bootstrap is selected, YOU MUST INCLUDE the CDN link in the <head>.
      4. Include all custom CSS inside <style> tags.
      5. Include all JS inside <script> tags.
      6. Do NOT add any markdown formatting (no \`\`\`html backticks).
      7. Return ONLY the raw code.
      `;

      const chatCompletion = await groq.chat.completions.create({
        messages: [{ role: "user", content: promptText }],
        model: "llama-3.3-70b-versatile", 
      });

      let codeOutput = chatCompletion.choices[0]?.message?.content || "";

      
      codeOutput = codeOutput.replace(/```html/g, "").replace(/```/g, "");

      setCode(codeOutput);
      setOutputScreen(true);
      setTab(2); 
    } catch (error) {
      console.error("Error:", error);
      alert(`Groq Error: ${error.message}`);
    } finally {
      setLoader(false);
    }
  };

  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    alert("Code copied to clipboard!");
  };

 
  const openInNewTab = () => {
    const newWindow = window.open();
    if (newWindow) {
        newWindow.document.write(code);
        newWindow.document.close();
    } else {
        alert("Pop-up blocked! Please allow pop-ups for this site.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center px-[100px] justify-between gap-[40px]">
        {/* Left Section */}
        <div className="left w-[50%] h-[auto] py-[30px] rounded-xl bg-[#141319] mt-6 p-[20px]">
          <h3 className="text-[25px] font-semibold sp-text">
            AI Component Generator
          </h3>
          <p className="text-[gray] mt-2 text-[16px]">
            Describe your component and AI will code it for you.
          </p>

          <p className="text-[15px] font-[700] mt-4">Framework</p>
          <select
            className="mt-3"
            style={{
              width: "100%",
              backgroundColor: "#0d1117",
              color: "#e2e8f0",
              border: "1px solid #2d3748",
              borderRadius: "0.75rem",
              padding: "0.6rem 0.75rem",
              fontSize: "1rem",
              fontWeight: 500,
              outline: "none",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
            onChange={(e) => {
              const selected = options.find(
                (opt) => opt.value === e.target.value
              );
              setFramework(selected);
            }}
          >
            {options.map((opt) => (
              <option
                key={opt.value}
                value={opt.value}
                style={{
                  backgroundColor: "#111827",
                  color: "#f8fafc",
                  padding: "0.5rem 0.75rem",
                }}
              >
                {opt.label}
              </option>
            ))}
          </select>

          <p className="text-[15px] font-[700] mt-5">Describe Your Component</p>
          <textarea
            onChange={(e) => setPrompt(e.target.value)}
            value={prompt}
            className="w-full h-[200px] rounded-xl bg-[#09090B] mt-3 p-[10px] text-white"
            placeholder="Describe your component and let AI code for you..."
          ></textarea>

          <div className="flex items-center justify-between">
            <p className="text-[gray]">
              Click on generate button to generate your code
            </p>
            <button
              onClick={handleGenerate}
              className="generate flex items-center text-[16px] font-[500] p-[15px] rounded-lg border-0 bg-gradient-to-r from-yellow-300  to-pink-600 mt-3 px-[20px] gap-[10px] text-white hover:opacity-[.8]"
            >
              {loader ? (
                <ClipLoader color="#fff" size={20} />
              ) : (
                <>
                  Generate <SiCodemagic />
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Section */}
        <div className="right relative mt-2 w-[50%] h-[80vh] bg-[#141319] rounded-xl overflow-hidden">
          {!outputScreen ? (
            <div className="skeleton w-full h-full flex items-center flex-col justify-center">
              <div className="circle flex items-center justify-center text-[30px] p-[20px] w-[70px] h-[70px] rounded-[50%] bg-gradient-to-r from-yellow-300  to-pink-600 text-white">
                <HiCode />
              </div>
              <div className="text-[16px] text-[gray] mt-3">
                Your Component and Code will appear here
              </div>
            </div>
          ) : (
            <>
              <div className="top bg-[#17171C] w-full h-[60px] flex items-center justify-between px-[20px]">
                {/* Tabs Group */}
                <div className="flex items-center gap-[15px] w-[60%]">
                    <button
                    onClick={() => setTab(1)}
                    className={`btn w-[50%] p-[10px] rounded-xl cursor-pointer transition-all text-white ${
                        tab === 1 ? "bg-[#333]" : ""
                    }`}
                    >
                    Code
                    </button>
                    <button
                    onClick={() => setTab(2)}
                    className={`btn w-[50%] p-[10px] rounded-xl cursor-pointer transition-all text-white ${
                        tab === 2 ? "bg-[#333]" : ""
                    }`}
                    >
                    Preview
                    </button>
                </div>

                {/* Action Buttons Group */}
                <div className="flex items-center gap-[15px] text-white text-[20px]">
                    <AiFillCopy 
                        className="cursor-pointer hover:text-purple-500 transition-all"
                        onClick={copyToClipboard}
                        title="Copy Code"
                    />
                    <ImNewTab 
                        className="cursor-pointer hover:text-purple-500 transition-all"
                        onClick={openInNewTab}
                        title="Open in New Tab"
                    />
                </div>
              </div>

              <div className="editor h-[calc(100%-60px)] w-full">
                {tab === 1 ? (
                  <Editor
                    height="100%"
                    theme="vs-dark"
                    language="html"
                    value={code}
                    options={{
                        minimap: { enabled: false },
                        fontSize: 14,
                        automaticLayout: true
                    }}
                  />
                ) : (
                  <iframe
                    srcDoc={code}
                    title="Preview"
                    className="w-full h-full bg-white"
                  />
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;