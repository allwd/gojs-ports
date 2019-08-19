import { ContainerModule, interfaces, decorate, injectable } from 'inversify';
import { componentSymbols } from './Symbols';
import * as go from 'gojs';
import Diagram from '../gojs/Diagram';
import NodeTemplateProvider from '../gojs/templateProviders/NodeTemplateProvider';
import Container from '../helpers/Container';

const componentsModule = new ContainerModule((bind: interfaces.Bind) => {
    decorate(injectable(), go.Diagram);

    bind(componentSymbols.diagram).to(Diagram);

    bind<interfaces.Factory<Diagram>>(componentSymbols.diagramFactory)
        .toAutoFactory(componentSymbols.diagram);

    bind<Container>(componentSymbols.container).to(Container).inSingletonScope();

    
    bind<NodeTemplateProvider>(componentSymbols.nodeTemplateProvider).to(NodeTemplateProvider);
});

export default componentsModule;
