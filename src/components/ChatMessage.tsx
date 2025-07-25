import ReactMarkdown from 'react-markdown';

interface Message {
  content: string;
  isUser: boolean;
  id: string;
}

interface ChatMessageProps {
  message: Message;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  if (message.isUser) {
    return (
      <div className="flex justify-end">
        <div className="max-w-3xl">
          <div className="rounded-2xl rounded-br-md px-4 py-3 shadow-sm text-white" style={{ backgroundColor: '#4c6ef5' }}>
            <p className="text-sm leading-relaxed">{message.content}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-start">
      <div className="max-w-3xl">
        <div className="flex items-start space-x-3">
          {/* AI Avatar */}
          <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-secondary to-secondary-700 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xs">AI</span>
          </div>
          
          {/* Message Content */}
          <div className="bg-gray-100 rounded-2xl rounded-bl-md px-4 py-3 shadow-sm">
            <div className="prose prose-sm max-w-none text-gray-800">
              <ReactMarkdown
                components={{
                  p: ({ children }) => <p className="mb-2 last:mb-0 leading-relaxed">{children}</p>,
                  code: ({ children }) => (
                    <code className="bg-gray-800 text-gray-100 px-2 py-1 rounded text-xs font-mono">
                      {children}
                    </code>
                  ),
                  pre: ({ children }) => (
                    <pre className="bg-gray-800 text-gray-100 p-3 rounded-lg overflow-x-auto text-xs font-mono">
                      {children}
                    </pre>
                  ),
                  strong: ({ children }) => <strong className="font-semibold text-gray-900">{children}</strong>,
                  ul: ({ children }) => <ul className="list-disc pl-4 space-y-1">{children}</ul>,
                  ol: ({ children }) => <ol className="list-decimal pl-4 space-y-1">{children}</ol>,
                  li: ({ children }) => <li className="text-sm">{children}</li>,
                }}
              >
                {message.content}
              </ReactMarkdown>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 