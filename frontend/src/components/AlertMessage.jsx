function AlertMessage({ type, message, onDismiss }) {
  if (!message) return null;

  return (
    <div className={`alert alert--${type}`} role="alert">
      <span className="alert__message">{message}</span>
      {onDismiss && (
        <button
          type="button"
          className="alert__dismiss"
          onClick={onDismiss}
          aria-label="Dismiss message"
        >
          ×
        </button>
      )}
    </div>
  );
}

export default AlertMessage;
