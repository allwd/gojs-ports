import { container } from '../../inversify.config';
import { componentSymbols } from '../IoC/Symbols';
import { injectable } from 'inversify';

@injectable()
class Container {
    private diagram;

    init () {
        const diagramFactory = container.get<Function>(componentSymbols.diagramFactory);
        this.diagram = diagramFactory();
        this.diagram.requestUpdate();
    }

    getDiagram() {
        return this.diagram;
    }
}

export default Container;