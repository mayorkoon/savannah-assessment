import { test, expect } from '../fixtures/test';
import { config } from '../fixtures/config';

test.describe('Login', () => {
  test('standard_user logs in successfully', async ({ loginAs, inventoryPage }) => {
    await loginAs(config.users.standard);
    await inventoryPage.expectLoaded();
  });

  test('locked_out_user sees the locked-out error', async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.login(config.users.lockedOut, config.password);
    await loginPage.expectError(config.messages.lockedOut);
  });
});
