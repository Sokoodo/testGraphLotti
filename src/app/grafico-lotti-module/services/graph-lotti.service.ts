import { Injectable } from '@angular/core';
import { INodesDefinition, GraphNode, INodesInfo } from '../interfaces/nodes-definitions';

@Injectable({
  providedIn: 'root'
})
export class GraphLottiService {

  constructor() { }

  translateDataToGraph(nodeDefinition: INodesDefinition): GraphNode[] {
    let graphNodes: GraphNode[] = [];
    let tempNode: GraphNode;
    let nodes: Map<string, INodesInfo> = new Map();

    nodeDefinition.nodi.forEach(n => {
      nodes.set(n.id, n)
    })

    let tempToCheck: string[] = Array.from(nodes.keys());

    nodeDefinition.archi.forEach(a => {
      const nodeInfo = nodes.get(a.destinazione)!;
      tempNode = {
        ...nodeInfo,
        parent: [a.origine]
      };
      graphNodes.push(tempNode);
    });

    // graphNodes.forEach(gn => {
    //   if (gn.id == k) {

    //   }
    // });
    // if (flag) {
    //   const nodeInfo = nodes.get(a.destinazione)!;
    //   tempNode = {
    //     ...nodeInfo,
    //     parent: [a.origine]
    //   };
    //   graphNodes.push(tempNode);
    // }

    console.log(graphNodes as unknown as JSON[]);

    return graphNodes;
  }

}
