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
            ),
            new go.Binding("itemArray", "itemArray"),
            {
                name: "Ports",
                itemTemplate:
                $(go.Panel, go.Panel.Spot,
                    new go.Binding("alignment", "location", go.Spot.parse).makeTwoWay(go.Spot.stringify),
                    new go.Binding("name", "portId"),
                    new go.Binding("portId", "portId"),
                    {
                        fromLinkable: true,
                        cursor: "pointer",
                    },
                    $(go.Shape, 'RoundedRectangle',
                        {
                            position: new go.Point(15, 15),
                            strokeWidth: 1,
                            desiredSize: new go.Size(5, 5),
                        },
                    )
                )
            }
        );
    }
}
