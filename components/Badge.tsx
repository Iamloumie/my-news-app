import { FC, ReactNode } from 'react'

// Properties for the Badge component

interface BadgeProps {
    children: ReactNode;
    className?: string;
}

// ---- A REUSABLE, STYLED BADGE COMPONENT ----

export const Badge: FC<BadgeProps> = ({ children, className = '' }) => {
    return (
    <span className={`inline-block px-2 py-1 text-xs font-bold uppercase tracking-wider rounded-sm ${className}`}>
        {children}
    </span>
    )
}