import { env } from "@/config/env";
import { ChatRequest } from "./dto/ChatRequest";
import { ChatResponse } from "./dto/ChatResponse";

/**
 * Service class responsible for managing HTTP network operations with the chat API endpoint.
 */
export class ChatApi {
    /**
     * Sends a full conversation payload to the remote backend service via an HTTP POST request.
     *
     * @param request The data transfer object containing the conversation history payload.
     * @returns A promise that resolves to the parsed ChatResponse object from the server.
     * @throws {Error} If the HTTP response status indicates a failure (non-2xx status code).
     */
    public async sendConversation(
        request: ChatRequest,
    ): Promise<ChatResponse> {
        const response = await fetch(`${env.apiUrl}/chat`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(request),
        });

        if (!response.ok) {
            throw new Error("Unable to communicate with the server.");
        }

        return response.json() as Promise<ChatResponse>;
    }
}