export class ChoiceNode {
    constructor(
      public label: string,
      public isGroupNode: boolean = false,
      public indexPath: string = "",
      public fieldIndex: number = 0,
      public isSelected: boolean = false,
      public isHighlighted: boolean = false,
      public subNodes: ChoiceNode[] = []
    ) {}
  
    public addSubNode(node: ChoiceNode): void {
      this.subNodes.push(node);
    }
  }
  