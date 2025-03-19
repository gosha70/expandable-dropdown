// src/search.ts
import { ChoiceNode } from "./choiceNode.js";

/**
 * Clears isHighlighted on all nodes (recursively).
 */
export function clearHighlight(nodes: ChoiceNode[]): void {
  nodes.forEach((node) => {
    node.isHighlighted = false;
    if (node.subNodes && node.subNodes.length > 0) {
      clearHighlight(node.subNodes);
    }
  });
}

/**
 * Highlights any node whose label includes `term`, as well as its parents.
 */
export function highlightNodes(nodes: ChoiceNode[], term: string): void {
  nodes.forEach((node) => {
    // Recurse first, so we know if any child is highlighted
    if (node.subNodes && node.subNodes.length > 0) {
      highlightNodes(node.subNodes, term);
    }

    const match = node.label.toLowerCase().includes(term.toLowerCase());
    // If this node or any child is highlighted, mark this node as well
    const childHighlighted = node.subNodes.some((sub) => sub.isHighlighted);
    node.isHighlighted = match || childHighlighted;
  });
}
