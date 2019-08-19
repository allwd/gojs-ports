import * as go from 'gojs';
import { injectable } from 'inversify';
import Diagram from './Diagram';

@injectable()
export default class LinkingTool extends go.LinkingTool {
    findLinkablePort () {
        const test: Diagram = (window as any).diagram
        let node = test.selection.first()
        if (!node) {
            node = test.toolManager.draggingTool.findDraggablePart()
        }

        if (node) {
            const portId = (new Date()).getMilliseconds()
            const newPorts = [...(node.itemArray || []), {
                portId,
                location: go.Spot.stringify(new go.Spot(0, 0, test.lastInput.documentPoint.x-node.actualBounds.x, test.lastInput.documentPoint.y-node.actualBounds.y))
            }]
            
            test.startTransaction("test");
            test.model.setDataProperty(node.data, "itemArray", newPorts)
            test.commitTransaction("test");

            return (node as go.Node).findPort(String(portId))
        }

        return go.LinkingTool.prototype.findLinkablePort.call(this)
    }

    // doMouseUp () {

    // }

    // doNoLink () {

    // }
}
