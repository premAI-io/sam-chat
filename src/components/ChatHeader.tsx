interface ChatHeaderProps {
  title: string;
  subtitle: string;
}

export default function ChatHeader({ title, subtitle }: ChatHeaderProps) {
  return (
    <div className="bg-blue-600 text-white p-6 text-center">
      <h1 className="text-2xl font-bold mb-2">{title}</h1>
      <p className="opacity-90">{subtitle}</p>
    </div>
  );
} 