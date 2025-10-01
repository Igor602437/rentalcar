import React from 'react';
import styles from './Icon.module.css';

type IconProps = {
  id: string;
  className?: string;
};

export const Icon: React.FC<IconProps> = ({ id, className }) => {
  return (
    <svg className={`${styles.icon} ${className || ''}`} aria-hidden="true">
      <use href={`/sprite.svg#icon-${id}`} />
    </svg>
  );
};
