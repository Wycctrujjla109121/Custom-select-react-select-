import React, { useState, useRef, useEffect } from 'react';

import s from './CustomSelect.module.scss'

interface Option {
    value: string;
    label: string;
}

interface SelectProps {
    options: Option[];
    isMulti?: boolean;
    defaultValue?: Option | Option[];
    onCreateOption?: (inputValue: string) => void;
    renderDropdownOption?: (option: Option, isSelected: boolean) => React.ReactNode;
    renderSelectedOption?: (option: Option, onRemove: () => void) => React.ReactNode;
}

export const CustomSelect: React.FC<SelectProps> = ({
    options,
    isMulti = false,
    defaultValue,
    onCreateOption,
    renderDropdownOption,
    renderSelectedOption,
}) => {
    const [selectedOptions, setSelectedOptions] = useState<Option[]>(Array.isArray(defaultValue) ? defaultValue : defaultValue ? [defaultValue] : []);
    const [isOpen, setIsOpen] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleToggleOpen = () => {
        setIsOpen(!isOpen);
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value);
    };

    const handleOptionSelect = (option: Option) => {
        if (isMulti) {
            if (selectedOptions.map(i => i.value).includes(option.value)) {
                setSelectedOptions(selectedOptions.filter(i => i.value !== option.value))
            } else {
                setSelectedOptions([...selectedOptions, option]);
            }
        } else {
            setSelectedOptions([option]);
            setIsOpen(false);
        }
    };

    const handleOptionRemove = (option: Option) => {
        setSelectedOptions(selectedOptions.filter(opt => opt.value !== option.value));
    };

    const handleCreateOption = () => {
        if (onCreateOption && searchValue) {
            onCreateOption(searchValue);
            setSearchValue('');
        }
    };

    const filteredOptions = options.filter(option =>
        option.label.toLowerCase().includes(searchValue.toLowerCase())
    );

    return (
        <div className={s.select} ref={dropdownRef}>
            <div className={s.select__control} onClick={handleToggleOpen}>
                {selectedOptions.length === 0 && <div className={s.select__placeholder}>Поиск...</div>}
                {selectedOptions.map(option => (
                    <div key={option.value} className={s.select__selected_option}>
                        {renderSelectedOption ? (
                            renderSelectedOption(option, () => handleOptionRemove(option))
                        ) : (
                            <>
                                {option.label}
                                <button onClick={() => handleOptionRemove(option)}>x</button>
                            </>
                        )}
                    </div>
                ))}
            </div>
            <div className={[s.select__dropdown, !isOpen ? s.select__dropdown_hidden : s.select__dropdown_visible].join(' ')}>
                <input
                    id='input'
                    type="text"
                    className={s.select__search}
                    value={searchValue}
                    onChange={handleSearchChange}
                    placeholder="Search..."
                />
                {filteredOptions.length === 0 && (
                    <div className={s.select__no_options}>
                        Нет опций
                        {onCreateOption && (
                            <button onClick={handleCreateOption}>Создать "{searchValue}"</button>
                        )}
                    </div>
                )}
                {filteredOptions.map(option => (
                    <div
                        key={option.value}
                        className={s.select__dropdown_option}
                        onClick={() => handleOptionSelect(option)}
                    >
                        {renderDropdownOption ? (
                            renderDropdownOption(option, selectedOptions.includes(option))
                        ) : (
                            <>
                                {option.label}
                                {selectedOptions.includes(option) && <span>✓</span>}
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};
