import React from 'react';

type BadgeProps = {
  status: 'SHIPPED' | 'IN_PROGRESS' | 'ARCHIVED' | string;
  label?: string;
};

export default function Badge({ status, label }: BadgeProps) {
  let styleClasses = '';
  let displayText = label || status;

  switch (status) {
    case 'SHIPPED':
      styleClasses = 'bg-pass-bg text-pass';
      if (!label) displayText = 'Shipped';
      break;
    case 'IN_PROGRESS':
      styleClasses = 'bg-pending-bg text-pending';
      if (!label) displayText = 'In progress';
      break;
    case 'ARCHIVED':
      styleClasses = 'bg-card border border-line text-ink-soft';
      if (!label) displayText = 'Archived';
      break;
    default:
      styleClasses = 'bg-ribbon text-ribbon-ink';
      break;
  }

  return (
    <span className={`px-2 py-1 text-xs font-mono rounded-md whitespace-nowrap ${styleClasses}`}>
      {displayText}
    </span>
  );
}