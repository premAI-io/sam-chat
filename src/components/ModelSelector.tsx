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
  if (isLoading) {
    return (
      <div className="py-2">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 border-2 border-secondary border-t-transparent rounded-full animate-spin"></div>
          <span className="text-sm text-gray-600">Loading fine-tuned models...</span>
        </div>
      </div>
    );
  }

  if (models.length === 0) {
    return (
      <div className="py-2">
        <div className="text-sm text-amber-600 bg-amber-50 border border-amber-200 rounded-lg p-3">
          <div className="flex items-center space-x-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <span className="font-medium">No fine-tuned models found</span>
          </div>
          <p className="mt-1 text-xs text-amber-700">
            Create and deploy your models in PremAI Studio to use them here.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-2">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-gray-700">
          Select Model
        </label>
        <select
          value={selectedModel}
          onChange={(e) => onModelChange(e.target.value)}
          className="ml-3 px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent min-w-48"
        >
          {models.map((model) => (
            <option key={model.id} value={model.id}>
              {model.name}
              {model.created && ` (${model.created})`}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
} 