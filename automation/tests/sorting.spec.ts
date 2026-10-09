import { test, expect } from '../fixtures/test';
import { config } from '../fixtures/config';

test.describe('Sorting by price (low to high)', () => {
  test('standard_user: list is in ascending order', async ({ loginAs, inventoryPage }) => {
    await loginAs(config.users.standard);
    await inventoryPage.expectLoaded();
    await inventoryPage.sortBy('lohi');

    // Poll so we don't read the prices before the re-sort has rendered.
    await expect
      .poll(async () => {
        const prices = await inventoryPage.prices();
        return prices.length > 0 && prices.every((p, i) => i === 0 || prices[i - 1] <= p);
      })
      .toBe(true);
  });

  // Bonus: problem_user's sort doesn't reorder the list, so this is expected to fail.
  test('problem_user: sort is broken (known defect)', async ({ loginAs, inventoryPage }) => {
    test.fail(true, 'Known Sauce Demo defect: problem_user sorting does not work');
    await loginAs(config.users.problem);
    await inventoryPage.expectLoaded();
    await inventoryPage.sortBy('lohi');
    const prices = await inventoryPage.prices();
    const sorted = [...prices].sort((a, b) => a - b);
    expect(prices).toEqual(sorted);
  });
});
