import React, { useState } from "react";
import { ChoiceNode } from "./choiceNode.js";
import { clearHighlight, highlightNodes } from "./search.js";

interface ChoiceDropdownProps {
  data: ChoiceNode[];
}

/**
 * Renders a multi-column hierarchical picker with:
 * - No expand icon if node.fieldIndex === 0 (the “top” table node in each column)
 * - Expandable “relationship” nodes (isGroupNode && fieldIndex != 0)
 * - “>” (collapsed) or “<” (expanded) icon on the *right* side of the label
 * - Highlight only the matched node + ancestors on search
 */
export const ChoiceDropdown: React.FC<ChoiceDropdownProps> = ({ data }) => {
  const [choices, setChoices] = useState<ChoiceNode[]>(data);
  const [searchTerm, setSearchTerm] = useState("");
  // Which indexPaths are expanded
  const [expandedPaths, setExpandedPaths] = useState<Set<string>>(new Set());

  // --- SEARCH ---
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);

    clearHighlight(choices);
    if (term.trim()) {
      highlightNodes(choices, term.trim());
    }
    setChoices([...choices]);
  };

  // Expand/collapse
  const toggleExpand = (nodePath: string) => {
    const newPaths = new Set(expandedPaths);
    if (newPaths.has(nodePath)) {
      newPaths.delete(nodePath);
    } else {
      newPaths.add(nodePath);
    }
    setExpandedPaths(newPaths);
  };

  /**
   * Recursively render a column of nodes, then if expanded,
   * render another column to the right for its subNodes.
   */
  const renderColumn = (
    nodes: ChoiceNode[],
    columnIndex: number,
    parentPath: string
  ): JSX.Element => {
    return (
      <div
        style={{
          display: "inline-block",
          verticalAlign: "top",
          marginRight: "1rem",
          border: "1px solid #ccc",
          padding: "1rem",
        }}
      >
        {nodes.map((node) => {
          const currentPath = parentPath
            ? `${parentPath}.${node.fieldIndex}`
            : `${node.fieldIndex}`;
          const isExpanded = expandedPaths.has(currentPath);

          // Is this the top table node in the column? (fieldIndex === 0)
          const isTopNode = (node.fieldIndex === 0);

          // Decide if we can expand/collapse on click
          const canExpand = node.isGroupNode && !isTopNode;

          // Choose the arrow icon (on the right)
          let arrow = "";
          if (canExpand) {
            arrow = isExpanded ? "<" : ">";
          }

          return (
            <React.Fragment key={currentPath}>
              <div
                style={{
                  backgroundColor: node.isHighlighted ? "#FFFF99" : "transparent",
                  marginBottom: "0.5rem",
                  cursor: canExpand ? "pointer" : "default",
                  whiteSpace: "nowrap",
                }}
                onClick={() => {
                  if (canExpand) {
                    toggleExpand(currentPath);
                  }
                }}
              >
                <b>[{node.label}]</b>
                {arrow && (
                  <span style={{ marginLeft: "4px" }}>
                    {arrow}
                  </span>
                )}
              </div>

              {isExpanded && node.subNodes.length > 0 && (
                renderColumn(node.subNodes, columnIndex + 1, currentPath)
              )}
            </React.Fragment>
          );
        })}
      </div>
    );
  };

  return (
    <div style={{ marginTop: "1rem" }}>
      {/* Remove the second title. Let the parent App or page set <h1> if desired. */}
      <div style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          placeholder="Search fields..."
          value={searchTerm}
          onChange={handleSearchChange}
          style={{ padding: "0.5rem", width: "200px" }}
        />
      </div>

      {/* Render the first/top column */}
      {renderColumn(choices, 0, "")}
    </div>
  );
};
