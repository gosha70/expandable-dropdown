import React, { useState } from "react";
import { ChoiceNode } from "./choiceNode.js";
import { clearHighlight, highlightNodes } from "./search.js";

interface ChoiceDropdownProps {
  data: ChoiceNode[];
}

interface CardState {
  nodes: ChoiceNode[];
  top: number;
}

export const ChoiceDropdown: React.FC<ChoiceDropdownProps> = ({ data }) => {
  const CARD_WIDTH = 240;
  const CARD_GAP = 16;

  const [choices, setChoices] = useState<ChoiceNode[]>(data);
  const [searchTerm, setSearchTerm] = useState("");
  const [cards, setCards] = useState<CardState[]>([{ nodes: data, top: 0 }]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    clearHighlight(choices);
    if (term.trim()) highlightNodes(choices, term.trim());
    setChoices([...choices]);
    setCards([{ nodes: choices, top: 0 }]);
  };

  const handleToggle = (
    node: ChoiceNode,
    cardIndex: number,
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    const newCards = cards.slice(0, cardIndex + 1);
    const isSame = cards[cardIndex + 1]?.nodes === node.subNodes;
    if (isSame) {
      setCards(newCards);
    } else if (node.subNodes.length > 0) {
      // Calculate absolute top by adding parent card's top + clicked row offset
      const parentTop = cards[cardIndex].top;
      const clickedOffset = (event.currentTarget as HTMLElement).offsetTop;
      newCards.push({ nodes: node.subNodes, top: parentTop + clickedOffset });
      setCards(newCards);
    }
  };

  return (
    <div style={{ position: 'relative', minHeight: 300, padding: '1rem' }}>
      <input
        type="text"
        placeholder="Search fields..."
        value={searchTerm}
        onChange={handleSearchChange}
        style={{ padding: '0.5rem', width: '400px', marginBottom: '1rem' }}
      />

      <div style={{ position: 'relative' }}>
        {cards.map((card, i) => {
          const header = card.nodes.find((n) => n.fieldIndex === 0);
          const items = card.nodes.filter((n) => n.fieldIndex !== 0);
          const left = i * (CARD_WIDTH + CARD_GAP);

          return (
            <div
              key={i}
              style={{
                position: 'absolute',
                top: card.top,
                left,
                width: CARD_WIDTH,
                border: '1px solid #ccc',
                borderRadius: 4,
                padding: '1rem',
                background: '#fff',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
              }}
            >
              {header && <div style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>[{header.label}]</div>}

              {items.map((node) => {
                const isExpanded = cards[i + 1]?.nodes === node.subNodes;
                const canExpand = node.isGroupNode;
                const arrow = canExpand ? (isExpanded ? '<' : '>') : '';

                return (
                  <div
                    key={`${i}-${node.fieldIndex}`}
                    onClick={(e) => canExpand && handleToggle(node, i, e)}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      backgroundColor: node.isHighlighted ? '#FFFF99' : 'transparent',
                      cursor: canExpand ? 'pointer' : 'default',
                      padding: '4px 0'
                    }}
                  >
                    <span>{node.label}</span>
                    {arrow && <span>{arrow}</span>}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};
