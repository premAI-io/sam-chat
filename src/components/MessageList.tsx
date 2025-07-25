import { useRef, useEffect } from 'react';
import ChatMessage from './ChatMessage';
import LoadingMessage from './LoadingMessage';

interface Message {
  content: string;
  isUser: boolean;
  id: string;
}

interface MessageListProps {
  messages: Message[];
  isLoading: boolean;
}

export default function MessageList({ messages, isLoading }: MessageListProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="h-96 overflow-y-auto p-6 space-y-4">
      {messages.map((message) => (
        <ChatMessage key={message.id} message={message} />
      ))}
      {isLoading && <LoadingMessage />}
      <div ref={messagesEndRef} />
    </div>
  );
} 