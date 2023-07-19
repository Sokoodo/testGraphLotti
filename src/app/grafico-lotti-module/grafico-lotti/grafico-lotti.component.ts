import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { DiagramComponent, SnapSettingsModel, LayoutModel, NodeModel, Diagram, ConnectorModel, DecoratorModel, StrokeStyleModel, DiagramTools, SnapConstraints, ComplexHierarchicalTree, DataBinding } from '@syncfusion/ej2-angular-diagrams';
import { DataManager } from '@syncfusion/ej2-data';
import { GraphLottiService } from '../services/graph-lotti.service';
import { GraphNode, graphData } from '../interfaces/nodes-definitions';
import Data from '../diagram-data.json';

Diagram.Inject(DataBinding, ComplexHierarchicalTree);

export interface DataInfo {
  [key: string]: string;
}

@Component({
  selector: 'app-grafico-lotti',
  templateUrl: './grafico-lotti.component.html',
  styleUrls: ['./grafico-lotti.component.scss']
})
export class GraficoLottiComponent implements OnInit {

  @ViewChild('diagram')
  public diagram?: DiagramComponent;
  private graphData!: GraphNode[];
  private graphDataJson!: string;

  constructor(protected graphService: GraphLottiService, protected cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.graphData = this.graphService.translateDataToGraph(graphData);
    this.graphDataJson = this.graphService.makeJson(this.graphData);
    console.log(this.graphDataJson)
  }

  public nodeDefaults(obj: NodeModel): NodeModel {
    obj.width = 40;
    obj.height = 40;
    obj.shape = { type: 'Basic', shape: 'Rectangle', cornerRadius: 7 };
    return obj;
  };

  public data: Object = {
    id: 'id',
    parentId: 'parent',
    dataSource: new DataManager((this.graphDataJson as any)),
      //binds the external data with node
      doBinding: (nodeModel: NodeModel, data: DataInfo, diagram: Diagram) => {
        /* tslint:disable:no-string-literal */
        nodeModel.style = { fill: "#e7704c", strokeWidth: 1, strokeColor: "#c15433" };
      }
  };

  public created(): void {
    (this.diagram as DiagramComponent).fitToPage();
    console.log(this.data)
  };

  public connDefaults(connector: ConnectorModel): void {
    connector.type = 'Orthogonal';
    connector.cornerRadius = 7;
    ((connector as ConnectorModel).targetDecorator as DecoratorModel).height = 7;
    ((connector as ConnectorModel).targetDecorator as DecoratorModel).width = 7;
    ((connector as ConnectorModel).style as StrokeStyleModel).strokeColor = '#6d6d6d';
  };

  public tool: DiagramTools = DiagramTools.ZoomPan;

  public snapSettings: SnapSettingsModel = { constraints: SnapConstraints.None };

  public layout: LayoutModel = {
    type: 'ComplexHierarchicalTree',
    horizontalSpacing: 40, verticalSpacing: 40, orientation: 'TopToBottom',
    margin: { left: 10, right: 0, top: 50, bottom: 0 }
  };


}
