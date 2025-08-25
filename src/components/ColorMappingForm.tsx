import type {
  ColorMapping,
  ColorMappingFormHandler,
  ColorMappingRemoveHandler,
} from '../types';
import { useColorMappingForm } from '../hooks/useColorMappingForm';
import { UI_TEXT } from '../constants';

interface ColorMappingFormProps {
  readonly colorMappings: readonly ColorMapping[];
  readonly onAdd: ColorMappingFormHandler;
  readonly onRemove: ColorMappingRemoveHandler;
}

export function ColorMappingForm({
  colorMappings,
  onAdd,
  onRemove,
}: ColorMappingFormProps) {
  const { color, setColor, tagName, setTagName, handleSubmit } =
    useColorMappingForm({ onAdd });

  return (
    <div className="bg-amber-50 rounded-lg p-6 border border-amber-200">
      <h2 className="text-lg font-semibold text-amber-900 mb-4">
        {UI_TEXT.COLOR_MAPPING_TITLE}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4 mb-6">
        <div className="flex gap-4 items-end">
          <div className="flex-1">
            <label
              htmlFor="color"
              className="block text-sm font-medium text-amber-800 mb-1"
            >
              {UI_TEXT.FORM_LABELS.COLOR_HEX}
            </label>
            <input
              type="text"
              id="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              placeholder={UI_TEXT.PLACEHOLDERS.COLOR}
              className="w-full px-3 py-2 border border-amber-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>

          <div className="flex-1">
            <label
              htmlFor="tagName"
              className="block text-sm font-medium text-amber-800 mb-1"
            >
              {UI_TEXT.FORM_LABELS.TAG_NAME}
            </label>
            <input
              type="text"
              id="tagName"
              value={tagName}
              onChange={(e) => setTagName(e.target.value)}
              placeholder={UI_TEXT.PLACEHOLDERS.TAG_NAME}
              className="w-full px-3 py-2 border border-amber-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>

          <button
            type="submit"
            className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-colors"
          >
{UI_TEXT.BUTTONS.ADD_MAPPING}
          </button>
        </div>
      </form>

      {colorMappings.length > 0 && (
        <div>
          <h3 className="text-md font-medium text-amber-900 mb-3">
            {UI_TEXT.CURRENT_MAPPINGS}
          </h3>
          <div className="space-y-2">
            {colorMappings.map((mapping) => (
              <div
                key={mapping.id}
                className="flex items-center justify-between bg-white p-3 rounded border border-amber-200"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-6 h-6 rounded border border-gray-300"
                    style={{ backgroundColor: mapping.color }}
                  />
                  <span className="font-mono text-sm text-gray-600">
                    {mapping.color}
                  </span>
                  <span className="text-gray-400">→</span>
                  <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                    &lt;{mapping.tagName}&gt;
                  </code>
                </div>
                <button
                  onClick={() => onRemove(mapping.id)}
                  className="text-red-600 hover:text-red-800 focus:outline-none"
                >
{UI_TEXT.BUTTONS.REMOVE}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
