// src/App.tsx
import React, { useEffect, useState } from "react";
import { ChoiceDropdown } from "./ChoiceDropdown.js";
import { ChoiceNode } from "./choiceNode.js";

export const App: React.FC = () => {
  const [choices, setChoices] = useState<ChoiceNode[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/choices")
      .then((res) => res.json())
      .then((data: ChoiceNode[]) => {
        setChoices(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching /api/choices:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading…</div>;
  }

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Expandable Grouped Dropdown Component</h1>
      <ChoiceDropdown data={choices} />
    </div>
  );
};
