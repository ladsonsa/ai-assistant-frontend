import { fireEvent, render, screen } from "@testing-library/react";
import {
    beforeAll,
    beforeEach,
    describe,
    expect,
    it,
    vi,
} from "vitest";

import { Chat } from "./Chat";

beforeAll(() => {
    Element.prototype.scrollIntoView = vi.fn();
});

const mockSendMessage = vi.fn();
const mockCreateConversation = vi.fn();
const mockSelectConversation = vi.fn();
const mockDeleteConversation = vi.fn();
const mockClearConversations = vi.fn();
const mockToggleTheme = vi.fn();

const mockChatState = {
    conversations: [
        {
            id: "1",
            title: "Conversa principal",
        },
    ],
    messages: [],
    currentConversationId: "1",
    isLoading: false,
    error: null as string | null,
    sendMessage: mockSendMessage,
    createConversation: mockCreateConversation,
    selectConversation: mockSelectConversation,
    deleteConversation: mockDeleteConversation,
    clearConversations: mockClearConversations,
};

vi.mock("@/hooks/useChat", () => ({
    useChat: () => mockChatState,
}));

vi.mock("@/hooks/useTheme", () => ({
    useTheme: () => ({
        theme: "dark",
        toggleTheme: mockToggleTheme,
    }),
}));

describe("Chat", () => {
    beforeEach(() => {
        vi.clearAllMocks();

        mockChatState.conversations = [
            {
                id: "1",
                title: "Conversa principal",
            },
        ];
        mockChatState.messages = [];
        mockChatState.currentConversationId = "1";
        mockChatState.isLoading = false;
        mockChatState.error = null;
    });

    it("should wire the message input to useChat", () => {
        render(<Chat />);

        const input = screen.getByPlaceholderText(
            "Digite sua mensagem...",
        );

        fireEvent.change(input, {
            target: {
                value: "quanto é 2 + 2?",
            },
        });

        fireEvent.submit(input.closest("form")!);

        expect(mockSendMessage).toHaveBeenCalledTimes(1);
        expect(mockSendMessage).toHaveBeenCalledWith(
            "quanto é 2 + 2?",
        );
    });

    it("should disable message input while loading", () => {
        mockChatState.isLoading = true;

        render(<Chat />);

        expect(
            screen.getByPlaceholderText("Digite sua mensagem..."),
        ).toBeDisabled();
    });

    it("should display the chat error", () => {
        mockChatState.error =
            "Unable to communicate with the assistant.";

        render(<Chat />);

        expect(
            screen.getByText(
                "Unable to communicate with the assistant.",
            ),
        ).toBeVisible();
    });
});