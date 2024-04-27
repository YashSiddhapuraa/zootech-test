import React from "react";

const JsonViewer = ({ data, name = "root", level = 1 }) => {
  const indent = " ".repeat(level * 4);
  const isArray = Array.isArray(data);

  return (
    <div>
      <span>{name}:</span>
      {isArray ? "[" : "{"}
      <ul>
        {Object.entries(data).map(([key, value]) => (
          <li key={key}>
            {indent}
            {isArray ? null : <span>"{key}": </span>}
            {typeof value === "object" ? (
              <JsonViewer data={value} name={key} level={level + 1} />
            ) : (
              <span>{typeof value === "string" ? `"${value}"` : value}</span>
            )}
          </li>
        ))}
      </ul>
      {indent}
      {isArray ? "]" : "}"}
    </div>
  );
};

export default JsonViewer;