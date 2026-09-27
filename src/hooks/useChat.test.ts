import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { Message } from "@/domain/entities/Message";
import { MessageRole } from "@/domain/entities/MessageRole";
import { sendConversationUseCase } from "@/application/container";

import { useChat } from "./useChat";

vi.mock("@/application/container", () => ({
    sendConversationUseCase: {
        execute: vi.fn(),
    },
}));

describe("useChat", () => {
    beforeEach(() => {
        vi.clearAllMocks();

        vi.mocked(sendConversationUseCase.execute).mockResolvedValue(
            new Message(
                "assistant-1",
                MessageRole.ASSISTANT,
                "Resposta do assistant",
            ),
        );
    });

    it("should initialize with the main conversation selected", () => {
        const { result } = renderHook(() => useChat());

        expect(result.current.currentConversationId).toBe("1");
        expect(result.current.conversations).toEqual([
            {
                id: "1",
                title: "Conversa principal",
            },
        ]);
        expect(result.current.messages).toEqual([]);
        expect(result.current.isLoading).toBe(false);
        expect(result.current.error).toBeNull();
    });

    it("should create and select a new conversation", () => {
        const { result } = renderHook(() => useChat());

        act(() => {
            result.current.createConversation("2");
        });

        expect(result.current.currentConversationId).toBe("2");
        expect(result.current.conversations).toEqual([
            {
                id: "2",
                title: "Conversa 2",
            },
            {
                id: "1",
                title: "Conversa principal",
            },
        ]);
        expect(result.current.messages).toEqual([]);
    });

    it("should select an existing conversation", () => {
        const { result } = renderHook(() => useChat());

        act(() => {
            result.current.createConversation("2");
            result.current.selectConversation("1");
        });

        expect(result.current.currentConversationId).toBe("1");
        expect(result.current.messages).toEqual([]);
    });

    it("should delete a conversation and select the first remaining conversation", () => {
        const { result } = renderHook(() => useChat());

        act(() => {
            result.current.createConversation("2");
            result.current.createConversation("3");
        });

        act(() => {
            result.current.deleteConversation("3");
        });

        expect(result.current.conversations).toEqual([
            {
                id: "2",
                title: "Conversa 2",
            },
            {
                id: "1",
                title: "Conversa principal",
            },
        ]);
        expect(result.current.currentConversationId).toBe("2");
    });

    it("should clear all conversations", () => {
        const { result } = renderHook(() => useChat());

        act(() => {
            result.current.createConversation("2");
        });

        act(() => {
            result.current.clearConversations();
        });

        expect(result.current.conversations).toEqual([]);
        expect(result.current.currentConversationId).toBe("");
        expect(result.current.messages).toEqual([]);
        expect(result.current.error).toBeNull();
    });

    it("should send a user message and append the assistant response", async () => {
        const { result } = renderHook(() => useChat());

        await act(async () => {
            await result.current.sendMessage("Olá");
        });

        expect(sendConversationUseCase.execute).toHaveBeenCalledTimes(1);
        expect(result.current.messages).toHaveLength(2);
        expect(result.current.messages[0].role).toBe(
            MessageRole.USER,
        );
        expect(result.current.messages[0].content).toBe("Olá");
        expect(result.current.messages[1].role).toBe(
            MessageRole.ASSISTANT,
        );
        expect(result.current.messages[1].content).toBe(
            "Resposta do assistant",
        );
        expect(result.current.isLoading).toBe(false);
        expect(result.current.error).toBeNull();
    });

    it("should keep conversation histories isolated", async () => {
        const { result } = renderHook(() => useChat());

        await act(async () => {
            await result.current.sendMessage("Mensagem principal");
        });

        act(() => {
            result.current.createConversation("2");
        });

        expect(result.current.messages).toEqual([]);

        await act(async () => {
            await result.current.sendMessage("Mensagem secundária");
        });

        expect(result.current.messages).toHaveLength(2);
        expect(result.current.messages[0].content).toBe(
            "Mensagem secundária",
        );

        act(() => {
            result.current.selectConversation("1");
        });

        expect(result.current.messages).toHaveLength(2);
        expect(result.current.messages[0].content).toBe(
            "Mensagem principal",
        );
    });

    it("should expose an error when sending the message fails", async () => {
        vi.mocked(sendConversationUseCase.execute).mockRejectedValueOnce(
            new Error("Server error"),
        );

        const { result } = renderHook(() => useChat());

        await act(async () => {
            await result.current.sendMessage("Olá");
        });

        expect(result.current.error).toBe(
            "Unable to communicate with the assistant.",
        );
        expect(result.current.isLoading).toBe(false);
    });
});