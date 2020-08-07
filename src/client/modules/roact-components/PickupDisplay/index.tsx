import Framework from "Framework";
import * as Roact from "@rbxts/roact";
import Net from "@rbxts/net";

import Inputs from "client/modules/Inputs";
import Action from "../Action";

const pickUpEvent = new Net.ClientEvent("PickUp");

interface PickupDisplayProps {}

interface PickupDisplayState {
	object?: BasePart;
}

export default class PickupDisplay extends Roact.PureComponent<PickupDisplayProps, PickupDisplayState> {
	constructor(props: PickupDisplayProps) {
		super(props);
	}

	render() {
		return (
			<Action
				name={"Pick Up"}
				input={Inputs.light.E}
				object={this.state.object}
				func={() => {
					const object = this.state.object;
					if (object && object.Parent && object.Parent.IsA("Model")) {
						pickUpEvent.SendToServer(object.Parent);
					} else {
						pickUpEvent.SendToServer(undefined);
					}
				}}
			/>
		);
	}

	didMount() {
		Framework.ClientSystems.PickupDisplaySystem.closestObjectChanged.Connect((model) => {
			if (model) {
				this.setState({
					object: model.PrimaryPart,
				});
			} else {
				this.setState({
					object: Roact.None,
				});
			}
		});
	}
}
