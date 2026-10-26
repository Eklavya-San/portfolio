import { defineConfig, devices } from '@playwright/test';
import { existsSync } from 'node:fs';

const chromePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const executablePath = existsSync(chromePath) ? chromePath : undefined;

export default defineConfig({
  testDir: './e2e',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: 0,
  workers: 1,
  reporter: 'list',
  use: {
    baseURL: 'http://localhost:4321',
    trace: 'on-first-retry',
    ...(executablePath ? { executablePath } : {}),
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        ...(executablePath ? { executablePath } : {}),
      },
    },
  ],
  webServer: {
    command: 'npm run preview -- --port 4321 --ignore-lock',
    url: 'http://localhost:4321',
    reuseExistingServer: !process.env.CI,
    timeout: 30000,
  },
});
