import { env } from "@/config/env";

/**
 * Service class responsible for handling HTTP communications with the remote chat API endpoints.
 */
export class ChatApi {
    /**
     * Sends a chat message payload to the server via an HTTP POST request.
     *
     * @param message The raw text message to send to the backend service.
     * @returns A promise that resolves to the string response content returned by the server.
     * @throws {Error} If the HTTP response status is not successful (non-2xx).
     */
    public async sendMessage(message: string): Promise<string> {
        const response = await fetch(`${env.apiUrl}/chat`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                message,
            }),
        });

        if (!response.ok) {
            throw new Error("Unable to communicate with the server.");
        }

        const data = await response.json();

        return data.response;
    }
}