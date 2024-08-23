import React, { useState } from 'react';
import { FormatOptionLabelMeta } from 'react-select';
import CreatableSelect from 'react-select/creatable';
import makeAnimated from 'react-select/animated';

const animatedComponents = makeAnimated();

interface OptionTypeBase {
    value: string;
    label: string;
    icon?: string;
}

interface CustomSelectProps {
    options: OptionTypeBase[];
    isMulti?: boolean;
    onCreateOption?: (inputValue: string) => void;
    customOptionRenderer?: (option: OptionTypeBase, meta: FormatOptionLabelMeta<OptionTypeBase>) => React.ReactNode;
    customLabelRenderer?: (option: OptionTypeBase) => React.ReactNode;
}

export const CustomSelect: React.FC<CustomSelectProps> = ({
    options,
    isMulti = false,
    onCreateOption,
    customOptionRenderer,
    customLabelRenderer,
    ...rest
}) => {
    const [selectedOptions, setSelectedOptions] = useState<OptionTypeBase[]>([]);

    const handleChange = (selected: OptionTypeBase | OptionTypeBase[]) => {
        setSelectedOptions(Array.isArray(selected) ? selected : [selected]);
    };

    const handleCreateOption = (inputValue: string) => {
        if (onCreateOption) {
            onCreateOption(inputValue);
        }
    };

    const formatOptionLabel = (option: OptionTypeBase, meta: FormatOptionLabelMeta<OptionTypeBase>) => {
        if (meta.context === 'menu' && customOptionRenderer) {
            return customOptionRenderer(option, meta);
        }
        if (meta.context === 'value' && customLabelRenderer) {
            return customLabelRenderer(option);
        }
        return option.label;
    };

    return (
        <CreatableSelect
            options={options}
            isClearable
            onCreateOption={handleCreateOption}
            isMulti={isMulti}
            value={selectedOptions}
            onChange={(e: any) => handleChange(e)}
            formatOptionLabel={formatOptionLabel}
            components={animatedComponents}
            {...rest}
        />
    );
};
