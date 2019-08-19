import * as go from 'gojs';
import { injectable } from 'inversify';
import ContainerClass from '../../helpers/Container';
import { container } from '../../../inversify.config';
import { componentSymbols } from '../../IoC/Symbols';

@injectable()
export default class NodeTemplateProvider {
    provideTemplate() {
        return this.createTemplate();
    }

    private createTemplate() {
        const $ = go.GraphObject.make;

        return $(go.Node,
            go.Panel.Spot,
            { 
                linkDisconnected: (oldNode, oldPort, thisPort) => {
                    const Container: ContainerClass = container.get(componentSymbols.container);

                    if (!oldNode || !oldPort || !oldPort.data || !thisPort) {
                        return
                    }

                    const diagram = Container.getDiagram();
                    const  { from, fromPort, to, toPort } = oldPort.data

                    if (!from || !fromPort || !to || !toPort) {
                        return
                    }

                    const fromNode = diagram.findNodeForKey(from)
                    const toNode = diagram.findNodeForKey(to)
                    diagram.toolManager.linkingTool.removePort(fromNode.data, fromPort)
                    diagram.toolManager.linkingTool.removePort(toNode.data, toPort)
                }
            },
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
                    new go.Binding("portId", "portId"),
                    {
                        fromLinkable: true,
                        toLinkable: true,
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
