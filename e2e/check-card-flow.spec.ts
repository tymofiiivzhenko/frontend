import { test, expect } from '@playwright/test';

test.describe('Check card flow E2E', () => {
  test('load items → open tip details', async ({ page }) => {

    await page.goto('/');

    const cards = page.locator('.item-card');
    await expect(cards.first()).toBeVisible();

    const firstTitle = await cards
      .first()
      .locator('h2, h3, .item-title')
      .innerText();

    await cards.first().click();

    await expect(
      page.locator('h1, h2, h3').filter({ hasText: firstTitle })
    ).toBeVisible();
  });
});
