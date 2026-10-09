import { test, expect } from '../fixtures/test';
import { config } from '../fixtures/config';

test('checkout: item total + tax equals total and confirmation appears', async ({
  page,
  loginAs,
  inventoryPage,
  checkoutPage,
}) => {
  await loginAs(config.users.standard);
  await inventoryPage.expectLoaded();

  for (const product of config.products) {
    await inventoryPage.addToCart(product);
  }
  await expect(page.getByTestId('shopping-cart-badge')).toHaveText(String(config.products.length));

  await inventoryPage.openCart();
  await checkoutPage.startCheckout();
  await checkoutPage.fillInfo(config.checkout);

  const { itemTotal, tax, total } = await checkoutPage.totals();
  expect(itemTotal + tax).toBeCloseTo(total, 2);

  await checkoutPage.finish();
  await checkoutPage.expectConfirmation(config.messages.orderComplete);
});
