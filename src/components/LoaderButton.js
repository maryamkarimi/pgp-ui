import React from 'react';
import { BsArrowRepeat } from 'react-icons/bs';
import './LoaderButton.css';
import { Button } from 'antd';

const LoaderButton = ({
  isLoading,
  className = '',
  disabled = false,
  ...props
}) => {
  return (
    <Button
      disabled={disabled || isLoading}
      className={`LoaderButton ${className}`}
      {...props}
    >
      {isLoading && <BsArrowRepeat className="spinning" />}
      {props.children}
    </Button>
  );
};

export default LoaderButton;
