import { Injectable } from '@angular/core';
import { INodesDefinition, GraphNode, INodesInfo, ArchInfo } from '../interfaces/nodes-definitions';

@Injectable({
  providedIn: 'root'
})
export class GraphLottiService {

  constructor() { }

  public translateDataToGraph(nodeDefinitionBackend: INodesDefinition): GraphNode[] {
    let finalGraph: GraphNode[] = [];
    let nodes: Map<string, INodesInfo> = new Map();
    let graphNodes: Map<string, GraphNode> = new Map();

    nodeDefinitionBackend.nodi.forEach(n => {
      nodes.set(n.id, n);
      if (this.isRoot(n.id, nodeDefinitionBackend.archi)) {
        const nodeInfo = nodes.get(n.id)!;
        const tempNode = {
          ...nodeInfo
        };
        graphNodes.set(n.id, tempNode);
      }
    })

    nodeDefinitionBackend.archi.forEach(a => {
      const nodeInfo = nodes.get(a.destinazione)!;
      if (!graphNodes.has(a.destinazione)) {
        const tempNode = {
          ...nodeInfo,
          parent: [a.origine]
        };
        graphNodes.set(a.destinazione, tempNode);
      } else {
        graphNodes.get(a.destinazione)?.parent?.push(a.origine);
      }
    });

    finalGraph = Array.from(graphNodes.values());
    console.log("final graph ", finalGraph)
    return finalGraph;
  }

  /**
   * Metodo che conferma o meno se un nodo è root (non ha parents)
   *
   * @param nodeId nodo da controllare
   * @param archi dove verificare se ha parents
   * @returns true se il nodo è root
   */
  private isRoot(nodeId: string, archi: ArchInfo[]): boolean {
    if (archi.find(a => a.destinazione == nodeId)) {
      return false
    }
    return true;
  }

}
