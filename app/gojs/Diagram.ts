import * as go from 'gojs';
import { injectable, inject, multiInject } from 'inversify';
import { constantsSymbols, componentSymbols } from '../IoC/Symbols';
import NodeTemplateProvider from './templateProviders/NodeTemplateProvider';
import LinkingTool from './LinkingTool';

@injectable()
export default class Diagram extends go.Diagram {
    constructor( @inject(constantsSymbols.diagramSelector) diagramSelector: string,
        @multiInject(componentSymbols.nodeTemplateProvider) nodeTemplateProvider: Array<NodeTemplateProvider>) {
        super(document.querySelector(diagramSelector) as HTMLDivElement);
        window.onresize = () => {
            this.requestUpdate();
        };
        this.undoManager.isEnabled = true;
        this.toolManager.linkingTool = new LinkingTool();

        // this.linkTemplate = go.GraphObject.make(go.Link,
        //     { routing: go.Link.AvoidsNodes },
        //     go.GraphObject.make(go.Shape),
        //     go.GraphObject.make(go.Shape, { toArrow: "Standard" })
        //   );

        nodeTemplateProvider.forEach(template => this.nodeTemplateMap.add('', template.provideTemplate()));

        this.model = new go.GraphLinksModel([{ key: 1 }, { key: 2, fill: 'red' }]);
        (this.model as go.GraphLinksModel).linkFromPortIdProperty = 'fromPort';
        (this.model as go.GraphLinksModel).linkToPortIdProperty = 'toPort' 
    }
}
