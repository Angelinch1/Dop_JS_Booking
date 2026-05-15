# JSDopbooking

E2E на **Playwright** (Page Object), отчёты: HTML (`npm run report`) и Allure (`npm run allure:report`).

## Структура

- `test/` — спеки Playwright
- `pages/` — Page Object: `BasePage`, **`SearchPage`** (поиск: форма и выдача), **`AuthPage`** (авторизация), **`BasketPage`** (корзина)
- `config/bookingUrls.js` — URL разделов (переопределение через `BOOKING_*` в `.env`)

## Запуск тестов

1. `npm install`, затем `npx playwright install chromium`
2. Скопировать `.env.example` в `.env`; для сценариев с корзиной задать `BASKET_TEST_EMAIL` и `BASKET_TEST_PASSWORD`
3. Команды:
   - `npm test` — полный прогон Playwright
   - `npm run test:headed` — прогон с видимым браузером

На Windows, если PowerShell ругается на `npm.ps1`, в Cursor/VS Code можно в пользовательских настройках задать терминал по умолчанию **Command Prompt** (`terminal.integrated.defaultProfile.windows`).
