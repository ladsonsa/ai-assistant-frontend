import { expect, test } from "@playwright/test";

test("should send a message through the real backend", async ({ page }) => {
    await page.goto("/chat");

    const input = page.getByPlaceholder("Digite sua mensagem...");
    const sendButton = page.getByRole("button", { name: "Enviar" });

    await expect(input).toBeVisible();
    await expect(sendButton).toBeVisible();

    await input.fill("quanto é 2 + 2?");
    await sendButton.click();

    await expect(
        page.getByText("quanto é 2 + 2?", { exact: true }),
    ).toBeVisible();

    await expect(
        page.getByText("O resultado é 4.", { exact: true }),
    ).toBeVisible();
});