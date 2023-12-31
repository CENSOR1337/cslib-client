import { Vector3 } from "@cfx/client";
import * as natives from "@cfx/natives";
import * as cfx from "@cfx/client";

export class Player {
	public static player: Player;

	constructor(public readonly handle: number) {}

	public static get local(): Player {
		if (!Player.player) {
			Player.player = new Player(PlayerId());
		}
		return Player.player;
	}

	public static fromPedHandle(ped: number): Player {
		return new Player(natives.networkGetPlayerIndexFromPed(ped));
	}

	public static fromServerId(serverId: number): Player {
		return new Player(GetPlayerFromServerId(serverId));
	}

	public static get all(): Player[] {
		const players: Player[] = [];
		const activePlayers = cfx.getActivePlayers();
		for (let i = 0; i < activePlayers.length; i++) {
			players.push(new Player(activePlayers[i]));
		}
		return players;
	}

	public get isDead(): boolean {
		return natives.isPlayerDead(this.handle);
	}

	public get ped(): number {
		return natives.getPlayerPed(this.handle);
	}

	public get pos(): Vector3 {
		return natives.getEntityCoords(this.ped, true);
	}

	public get rot(): Vector3 {
		return natives.getEntityRotation(this.ped, 0);
	}
}
