import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { ChatApi } from "./ChatApi";
import type { ChatRequestDto } from "./dto/ChatDto";

describe("ChatApi", () => {
  const baseUrl = "http://localhost:8000";
  let chatApi: ChatApi;

  beforeEach(() => {
    chatApi = new ChatApi(baseUrl);
    vi.stubGlobal("fetch", vi.fn());
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should send a POST request with the conversation history", async () => {
    const request: ChatRequestDto = {
      history: [
        {
          role: "user",
          content: "Olá",
          metadata: {},
        },
        {
          role: "assistant",
          content: "Olá! Como posso ajudar?",
          metadata: {},
        },
      ],
    };

    const responseBody = {
      content: "Posso ajudar com isso.",
      metadata: {},
    };

    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: vi.fn().mockResolvedValueOnce(responseBody),
    } as unknown as Response);

    const response = await chatApi.sendConversation(request);

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(`${baseUrl}/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    });

    expect(response).toEqual(responseBody);
  });

  it("should throw an error when the server returns an unsuccessful response", async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: false,
    } as Response);

    await expect(
      chatApi.sendConversation({
        history: [],
      })
    ).rejects.toThrow("Unable to communicate with the server.");
  });
});