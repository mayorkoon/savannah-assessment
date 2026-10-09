import { Page, expect } from '@playwright/test';

export interface CheckoutInfo {
  firstName: string;
  lastName: string;
  postalCode: string;
}

const money = (text: string) => parseFloat(text.match(/\$([\d.]+)/)![1]);

export class CheckoutPage {
  constructor(private readonly page: Page) {}

  async startCheckout() {
    await this.page.getByTestId('checkout').click();
  }

  async fillInfo(info: CheckoutInfo) {
    await this.page.getByTestId('firstName').fill(info.firstName);
    await this.page.getByTestId('lastName').fill(info.lastName);
    await this.page.getByTestId('postalCode').fill(info.postalCode);
    await this.page.getByTestId('continue').click();
  }

  async totals() {
    const itemTotal = money(await this.page.getByTestId('subtotal-label').innerText());
    const tax = money(await this.page.getByTestId('tax-label').innerText());
    const total = money(await this.page.getByTestId('total-label').innerText());
    return { itemTotal, tax, total };
  }

  async finish() {
    await this.page.getByTestId('finish').click();
  }

  async expectConfirmation(message: string) {
    await expect(this.page).toHaveURL(/checkout-complete\.html/);
    await expect(this.page.getByTestId('complete-header')).toHaveText(message);
  }
}
