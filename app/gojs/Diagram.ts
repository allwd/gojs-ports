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
        (window as any).diagram = this
        this.undoManager.isEnabled = true;

        this.toolManager.linkingTool = new LinkingTool();
        // this.toolManager.doMouseDown = function () {
        //     (window as any).diagram.startTransaction("findLinkablePort");
        //     const { lastInput, toolManager: { linkingTool } } = this.diagram;
        //     const control = lastInput.control || lastInput.meta;

        //     if (control) {
        //         console.log("Control and MOUSE !")
        //         this.too
        //         // return
        //     }

        //     go.ToolManager.prototype.doMouseDown.call(this);
        // }

        // this.toolManager.doMouseUp = function() {
        //     go.ToolManager.prototype.doMouseUp.call(this);
        //     (window as any).diagram.commitTransaction("findLinkablePort");
        // }

        this.linkTemplate = go.GraphObject.make(go.Link,
            { routing: go.Link.AvoidsNodes },  // link route should avoid nodes
            go.GraphObject.make(go.Shape),
            go.GraphObject.make(go.Shape, { toArrow: "Standard" })
          );



        nodeTemplateProvider.forEach(template => this.nodeTemplateMap.add('', template.provideTemplate()));
        this.model = new go.GraphLinksModel([{ key: 1 }, { key: 2, fill: 'red' }]);
        (this.model as go.GraphLinksModel).linkFromPortIdProperty = 'fromPort';
        (this.model as go.GraphLinksModel).linkToPortIdProperty = 'toPort' 
    }
}
