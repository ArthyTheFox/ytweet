import type { Socket } from "socket.io-client";
import { io } from "socket.io-client";

class SocketIOService {
	socket: Socket;
	constructor() {
		this.socket = io(import.meta.env.VITE_APP_SOCKET_URL, {
			transports: ["websocket"],
		});

		this.socket.on("reconnect_attempt", () => {
			this.socket.io.opts.transports = ["polling", "websocket"];
		});
	}
}

// create an instance/connection here
export const socket = new SocketIOService().socket;
