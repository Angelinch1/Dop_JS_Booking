/**
 * Учётные данные для e2e-входа в корзину.
 * Задаются только через окружение (.env / CI secrets), без значений по умолчанию в коде.
 */

/** @param {string} name */
function trimEnv(name) {
  const v = process.env[name];
  if (v == null) return '';
  return String(v).trim();
}

/** Достаточно ли переменных, чтобы запускать тесты с authInBag* (без вызова самого входа). */
function isBasketTestConfigured() {
  return trimEnv('BASKET_TEST_EMAIL').length > 0 && trimEnv('BASKET_TEST_PASSWORD').length > 0;
}

/** @returns {string} */
function requireBasketTestEmail() {
  const email = trimEnv('BASKET_TEST_EMAIL');
  if (!email) {
    throw new Error('Не задан BASKET_TEST_EMAIL: добавьте в .env (см. .env.example).');
  }
  return email;
}

/** @returns {string} */
function requireBasketTestPassword() {
  const password = trimEnv('BASKET_TEST_PASSWORD');
  if (!password) {
    throw new Error('Не задан BASKET_TEST_PASSWORD: добавьте в .env (см. .env.example).');
  }
  return password;
}

/** @returns {{ email: string, password: string }} */
function getBasketTestCredentials() {
  return {
    email: requireBasketTestEmail(),
    password: requireBasketTestPassword(),
  };
}

module.exports = {
  isBasketTestConfigured,
  getBasketTestCredentials,
  requireBasketTestEmail,
  requireBasketTestPassword,
};
