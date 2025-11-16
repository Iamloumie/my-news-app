"use client"; // This component has an onClick, so it's a Client component

import { ReactNode, MouseEvent, FC } from 'react'

// Properties for the Button component
interface ButtonProps {
    children: ReactNode;
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    className?: string;
    onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}

// ---- A REUSABLE, STYLED BUTTON COMPONENT ----

export const Button: FC<ButtonProps> = ({ children, variant ='primary', className = '', onClick }) => {

    const baseStyle = "px-4 py-2 rounded-md font-medium transition-all duration-200";
    const variants = {
        primary: "bg-blue-600 text-white hover:bg-blue-700 shadow-md",
        secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
        outline: "border border-gray-300 text-gray-600 hover:bg-gray-100",
        ghost: "text-gray-500 hover:text-gray-900 hover:bg-gray-100",
    };
  return (
    <button onClick={onClick} className={`${baseStyle} ${variants[variant]} ${className}`}>
      {children}
    </button>
  )
}