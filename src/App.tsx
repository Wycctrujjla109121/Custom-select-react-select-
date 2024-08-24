import { useState } from 'react';
import { CustomSelect } from './components';

const App = () => {
  const [options, setOptions] = useState<{ value: string, label: string }[]>([
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ]);

  const handleCreateOption = (inputValue: string) => {
    const newOption = { value: inputValue.toLowerCase(), label: inputValue };
    setOptions([...options, newOption]);
  };

  return (
    <div>
      <CustomSelect
        options={options}
        isMulti
        onCreateOption={handleCreateOption}
        renderDropdownOption={(option, isSelected) => (
          <>
            {option.label}
            {isSelected && <span>✓</span>}
          </>
        )}
        renderSelectedOption={(option, onRemove) => (
          <>
            {option.label}
            <button onClick={onRemove}>x</button>
          </>
        )}
      />
    </div>
  );
};

export default App
