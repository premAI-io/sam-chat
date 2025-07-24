interface FineTunedModel {
  id: string;
  name: string;
  created?: string;
}

interface ModelSelectorProps {
  selectedModel: string;
  onModelChange: (modelId: string) => void;
  models: FineTunedModel[];
  isLoading: boolean;
}

export default function ModelSelector({ 
  selectedModel, 
  onModelChange, 
  models, 
  isLoading 
}: ModelSelectorProps) {
  return (
    <div className="bg-gray-50 p-4 border-b">
      <div className="flex items-center justify-center gap-3">
        <label htmlFor="model-select" className="text-sm font-medium text-gray-700">
          🛠️ Fine-tuned Model:
        </label>
        {isLoading ? (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-sm text-gray-500">Loading models...</span>
          </div>
        ) : models.length > 0 ? (
          <select
            id="model-select"
            value={selectedModel}
            onChange={(e) => onModelChange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {models.map(model => (
              <option key={model.id} value={model.id}>
                {model.name}
                {model.created && ` (${model.created})`}
              </option>
            ))}
          </select>
        ) : (
          <span className="text-sm text-red-500">No fine-tuned models found</span>
        )}
      </div>
    </div>
  );
} 