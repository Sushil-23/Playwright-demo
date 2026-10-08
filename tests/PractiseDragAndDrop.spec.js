import { test, expect } from '@playwright/test'

test('Practice drag and drop', async ({ page }) => {
    await page.goto('https://demoqa.com/droppable');

    const dragElement = page.locator('#draggable')
    const dropElement = page.locator('#simpleDropContainer #droppable')
    await dragElement.hover();
    await page.mouse.down();
    await dropElement.hover();
    await page.mouse.up();
    await page.waitForTimeout(2000);
    await expect(dropElement).toHaveText('Dropped!');
})