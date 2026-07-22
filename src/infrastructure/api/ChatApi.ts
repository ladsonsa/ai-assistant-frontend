import { env } from "@/config/env";

export class ChatApi {
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