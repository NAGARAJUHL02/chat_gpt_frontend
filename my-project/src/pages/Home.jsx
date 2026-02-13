import React, { useState, useRef, useEffect } from "react";
import {
  FileText, Code, Eye, Lightbulb, BarChart2,
  Sparkles, HelpCircle, PenTool,
  Image as ImageIcon, Mic, User, Bot, Loader2
} from "lucide-react";
import axios from "axios";
import ReactMarkdown from 'react-markdown';

const SuggestionPill = ({ icon: Icon, text, color, onClick }) => (
  <button
    onClick={() => onClick(text)}
    className="flex items-center gap-2 px-4 py-2 border border-gray-100 rounded-full hover:bg-gray-50 transition-all shadow-sm active:scale-95 bg-white"
  >
    <Icon className={color} size={18} />
    <span className="text-sm font-medium text-gray-700 whitespace-nowrap">{text}</span>
  </button>
);

const MessageContent = ({ role, content }) => {
  if (role === 'user') {
    return <div className="text-base leading-relaxed">{content}</div>;
  }

  return (
    <div className="text-base leading-relaxed assistant-markdown w-full overflow-x-auto">
      <ReactMarkdown
        components={{
          h3: ({ node, ...props }) => <h3 className="text-lg font-bold mt-4 mb-2 text-gray-900 border-b border-gray-100 pb-1" {...props} />,
          p: ({ node, ...props }) => <p className="mb-3 last:mb-0" {...props} />,
          ul: ({ node, ...props }) => <ul className="list-disc ml-6 mb-4 space-y-1" {...props} />,
          ol: ({ node, ...props }) => <ol className="list-decimal ml-6 mb-4 space-y-1" {...props} />,
          li: ({ node, ...props }) => <li className="pl-1" {...props} />,
          strong: ({ node, ...props }) => <strong className="font-bold text-slate-900 bg-yellow-50 px-1 rounded" {...props} />,
          hr: ({ node, ...props }) => <hr className="my-6 border-gray-100" {...props} />,
          img: ({ node, ...props }) => (
            <div className="my-6 group relative">
              <img
                className="max-w-full h-auto rounded-2xl shadow-lg border border-gray-100 transition-transform duration-300 group-hover:scale-[1.01]"
                loading="lazy"
                {...props}
              />
              <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-black/5 pointer-events-none" />
            </div>
          ),
          code: ({ node, inline, ...props }) => (
            inline
              ? <code className="bg-gray-100 text-indigo-600 px-1.5 py-0.5 rounded text-sm font-mono" {...props} />
              : <div className="bg-slate-900 text-slate-100 p-4 rounded-xl my-4 overflow-x-auto shadow-inner"><code className="text-sm font-mono" {...props} /></div>
          )
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

const Home = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const suggestions = [
    { icon: FileText, text: "Summarize text", color: "text-orange-500" },
    { icon: Code, text: "Code", color: "text-indigo-600" },
    { icon: Eye, text: "Analyze images", color: "text-indigo-500" },
    { icon: Lightbulb, text: "Brainstorm", color: "text-yellow-500" },
    { icon: BarChart2, text: "Analyze data", color: "text-blue-400" },
    { icon: Sparkles, text: "Surprise me", color: "text-teal-400" },
    { icon: Lightbulb, text: "Make a plan", color: "text-yellow-500" },
    { icon: HelpCircle, text: "Get advice", color: "text-blue-400" },
    { icon: PenTool, text: "Help me write", color: "text-purple-400" },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (text) => {
    const messageText = text || input;
    if (!messageText.trim() || isLoading) return;

    console.log("DEBUG: Initializing message send process", { messageText });

    const userMessage = { role: "user", content: messageText };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      console.log("DEBUG: Sending request to backend...");
      const response = await axios.post("http://127.0.0.1:8000/ask", {
        message: messageText
      }, {
        timeout: 30000 // 30 second timeout
      });

      console.log("DEBUG: Received response from backend", response.data);

      if (response.data && response.data.response) {
        const aiMessage = { role: "assistant", content: response.data.response };
        setMessages((prev) => [...prev, aiMessage]);
      } else {
        console.error("DEBUG: Malformed response structure", response.data);
        throw new Error("Invalid response format from server");
      }
    } catch (error) {
      console.error("DEBUG: Chat Error Details:", {
        message: error.message,
        code: error.code,
        response: error.response?.data
      });

      let userErrorMessage = "Sorry, I'm having trouble connecting to the server. Please ensure the backend is running.";

      if (error.code === 'ECONNABORTED') {
        userErrorMessage = "The request timed out. The AI might be taking too long to respond.";
      } else if (error.response?.data?.detail) {
        userErrorMessage = `Server Error: ${error.response.data.detail}`;
      }

      const errorMessage = {
        role: "assistant",
        content: userErrorMessage
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      console.log("DEBUG: Message process complete");
    }
  };

  return (
    <div className="flex-1 bg-white flex flex-col h-full overflow-hidden">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-4 py-8">
        <div className="max-w-3xl mx-auto space-y-8">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center pt-12">
              <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-12 tracking-tight">
                What can I help with?
              </h1>
              <div className="flex flex-wrap gap-2 mb-12 justify-center max-w-2xl px-4">
                {suggestions.map((item, index) => (
                  <SuggestionPill
                    key={index}
                    {...item}
                    onClick={handleSendMessage}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              {messages.map((msg, index) => (
                <div key={index} className={`flex gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {msg.role === 'assistant' && (
                    <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center shrink-0 mt-1">
                      <Bot size={18} className="text-white" />
                    </div>
                  )}
                  <div className={`max-w-[85%] rounded-2xl px-6 py-4 text-base transition-all duration-200 ${msg.role === 'user'
                    ? 'bg-indigo-50 text-indigo-900 shadow-sm border border-indigo-100'
                    : 'bg-white text-gray-900 border border-gray-100 shadow-sm'
                    }`}>
                    <MessageContent role={msg.role} content={msg.content} />
                  </div>
                  {msg.role === 'user' && (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center shrink-0 mt-1">
                      <User size={18} className="text-white" />
                    </div>
                  )}
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-4 justify-start">
                  <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center shrink-0 mt-1">
                    <Bot size={18} className="text-white" />
                  </div>
                  <div className="bg-white border border-gray-100 shadow-sm rounded-2xl px-6 py-4 flex items-center gap-3">
                    <Loader2 size={20} className="animate-spin text-indigo-500" />
                    <span className="text-gray-400 text-sm">Gemini is thinking...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
      </div>

      {/* Input Area */}
      <div className="w-full bg-white border-t border-gray-50 p-6">
        <div className="max-w-2xl mx-auto relative">
          <div className="flex items-center gap-3 bg-gray-50/50 border border-gray-200 rounded-[32px] px-5 py-4 shadow-sm focus-within:ring-2 focus-within:ring-indigo-100 transition-all">
            <button className="p-1 hover:bg-gray-200 rounded-full transition-colors text-gray-500">
              <ImageIcon size={20} />
            </button>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask anything"
              className="flex-1 outline-none bg-transparent text-gray-800 placeholder-gray-400 text-base"
            />
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-500">
                <Mic size={20} />
              </button>
              <button
                onClick={() => handleSendMessage()}
                disabled={!input.trim() || isLoading}
                className={`p-2 rounded-full transition-all flex items-center justify-center ${!input.trim() || isLoading
                  ? 'bg-gray-200 text-gray-400'
                  : 'bg-black text-white hover:bg-gray-800 active:scale-90 shadow-md'
                  }`}
              >
                {isLoading ? (
                  <Loader2 size={20} className="animate-spin" />
                ) : (
                  <div className="flex gap-0.5 items-center px-0.5">
                    <div className="w-0.5 h-3 bg-white rounded-full" />
                    <div className="w-0.5 h-5 bg-white rounded-full" />
                    <div className="w-0.5 h-3 bg-white rounded-full" />
                  </div>
                )}
              </button>
            </div>
          </div>
          <p className="text-[10px] text-gray-400 text-center mt-3">
            Gemini may provide inaccurate info. Check its responses.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;