import React from 'react';
import { X } from 'lucide-react';
import { useToast } from '../../hooks/useToast';
import { cn } from '../../utils';

export interface ToastProps {
  id: string;
  message: string;
  type?: 'success' | 'error' | 'info' | 'warning';
  onClose: (id: string) => void;
}

const ToastComponent: React.FC<ToastProps> = ({ id, message, type = 'info', onClose }) => {
  const bgColors = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    info: 'bg-blue-500',
    warning: 'bg-yellow-500',
  };

  return (
    <div
      className={cn(
        'flex items-center justify-between p-4 rounded-lg shadow-lg text-white min-w-[300px] max-w-md animate-slide-up',
        bgColors[type]
      )}
    >
      <span className="text-sm font-medium">{message}</span>
      <button
        onClick={() => onClose(id)}
        className="ml-4 hover:opacity-75 transition-opacity"
        aria-label="Close notification"
      >
        <X size={16} />
      </button>
    </div>
  );
};

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map((toast) => (
        <ToastComponent
          key={toast.id}
          {...toast}
          onClose={removeToast}
        />
      ))}
    </div>
  );
};

export default ToastComponent;
