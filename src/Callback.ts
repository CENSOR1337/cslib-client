import { randomUUID } from "./utils/uuid";
import { Event } from "@cfx/client";
import { Callback as CallbackShared } from "@cfx-cslib/shared";

export class Callback extends CallbackShared {
	public static emit<T>(eventName: string, ...args: any[]): Promise<T> {
		const cbId = randomUUID();
		const promise = new Promise<T>((resolve, reject) => {
			Event.onServer(cbId, (data: any) => {
				resolve(data as T);
			});
		});
		Event.emitServer(`${this.serverNamespace}:${eventName}`, cbId, ...args);
		return promise;
	}

	public static register(eventName: string, handler: (...args: any[]) => void): Event {
		return Event.onServer(`${this.clientNamespace}:${eventName}`, (cbId: string, ...args: any[]) => {
			Event.emitServer(cbId, handler(...args));
		});
	}
}
