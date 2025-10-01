import css from '../FilterPanel/FilterPanel.module.css';
import { useState } from 'react';
import { Icon } from '../Icon/Icon';

interface CustomSelectProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  buttonClass: string;
  listClass: string;
  itemClass: string;
}

export default function CustomSelect({
  options,
  value,
  onChange,
  buttonClass,
  listClass,
  itemClass,
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(prev => !prev);

  const handleSelect = (option: string) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className={css.selectWrapper}>
      <button type="button" className={buttonClass} onClick={toggleOpen}>
        <span>{value}</span>
        <Icon
          id="down"
          className={`${css.arrow} ${isOpen ? css.arrowOpen : ''}`}
        />
      </button>
      {isOpen && (
        <ul className={listClass}>
          {options.map((option, index) => (
            <li
              key={index}
              className={itemClass}
              onClick={() => handleSelect(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
