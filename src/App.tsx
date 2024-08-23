import React from 'react';
import { CustomSelect } from './components';

interface OptionType {
  value: string;
  label: string;
  icon?: string;
}

let options: OptionType[] = [
  { value: 'option1', label: 'Option 1', icon: 'https://img.icons8.com/?size=100&id=38388&format=png&color=000000' },
  { value: 'option2', label: 'Option 2', icon: 'https://img.icons8.com/?size=100&id=38388&format=png&color=000000' },
  { value: 'option3', label: 'Option 3', icon: 'https://img.icons8.com/?size=100&id=38388&format=png&color=000000' },
];

const handleCreateOption = (inputValue: string) => {
  console.log('Создание новой опции:', inputValue);
  // Здесь можно вызвать API для добавления новой опции
};

const customOptionRenderer = (option: OptionType) => (
  <div>
    <img src={option.icon} alt="icon" width="20" height="20" />
    <span>{option.label}</span>
  </div>
);

const customLabelRenderer = (option: OptionType) => (
  <div style={{ zIndex: 10, position: 'relative' }}>
    <img src={option.icon} alt="icon" width="20" height="20" />
    <span>{option.label}</span>
    <button onClick={() => console.log('Удаляем опцию', option)}>x</button>
  </div>
);

const App: React.FC = () => (
  <div style={{ display: 'flex', columnGap: '50px' }}>
    <CustomSelect
      options={options}
      isMulti
      onCreateOption={handleCreateOption}
      customOptionRenderer={customOptionRenderer}
      customLabelRenderer={customLabelRenderer}
    />

    <CustomSelect
      options={options}
      onCreateOption={handleCreateOption}
      customOptionRenderer={customOptionRenderer}
      customLabelRenderer={customLabelRenderer}
    />

    <CustomSelect
      options={options}
      onCreateOption={handleCreateOption}
    />

  </div>
);

export default App;
