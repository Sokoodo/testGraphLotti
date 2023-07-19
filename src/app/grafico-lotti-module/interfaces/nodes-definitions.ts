export interface INodesDefinition {
  nodi: INodesInfo[],
  archi: ArchInfo[]
}

export interface INodesInfo {
  id: string,
  lottoProdotto: number,
  sottoLottoProdotto: number,
  [index: string]: any
}

export interface ArchInfo {
  origine: string,
  destinazione: string,
  lavorazione: string
}

export const c: string = `{
  "nodi": [
    { "id": "342-0", "lottoProdotto": 342, "sottoLottoProdotto": 0, "altre_informazioni": "bla" },
    { "id": "342-2", "lottoProdotto": 305, "sottoLottoProdotto": 6, "altre_informazioni": "bla" },
    { "id": "304-2", "lottoProdotto": 304, "sottoLottoProdotto": 2, "altre_informazioni": "bla" },
    { "id": "304-4", "lottoProdotto": 304, "sottoLottoProdotto": 4, "altre_informazioni": "bla" }
  ],
  "archi": [
    { "origine": "342-0", "destinazione": "304-2", "lavorazione": "ACC" },
    { "origine": "342-0", "destinazione": "304-4", "lavorazione": "ACC" },
    { "origine": "342-2", "destinazione": "304-4", "lavorazione": "ACC" }
  ]
}`

export const graphData: INodesDefinition = JSON.parse(c);

export interface GraphNode {
  id: string,
  parent?: string[],
  [index: string]: any
}
