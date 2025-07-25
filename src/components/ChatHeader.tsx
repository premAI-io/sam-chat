interface ChatHeaderProps {
  title: string;
  subtitle: string;
}

export default function ChatHeader({ title, subtitle }: ChatHeaderProps) {
  return (
    <header className="bg-white py-4">
      <div className="flex items-center justify-between max-w-4xl mx-auto px-4">
        <div className="flex items-center space-x-3">
          {/* PremAI Logo */}
          <div className="flex items-center space-x-2">
            <img 
              src="https://studio.premai.io/_app/immutable/assets/logo.BuanDG1l.svg" 
              alt="PremAI Logo" 
              className="w-8 h-8"
            />
            <span className="inline-block text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight dark:text-gray-200">Sam Chat</span>
          </div>
        </div>
        
        <div className="text-right">
          <span className="text-sm text-gray-600">Powered by PremAI</span>
        </div>
      </div>
    </header>
  );
} 