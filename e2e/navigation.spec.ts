import { test, expect } from '@playwright/test';

test.describe('Mobile nav hash scrolling', () => {
  test.beforeEach(async ({ page }) => {
    // Mirror page console to runner logs for easier debugging
    page.on('console', msg => {
      console.log('[page.console]', msg.type(), msg.text());
    });
  });

  test('hard refresh with #projects should trigger nav logs', async ({ page }) => {
    const consoleMessages: any[] = [];
    page.on('console', msg => {
      consoleMessages.push({ type: msg.type(), text: msg.text() });
    });

    await page.goto('/#projects', { waitUntil: 'load' });
    await page.waitForTimeout(1000); // allow observer & retries

    const navLogs = await page.evaluate(() => (window as any).__NAV_LOGS || []);
    console.log('NAV_LOGS:', JSON.stringify(navLogs, null, 2));

    await test.info().attach('nav-logs-hash', {
      body: JSON.stringify({ consoleMessages, navLogs }, null, 2),
      contentType: 'application/json',
    });

    expect(Array.isArray(navLogs)).toBeTruthy();
    const found = navLogs.some((l: any) => l && (l.msg === 'scrollToHashWithOffset' || l.msg === 'verifyAndRetry'));
    expect(found).toBeTruthy();
  });

  test('open menu and tap Work link triggers nav logs', async ({ page }) => {
    const consoleMessages: any[] = [];
    page.on('console', msg => {
      consoleMessages.push({ type: msg.type(), text: msg.text() });
    });

    await page.goto('/', { waitUntil: 'load' });
    await page.waitForTimeout(300);

    // Open mobile menu
    await page.click('button[aria-label="Open menu"]');
    await page.waitForTimeout(200);

    // Click the Work link inside the panel
    await page.click('text=Work');
    await page.waitForTimeout(1000);

    const navLogs = await page.evaluate(() => (window as any).__NAV_LOGS || []);
    console.log('NAV_LOGS_MENU:', JSON.stringify(navLogs, null, 2));

    await test.info().attach('nav-logs-menu', {
      body: JSON.stringify({ consoleMessages, navLogs }, null, 2),
      contentType: 'application/json',
    });

    const found = navLogs.some((l: any) => l && (l.msg === 'scrollToHashWithOffset' || l.msg === 'verifyAndRetry'));
    expect(found).toBeTruthy();
  });
});
