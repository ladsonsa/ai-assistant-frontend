import { describe, it, expect, vi, beforeEach } from "vitest";
import { HttpChatRepository } from "./HttpChatRepository";
import { ChatApi } from "../api/ChatApi";
import { Message } from "@/domain/entities/Message";
import { MessageRole } from "@/domain/entities/MessageRole";

/**
 * Unit test suite for the {@link HttpChatRepository} class.
 * Verifies payload mapping, interactions with {@link ChatApi}, domain entity creation, and error propagation.
 */
describe("HttpChatRepository", () => {
  let mockChatApi: ChatApi;
  let repository: HttpChatRepository;

  beforeEach(() => {
    mockChatApi = {
      sendConversation: vi.fn(),
    } as unknown as ChatApi;

    repository = new HttpChatRepository(mockChatApi);
  });

  /**
   * Tests that domain {@link Message} entities are correctly mapped into DTO format,
   * passed to the {@link ChatApi.sendConversation} method, and that the API response
   * is properly mapped back into an assistant {@link Message} domain entity.
   */
  it("should send formatted history to ChatApi and return a valid Message domain entity", async () => {
    const userMessage = new Message(
      "msg-1",
      MessageRole.USER,
      "Olá, quanto é 2 + 2?",
      {}
    );

    vi.spyOn(mockChatApi, "sendConversation").mockResolvedValueOnce({
      content: "O resultado de 2 + 2 é 4.",
      metadata: {},
    });

    const response = await repository.sendConversation([userMessage]);

    expect(mockChatApi.sendConversation).toHaveBeenCalledTimes(1);
    expect(mockChatApi.sendConversation).toHaveBeenCalledWith({
      history: [
        {
          role: "user",
          content: "Olá, quanto é 2 + 2?",
          metadata: {},
        },
      ],
    });

    expect(response).toBeInstanceOf(Message);
    expect(response.role).toBe(MessageRole.ASSISTANT);
    expect(response.content).toBe("O resultado de 2 + 2 é 4.");
    expect(response.id).toBeDefined();
  });

  /**
   * Tests that any errors or network exceptions thrown by {@link ChatApi.sendConversation}
   * are correctly rethrown/propagated up through the repository layer.
   */
  it("should propagate errors if ChatApi fails", async () => {
    const userMessage = new Message("msg-1", MessageRole.USER, "Oi", {});
    
    vi.spyOn(mockChatApi, "sendConversation").mockRejectedValueOnce(
      new Error("Network Error")
    );

    await expect(repository.sendConversation([userMessage])).rejects.toThrow(
      "Network Error"
    );
  });
});