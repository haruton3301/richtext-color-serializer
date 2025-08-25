import type { ColorMapping } from './types';
import { useLocalStorage } from './hooks/useLocalStorage';
import { ColorMappingForm } from './components/ColorMappingForm';
import { TextProcessor } from './components/TextProcessor';
import { LOCAL_STORAGE_KEY, UI_TEXT } from './constants';

function App() {
  const [colorMappings, setColorMappings] = useLocalStorage<ColorMapping[]>(
    LOCAL_STORAGE_KEY,
    [
      {
        id: 'default_updated',
        color: '#34a853',
        tagName: 'updated',
      },
    ]
  );

  const handleAddMapping = (mapping: ColorMapping) => {
    setColorMappings([...colorMappings, mapping]);
  };

  const handleRemoveMapping = (id: string) => {
    setColorMappings(colorMappings.filter((m) => m.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-100 to-orange-200">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-amber-900 mb-2">
            {UI_TEXT.TITLE}
          </h1>
          <p className="text-amber-700 max-w-2xl mx-auto">
            {UI_TEXT.DESCRIPTION}
          </p>
        </header>

        <div className="max-w-4xl mx-auto space-y-8">
          <ColorMappingForm
            colorMappings={colorMappings}
            onAdd={handleAddMapping}
            onRemove={handleRemoveMapping}
          />

          <TextProcessor colorMappings={colorMappings} />
        </div>
      </div>
    </div>
  );
}

export default App;
