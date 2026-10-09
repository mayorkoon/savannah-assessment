# Senior QA Engineer - Home Assignment

Abiodun Oyawale

## What's where

| Folder | Contents |
|---|---|
| `Manual/` | `A1-A5-A6-A7.pdf` (requirements review, mobile/design approach, prioritization, SQL); `Checkout Promo Test Cases.xlsx` (A2, 38 cases plus a scenario map); `Bug Report.xlsx` (A3 session notes, 7 bug reports with Jam evidence links, improvement suggestion) |
| `api/` | Postman collection and environment JSON, Collection Runner screenshot, `API_FINDINGS.pdf` |
| `automation/` | Playwright + TypeScript suite for Sauce Demo, with its own README (setup, run commands, report screenshot, problem_user bonus, Promo Codes automation-priority note) |

Quick start for the automation suite:

```bash
cd automation
npm install
npx playwright install chromium
npm test
```

## Time spent

I did it in one sitting, 16:30 to 19:50. Times per task are estimates.

| Task | Time |
|---|---|
| A1 Requirements review | 20 min |
| A2 Test design | 40 min |
| A3 Exploratory testing and bug reports | 35 min |
| A4 API testing in Postman | 35 min |
| A5 Mobile and design validation | 10 min |
| A6 Prioritization | 10 min |
| A7 SQL | 10 min |
| Part B Automation | 40 min |
| **Total** | **3 h 20 min** |

This came in under the 5 hours. Most of my time went on the pricing and lockout test cases and the API defects.

## Assumptions

Promo Codes PRD (the open questions are listed in A1; until they're answered I tested against these):
- Tax is calculated on the discounted subtotal. Shipping is never discounted.
- The minimum order value is inclusive (a $50.00 cart meets a $50 minimum).
- Discounts apply only to non-sale items. Whether the minimum is checked against the full or the eligible subtotal is still open (PC-38).
- A fixed discount is capped at the eligible amount, so the total never goes below $0.
- Invalid, expired, below-minimum and sale-only attempts all count toward the 5-attempt lockout. A successful apply resets the counter; Remove does not.
- The lockout is enforced on the server, per account, so it can't be bypassed by switching platform, starting a new session or reinstalling.
- "Session" means the logged-in session; an applied code is cleared on logout.
- The expired-code message follows the PRD ("This code has expired."), not Figma. The "Free shipping" badge conflicts with requirement 7 and is treated as a question for the PM/designer, not as expected behaviour.

Exploratory testing and API:
- Sauce Demo was tested on desktop Chrome on macOS only (environment details are in each bug report).
- The Restful Booker docs are the source of truth. The negative-case requests assert the *correct* behaviour (4xx/401), so a failing assertion in the Collection Runner marks a defect. Each one is listed in `API_FINDINGS.pdf`.

Automation:
- Chromium only, against the live public site. Credentials default to the public demo values and can be overridden through `.env`.

## What I'd do with more time

- Run the Sauce Demo session on Firefox, Safari and mobile viewports, and do an accessibility pass (axe plus keyboard-only checkout).
- Add the Restful Booker API checks to the Playwright suite using the `request` fixture, so UI and API tests run in one pipeline.
- Add a CI workflow (GitHub Actions) that runs the Playwright suite on every push and publishes the HTML report.
- Extend the Postman collection with schema validation on every response and data-driven runs for the boundary cases.
- For Promo Codes, once the PM answers the A1 questions: finalize the pending expected results (PC-32, PC-38) and draft the API-level tests for pricing and lockout.

## AI usage

I used Claude for parts of this and reviewed everything it produced before including it.

- **A1 and A2:** Claude helped with the requirements review and generated a first set of test cases. I went through them myself and edited the questions, priorities, assumptions and automation decisions.
- **A3:** done by me. Bugs were found manually and recorded with Jam.
- **A4:** done by me. I built the Postman collection, scripts and assertions, and wrote up the findings.
- **A7:** I wrote queries 1 and 2. Claude wrote queries 3 and 4, and I checked them against the table definitions.
- **Part B:** I used Claude to write the Playwright suite faster. I chose what to cover, ran it and checked the results.
- **Final review:** I used Claude to check the submission against the brief and to draft this README.
