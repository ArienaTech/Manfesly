import React from 'react';
import { cn } from '../lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  glass?: boolean;
}

export function Card({ children, className, glass = false }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-3xl p-6 shadow-lg transition-smooth',
        glass ? 'glass' : 'card-gradient border border-white/50',
        className
      )}
    >
      {children}
    </div>
  );
}
