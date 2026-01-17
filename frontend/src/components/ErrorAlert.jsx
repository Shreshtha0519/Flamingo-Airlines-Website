import { motion, AnimatePresence } from 'framer-motion';

const ErrorAlert = ({ message, onDismiss, type = 'error' }) => {
  if (!message) return null;

  const styles = {
    error: {
      bg: 'bg-red-500/10',
      border: 'border-red-500/50',
      text: 'text-red-400',
      icon: '❌',
    },
    warning: {
      bg: 'bg-yellow-500/10',
      border: 'border-yellow-500/50',
      text: 'text-yellow-400',
      icon: '⚠️',
    },
    success: {
      bg: 'bg-green-500/10',
      border: 'border-green-500/50',
      text: 'text-green-400',
      icon: '✓',
    },
    info: {
      bg: 'bg-blue-500/10',
      border: 'border-blue-500/50',
      text: 'text-blue-400',
      icon: 'ℹ️',
    },
  };

  const style = styles[type];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className={`${style.bg} border ${style.border} rounded-lg p-4 ${style.text} flex items-start gap-3`}
      >
        <span className="text-lg flex-shrink-0">{style.icon}</span>
        <div className="flex-1">
          <p className="text-sm">{message}</p>
        </div>
        {onDismiss && (
          <button
            onClick={onDismiss}
            className="flex-shrink-0 hover:opacity-70 transition-opacity"
          >
            ✕
          </button>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default ErrorAlert;
