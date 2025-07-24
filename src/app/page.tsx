'use client';

import { useState, useEffect } from 'react';
import ChatHeader from '../components/ChatHeader';
import ModelSelector from '../components/ModelSelector';
import MessageList from '../components/MessageList';
import MessageInput from '../components/MessageInput';
import { createApiError } from '../types/errors';

interface Message {
  content: string;
  isUser: boolean;
  id: string;
}

interface FineTunedModel {
  id: string;
  name: string;
  created?: string;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    { content: '👋 Hello! I\'m your AI assistant. Ask me anything!', isUser: false, id: '1' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState('Ready to chat!');
  const [selectedModel, setSelectedModel] = useState('');
  const [fineTunedModels, setFineTunedModels] = useState<FineTunedModel[]>([]);
  const [modelsLoading, setModelsLoading] = useState(true);

  // Fetch fine-tuned models on component mount
  useEffect(() => {
    const fetchModels = async () => {
      try {
        const response = await fetch('/api/models');
        if (response.ok) {
          const data = await response.json();
          setFineTunedModels(data.models);
          if (data.models.length > 0) {
            setSelectedModel(data.models[0].id); // Set first model as default
          }
        } else {
          console.error('Failed to fetch models');
          setStatus('Failed to load models');
        }
      } catch (error) {
        const apiError = createApiError(error, 'Failed to load models');
        console.error('Error fetching models:', apiError);
        setStatus(`Error loading models: ${apiError.message}`);
      } finally {
        setModelsLoading(false);
      }
    };

    fetchModels();
  }, []);

  const handleSendMessage = async (messageText: string) => {
    const userMessage: Message = {
      content: messageText,
      isUser: true,
      id: Date.now().toString()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setStatus('Thinking...');

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: messageText,
          model: selectedModel 
        })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to get response');
      }

      const data = await response.json();
      
      const botMessage: Message = {
        content: data.reply,
        isUser: false,
        id: (Date.now() + 1).toString()
      };

      setMessages(prev => [...prev, botMessage]);
      setStatus('Ready to chat!');

    } catch (error: unknown) {
      const apiError = createApiError(error, 'Something went wrong');
      const errorMessage: Message = {
        content: `Error: ${apiError.message}`,
        isUser: false,
        id: (Date.now() + 1).toString()
      };
      setMessages(prev => [...prev, errorMessage]);
      setStatus('Error occurred. Try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleModelChange = (modelId: string) => {
    setSelectedModel(modelId);
  };

  const isDisabled = isLoading || !selectedModel || modelsLoading;

  return (
    <div className="flex flex-col h-screen max-w-4xl mx-auto bg-white">
      <ChatHeader 
        title="💬 PremAI Chat" 
        subtitle="Chat with your fine-tuned models" 
      />
      
      <ModelSelector
        selectedModel={selectedModel}
        onModelChange={handleModelChange}
        models={fineTunedModels}
        isLoading={modelsLoading}
      />
      
      <MessageList 
        messages={messages} 
        isLoading={isLoading} 
      />
      
      <MessageInput
        onSendMessage={handleSendMessage}
        isLoading={isLoading}
        isDisabled={isDisabled}
        status={status}
      />
    </div>
  );
}
