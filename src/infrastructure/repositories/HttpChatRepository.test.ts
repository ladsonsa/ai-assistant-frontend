import { describe, expect, it, vi } from "vitest";

import { Message } from "@/domain/entities/Message";
import { MessageRole } from "@/domain/entities/MessageRole";

import { ChatApi } from "../api/ChatApi";
import { HttpChatRepository } from "./HttpChatRepository";

describe("HttpChatRepository", () => {
    it("should map the conversation history to the API request DTO", async () => {
        const chatApi = {
            sendConversation: vi.fn().mockResolvedValue({
                content: "Resposta",
                metadata: {
                    source: "test",
                },
            }),
        } as unknown as ChatApi;

        const repository = new HttpChatRepository(chatApi);

        const history = [
            new Message(
                "user-1",
                MessageRole.USER,
                "Quanto é 2 + 2?",
                {
                    language: "pt-BR",
                },
            ),
        ];

        await repository.sendConversation(history);

        expect(chatApi.sendConversation).toHaveBeenCalledWith({
            history: [
                {
                    role: "user",
                    content: "Quanto é 2 + 2?",
                    metadata: {
                        language: "pt-BR",
                    },
                },
            ],
        });
    });

    it("should map the API response to an assistant Message", async () => {
        const chatApi = {
            sendConversation: vi.fn().mockResolvedValue({
                content: "4",
                metadata: {
                    source: "test",
                },
            }),
        } as unknown as ChatApi;

        const repository = new HttpChatRepository(chatApi);

        const result = await repository.sendConversation([]);

        expect(result).toBeInstanceOf(Message);
        expect(result.role).toBe(MessageRole.ASSISTANT);
        expect(result.content).toBe("4");
        expect(result.metadata).toEqual({
            source: "test",
        });
    });

    it("should propagate API errors", async () => {
        const error = new Error("Server error");

        const chatApi = {
            sendConversation: vi.fn().mockRejectedValue(error),
        } as unknown as ChatApi;

        const repository = new HttpChatRepository(chatApi);

        await expect(
            repository.sendConversation([]),
        ).rejects.toThrow("Server error");
    });
});