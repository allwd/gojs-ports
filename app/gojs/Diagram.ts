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

        this.toolManager.linkingTool = new LinkingTool();

        this.toolManager.doMouseDown = function () {
            const { lastInput, toolManager: { linkingTool } } = this.diagram;
            const control = lastInput.control || lastInput.meta;

            if (!control) {
                console.log("Control and MOUSE !")
            }

            go.ToolManager.prototype.doMouseDown.call(this);
        }



        nodeTemplateProvider.forEach(template => this.nodeTemplateMap.add('', template.provideTemplate()));
        this.model = new go.GraphLinksModel([{ key: 1 }, { key: 2, fill: 'red' }]);
        (this.model as go.GraphLinksModel).linkFromPortIdProperty = 'fromPort';
        (this.model as go.GraphLinksModel).linkToPortIdProperty = 'toPort' 
    }
}
