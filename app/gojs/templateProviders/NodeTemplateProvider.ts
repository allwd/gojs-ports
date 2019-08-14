import * as go from 'gojs';
import { injectable } from 'inversify';

@injectable()
export default class NodeTemplateProvider {
    provideTemplate() {
        return this.createTemplate();
    }

    private createTemplate() {
        const $ = go.GraphObject.make;

        return $(go.Node,
            go.Panel.Spot,
            $(go.Shape, 'RoundedRectangle', 
                {
                    desiredSize: new go.Size(100, 100), fill: 'green'
                },
                new go.Binding('fill', 'fill')
            )
        );
    }
}
