module.exports = {
  timeout: 10000,
  retries: 0,
  reporter: 'list',
  workers: 5,
  use: {
    baseURL: 'http://localhost:7800',
    headless: true,
    ignoreHTTPSErrors: true,
  },
  projects: [
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
};
