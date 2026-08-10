import { ChatRequestDto, ChatResponseDto } from "./dto/ChatDto";

/**
 * Infrastructure client for handling HTTP communication with remote Chat API endpoints.
 */
export class ChatApi {
    /** The base network URL for API endpoint requests. */
    private readonly baseUrl: string;

    /**
     * Constructs a new {@link ChatApi} service instance.
     *
     * @param baseUrl The base URL of the backend web service.
     */
    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    /**
     * Transmits a conversation history payload to the API server and retrieves the assistant's reply.
     *
     * @param request The {@link ChatRequestDto} containing the array of message history.
     * @returns A promise resolving to the {@link ChatResponseDto} returned by the server.
     * @throws {Error} If the HTTP response is not successful (`!response.ok`).
     */
    public async sendConversation(
        request: ChatRequestDto
    ): Promise<ChatResponseDto> {
        const response = await fetch(`${this.baseUrl}/chat`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(request),
        });

        if (!response.ok) {
            throw new Error("Unable to communicate with the server.");
        }

        return response.json() as Promise<ChatResponseDto>;
    }
}