import { ChoiceNode } from "./choiceNode.js";

export function buildChoiceData(): ChoiceNode[] {
  // Root-level choices
  const choices: ChoiceNode[] = [];
  
  // Table A
  const choiceA: ChoiceNode = new ChoiceNode("TableA", true, "", 0);
  choices.push(choiceA);
  choices.push(new ChoiceNode("id", false, "", 1));
  choices.push(new ChoiceNode("field1", false, "", 2));
  choices.push(new ChoiceNode("field2", false, "", 3));
  
  // Relation B
  const relB: ChoiceNode = new ChoiceNode("fieldB", true, "", 4);
  choices.push(relB);

  // Sub-nodes for fieldB -> TableB
  const choiceB: ChoiceNode = new ChoiceNode("TableB", true, "4", 0);
  relB.addSubNode(choiceB);
  relB.addSubNode(new ChoiceNode("id", false, "4", 1));
  relB.addSubNode(new ChoiceNode("field1", false, "4", 2));

  // fieldC -> TableC
  const relC: ChoiceNode = new ChoiceNode("fieldC", true, "4", 3);
  relB.addSubNode(relC);

  // Sub-nodes for fieldC -> TableC
  relC.addSubNode(new ChoiceNode("TableC", true, "4.3", 0));
  relC.addSubNode(new ChoiceNode("id", false, "4.3", 1));
  relC.addSubNode(new ChoiceNode("field2", false, "4.3", 2));

  // Relation D
  const relD: ChoiceNode = new ChoiceNode("fieldD", true, "", 5);
  choices.push(relD);

  // Sub-nodes for fieldD -> TableD
  const choiceD: ChoiceNode = new ChoiceNode("TableD", true, "5", 0);
  relD.addSubNode(choiceD);
  relD.addSubNode(new ChoiceNode("id", false, "5", 1));
  relD.addSubNode(new ChoiceNode("field1", false, "5", 2));

  return choices;
}
