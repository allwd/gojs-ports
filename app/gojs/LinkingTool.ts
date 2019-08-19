import * as go from 'gojs';
import { injectable } from 'inversify';

@injectable()
export default class LinkingTool extends go.LinkingTool {
    findLinkablePort() {
        if (this.diagram.lastInput.control || this.diagram.lastInput.meta) {
            const { x: mouseX, y: mouseY } = this.diagram.lastInput.documentPoint
            const node = this.diagram.findObjectsAt(new go.Point(mouseX, mouseY), ({ part }) => (part && part instanceof go.Node && part.data && part.data.key) ? part : null).first() as go.Node
            const { x, y } = node.actualBounds

            if (node) {
                const existing = node.data.itemArray && (node.data.itemArray as Array<any>).find(object => {
                    const location = go.Spot.parse(object.location)
                    if (location.offsetX === Math.round(mouseX - x) && location.offsetY === Math.round(mouseY - y)) {
                        return true
                    }
                })

                if (existing) {
                    return (node as go.Node).findPort(String(existing.portId))
                }
                
                const portId = (new Date()).getMilliseconds()
                const newPorts = [...(node.itemArray || []), {
                    portId,
                    location: go.Spot.stringify(new go.Spot(0, 0, mouseX - x, mouseY - y))
                }]

                this.diagram.startTransaction("findLinkablePort");
                this.diagram.model.setDataProperty(node.data, "itemArray", newPorts)

                return (node as go.Node).findPort(String(portId))
            }
        }

        return super.findLinkablePort.call(this)
    }

    doMouseUp() {
        const { x: mouseX, y: mouseY } = this.diagram.lastInput.documentPoint
        const node = this.diagram.findObjectsAt(new go.Point(mouseX, mouseY), ({ part }) => (part && part instanceof go.Node && part.data && part.data.key) ? part : null).first() as go.Node
        if (!node) {
            super.doMouseUp.call(this)
            return
        }

        const { x, y } = node.actualBounds
        if (node) {
            const portId = (new Date()).getMilliseconds()
            const newPorts = [...(node.itemArray || []), {
                portId,
                location: go.Spot.stringify(new go.Spot(0, 0, mouseX - x, mouseY - y))
            }]

            this.diagram.model.setDataProperty(node.data, "itemArray", newPorts)
            this.insertLink(this.temporaryFromNode, this.temporaryFromPort, node, node.findPort(String(portId)))
        }

        return super.doMouseUp.call(this)
    }

    doNoLink() {
        this.removePort(this.originalFromNode.data, this.originalFromPort.portId)
    }

    removePort = (data, portId) => {
        this.diagram.model.setDataProperty(data, "itemArray", data.itemArray.filter(node => portId !== node.portId))
    }

    doDeactivate() {
        this.diagram.commitTransaction("findLinkablePort");
        super.doDeactivate();
    }
}
