import 'dotenv/config';

// Defaults are the public Sauce Demo practice credentials; override via .env.
export const config = {
  users: {
    standard: process.env.STANDARD_USER ?? 'standard_user',
    lockedOut: process.env.LOCKED_OUT_USER ?? 'locked_out_user',
    problem: process.env.PROBLEM_USER ?? 'problem_user',
  },
  password: process.env.SAUCE_PASSWORD ?? 'secret_sauce',
  checkout: { firstName: 'Abiodun', lastName: 'Oyawale', postalCode: '100001' },
  products: ['sauce-labs-backpack', 'sauce-labs-bike-light'],
  messages: {
    lockedOut: 'Epic sadface: Sorry, this user has been locked out.',
    orderComplete: 'Thank you for your order!',
  },
};
