import React from "react";
import Btn from "../../Shared/ui/Btn";
import Icon from "../../Shared/icons/Icon";

export const Card = ({ children, style }) => (
  <div
    style={{
      padding: 28,
      background: "var(--paper)",
      border: "1px solid var(--line)",
      borderRadius: 14,
      ...style,
    }}
  >
    {children}
  </div>
);

export const Field = ({ label, hint, children }) => (
  <div style={{ marginBottom: 18 }}>
    <label
      style={{
        display: "block",
        fontFamily: "var(--font-mono)",
        fontSize: 10.5,
        color: "var(--ink-3)",
        textTransform: "uppercase",
        letterSpacing: "0.1em",
        marginBottom: 8,
      }}
    >
      {label}
    </label>
    {children}
    {hint && (
      <div
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 10.5,
          color: "var(--ink-3)",
          marginTop: 6,
        }}
      >
        {hint}
      </div>
    )}
  </div>
);

const baseInputStyle = {
  width: "100%",
  padding: "11px 14px",
  border: "1px solid var(--line)",
  borderRadius: 8,
  fontSize: 14,
  background: "var(--sand)",
  color: "var(--ink)",
};

export const Input = ({ style, ...rest }) => (
  <input {...rest} style={{ ...baseInputStyle, ...style }} />
);

export const Textarea = ({ style, ...rest }) => (
  <textarea
    {...rest}
    style={{
      ...baseInputStyle,
      fontFamily: "var(--font-sans)",
      resize: "vertical",
      minHeight: 90,
      ...style,
    }}
  />
);

export const Select = ({ style, children, ...rest }) => (
  <select {...rest} style={{ ...baseInputStyle, ...style }}>
    {children}
  </select>
);

export const SubHead = ({ title, onSave }) => (
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 18,
      paddingBottom: 14,
      borderBottom: "1px solid var(--line-soft)",
    }}
  >
    <div
      style={{
        fontFamily: "var(--font-display)",
        fontSize: 22,
        letterSpacing: "-0.01em",
      }}
    >
      {title}
    </div>
    {onSave && (
      <Btn kind="primary" size="sm" onClick={onSave} icon={<Icon.Check s={13} />}>
        Save changes
      </Btn>
    )}
  </div>
);
