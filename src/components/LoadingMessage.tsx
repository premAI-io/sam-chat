import { useState, useEffect } from 'react';

export default function LoadingMessage() {
  const [showLongerText, setShowLongerText] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLongerText(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex justify-start">
      <div className="max-w-3xl">
        <div className="flex items-start space-x-3">
          {/* AI Avatar */}
          <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-secondary to-secondary-700 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xs">AI</span>
          </div>
          
          {/* Loading Animation */}
          <div className="bg-gray-100 rounded-2xl rounded-bl-md px-4 py-3 shadow-sm">
            <div className="flex items-center space-x-2">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
              <span className="text-sm text-gray-500 ml-2">
                Thinking{showLongerText ? ' (this is taking longer than usual)' : '...'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 