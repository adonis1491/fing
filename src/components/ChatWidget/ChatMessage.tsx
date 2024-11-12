import React from 'react';
import { Bot, User } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface Props {
  message: Message;
}

export default function ChatMessage({ message }: Props) {
  const isUser = message.role === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`flex items-start space-x-2 max-w-[80%] ${
          isUser ? 'flex-row-reverse space-x-reverse' : ''
        }`}
      >
        <div
          className={`p-2 rounded-full ${
            isUser ? 'bg-orange-100' : 'bg-gray-100'
          }`}
        >
          {isUser ? (
            <User className="w-4 h-4 text-orange-500" />
          ) : (
            <Bot className="w-4 h-4 text-gray-500" />
          )}
        </div>
        <div
          className={`p-3 rounded-lg ${
            isUser
              ? 'bg-orange-500 text-white'
              : 'bg-gray-100 text-gray-700'
          }`}
        >
          <p className="text-sm whitespace-pre-wrap">{message.content}</p>
        </div>
      </div>
    </div>
  );
}