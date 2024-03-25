import React, { ReactElement } from "react";

interface ButtonProps {
  text: string;
  Icon: React.ComponentType<{ className?: string; size?: number }>;
  className?: string;
}

function Button({ text, Icon, className = "" }: ButtonProps): ReactElement {
  return (
    <button
      type="button"
      className={`border px-4 py-2 rounded-md flex items-center gap-2 hover:border-gray-300 text-nowrap ${className}`}
    >
      <Icon className="text-primary" size={18} />
      {text}
    </button>
  );
}

Button.defaultProps = {
  className: "",
};

export default Button;
