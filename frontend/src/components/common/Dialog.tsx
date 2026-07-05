import type { ReactNode } from "react";

type Props = {
  open: boolean;
  title: string;
  description: string;
  actionLabel?: string;
  onClose: () => void;
  children?: ReactNode;
};

export default function Dialog({
  open,
  title,
  description,
  actionLabel = "Đã hiểu",
  onClose,
  children,
}: Props) {
  if (!open) return null;

  return (
    <div className="dialog-backdrop" role="presentation" onClick={onClose}>
      <div
        className="dialog-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="dialog-title"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 id="dialog-title">{title}</h3>
        <p className="muted">{description}</p>
        {children}
        <div className="dialog-actions">
          <button className="btn btn-primary" onClick={onClose} type="button">
            {actionLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
