import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { MessageInput } from "./MessageInput";

describe("MessageInput", () => {
    it("should submit the trimmed message and clear the input", async () => {
        const onSend = vi.fn().mockResolvedValue(undefined);

        render(
            <MessageInput
                disabled={false}
                onSend={onSend}
            />,
        );

        const input = screen.getByPlaceholderText(
            "Digite sua mensagem...",
        );

        fireEvent.change(input, {
            target: {
                value: "  quanto é 2 + 2?  ",
            },
        });

        fireEvent.submit(input.closest("form")!);

        expect(onSend).toHaveBeenCalledTimes(1);
        expect(onSend).toHaveBeenCalledWith(
            "quanto é 2 + 2?",
        );
        expect(input).toHaveValue("");
    });

    it("should not submit an empty message", () => {
        const onSend = vi.fn().mockResolvedValue(undefined);

        render(
            <MessageInput
                disabled={false}
                onSend={onSend}
            />,
        );

        const input = screen.getByPlaceholderText(
            "Digite sua mensagem...",
        );

        fireEvent.submit(input.closest("form")!);

        expect(onSend).not.toHaveBeenCalled();
    });
});