import * as go from 'gojs';
import { injectable, inject, multiInject } from 'inversify';
import { constantsSymbols, componentSymbols } from '../IoC/Symbols';
import NodeTemplateProvider from './templateProviders/NodeTemplateProvider';

@injectable()
export default class Diagram extends go.Diagram {
    constructor( @inject(constantsSymbols.diagramSelector) diagramSelector: string,
        @multiInject(componentSymbols.nodeTemplateProvider) nodeTemplateProvider: Array<NodeTemplateProvider>) {
        super(document.querySelector(diagramSelector) as HTMLDivElement);
        window.onresize = () => {
            this.requestUpdate();
        }
        
        nodeTemplateProvider.forEach(template => this.nodeTemplateMap.add('', template.provideTemplate()));
        this.model = new go.GraphLinksModel([{ key: 1 }, { key: 2, fill: 'red' }])
    }
}
