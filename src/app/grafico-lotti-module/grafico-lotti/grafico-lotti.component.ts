import { ChangeDetectorRef, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { DiagramComponent, SnapSettingsModel, LayoutModel, NodeModel, Diagram, ConnectorModel, DecoratorModel, StrokeStyleModel, DiagramTools, SnapConstraints, ComplexHierarchicalTree, DataBinding, DataSourceModel, DiagramConstraints, NodeConstraints, PathAnnotationModel, PathAnnotation } from '@syncfusion/ej2-angular-diagrams';
import { GraphLottiService } from '../services/graph-lotti.service';
import { ArchInfo, GraphNode, graphData as graphDataBknd } from '../interfaces/nodes-definitions';
import { DataManager, Query } from '@syncfusion/ej2-data';
import { LottiBkndService } from '../services/lotti-bknd.service';
Diagram.Inject(DataBinding, ComplexHierarchicalTree);
export interface DataInfo {
  [key: string]: string;
}

@Component({
  selector: 'app-grafico-lotti',
  templateUrl: './grafico-lotti.component.html',
  styleUrls: ['./grafico-lotti.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GraficoLottiComponent implements OnInit {

  @ViewChild('diagram')
  public diagram?: DiagramComponent;
  private graphData!: GraphNode[];
  public items?: DataManager;
  public dataSourceSettings?: DataSourceModel;
  public codiceLotto = '';
  protected showDiagram: boolean = false;

  constructor(protected graphService: GraphLottiService, protected bkndService: LottiBkndService, protected cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.graphData = this.graphService.translateDataToGraph(graphDataBknd);
    this.items = new DataManager(this.graphData as any, new Query().take(7));
    this.dataSourceSettings = {
      id: 'id',
      parentId: 'parent',
      dataSource: this.items,
      //binds the external data with node
      doBinding: (nodeModel: NodeModel, data: DataInfo, diagram: Diagram) => {
        /* tslint:disable:no-string-literal */
        nodeModel.style = { fill: "#e7704c", strokeWidth: 1, strokeColor: "#c15433" };
        if (data['id'] == this.codiceLotto) {
          nodeModel.style = { fill: "#667a97", strokeWidth: 1, strokeColor: "#667a97" }
        }
        nodeModel.annotations = [{
          content: data['id'],
          offset: { x: 0.5, y: 0.5 }, verticalAlignment: 'Center', horizontalAlignment: 'Center',
          style: {
            textWrapping: 'Wrap',
          }
        }];
        diagram.connectors.forEach(c => {
          console.log(c)
          c.annotations = [{
            content: c.sourceID
          }]
          c.style = {
            fill: '#667a97'
          }
        })
      },
    }
  }

  searchLotto() {
    this.bkndService.getJsonFromLotto(this.codiceLotto)
    this.showDiagram = true
    this.cd.detectChanges()
  }

  public nodeDefaults(obj: NodeModel): NodeModel {
    obj.width = 55;
    obj.height = 45;
    obj.shape = { type: 'Basic', shape: 'Rectangle', cornerRadius: 7 };
    obj.constraints = NodeConstraints.Default | NodeConstraints.Tooltip

    obj.tooltip!.content = "<div style='margin:auto; width:220px; height:100%; padding: 10px; background-color: rgb(191, 200, 218); border-radius: 15px;'>" +
      "<h3 style='font-weight: 300; font-size: 21px; color: black; padding-bottom: 3px; margin:0px;padding-right: 3px'><u><b>" + (obj.data as DataInfo)['id'] + "</b></u></h3>" +
      "<p style='font-size: 13px;font-family: Arial, Helvetica, sans-serif;padding:7px''>" + "Lotto prodotto: " + (obj.data as DataInfo)['lottoProdotto'] + " <br>"
      + "Sotto Lotto: " + (obj.data as DataInfo)['sottoLottoProdotto'] + "<br>" + "Info aggiuntive: " + (obj.data as DataInfo)['altre_informazioni'] + "</p>" +
      "</div>";
    obj.tooltip!.position = 'TopCenter';
    obj.tooltip!.relativeMode = 'Object';
    obj.tooltip!.animation = {
      open: {
        effect: 'None',
        delay: 100
      },
      close: {
        effect: 'None',
        delay: 100
      }
    }
    return obj;
  }

  public created(): void {
    (this.diagram as DiagramComponent).fitToPage();
  }

  public connDefaults(connector: ConnectorModel): void {
    //console.log(connector)
    connector.type = 'Orthogonal';
    connector.cornerRadius = 7;
    // const tempAnnotations = this.getAnnotation(connector);
    // if (tempAnnotations != undefined) connector.annotations = tempAnnotations;
    ((connector as ConnectorModel).targetDecorator as DecoratorModel).height = 7;
    ((connector as ConnectorModel).targetDecorator as DecoratorModel).width = 7;
    ((connector as ConnectorModel).style as StrokeStyleModel).strokeColor = '#6d6d6d';
  }

  getAnnotation(connector: ConnectorModel): PathAnnotationModel[] | undefined {
    const destinationId = connector.targetID;
    const sourceId = connector.sourceID;
    let archFound: ArchInfo | undefined;
    if (destinationId && sourceId) {
      archFound = this.graphService.findArch(graphDataBknd, sourceId, destinationId)
    }
    if (archFound) {
      return [{
        content: archFound.lavorazione,
        offset: 0.5, verticalAlignment: 'Center', horizontalAlignment: 'Center',
        style: {
          textWrapping: 'Wrap',
        }
      } as PathAnnotationModel]
    }
    console.log(archFound)
    return undefined
  }

  public tool: DiagramTools = DiagramTools.ZoomPan;

  public snapSettings: SnapSettingsModel = { constraints: SnapConstraints.None };

  public layout: LayoutModel = {
    type: 'ComplexHierarchicalTree',
    horizontalSpacing: 40, verticalSpacing: 40, orientation: 'TopToBottom',
    margin: { left: 10, right: 0, top: 50, bottom: 0 }
  }


}
