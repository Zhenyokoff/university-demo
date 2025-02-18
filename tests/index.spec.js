import { test, expect } from '@playwright/test';
import path from 'path';

test.describe('Static page test', () => {
  const filePath = path.resolve(__dirname, '../index.html');
  const fileUrl = `file://${filePath}`;

  test.beforeEach(async ({ page }) => {
    // Open file
    await page.goto(fileUrl);
  });

  test('Is logo visble', async ({ page }) => {
    const logo = page.locator('.logo img');
    await expect(logo).toBeVisible();
  });

  test('Navigation menu have 5 blocks count', async ({ page }) => {
    const navLinks = page.locator('nav ul li');
    await expect(navLinks).toHaveCount(5);
  });

  test('Dynamic posts load', async ({ page }) => {
    //Some limitation work fith file://
    await page.waitForSelector('#dynamic-posts article', { timeout: 5000 });
    const posts = page.locator('#dynamic-posts article');
    await expect(posts).toHaveCountGreaterThan(0);
  });
});