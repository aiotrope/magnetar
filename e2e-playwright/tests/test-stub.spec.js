const { test, expect } = require('@playwright/test');

test('Test page title', async ({ page }) => {
  await page.goto('/');
  expect(await page.title()).toBe('Questions & Answers');
});

test('Test page course links: Java CS-3456, Python CS-5678 and Home', async ({
  page,
}) => {
  await page.goto('/');
  await page.getByRole('button', { name: /Link to Java CS-3456/i }).click();
  await expect(
    page.getByText('Java CS-3456 Course Section', { exact: true })
  ).toBeVisible();
  await page.getByRole('button', { name: /Python/i }).click();
  await expect(
    page.getByText('Python CS-5678 Course Section', { exact: true })
  ).toBeVisible();
  await page.getByRole('button', { name: /Home/i }).click();
  await expect(page.locator('h1')).toHaveText('Courses');
});

test('Test to add question to SQL CS-6634 course section', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: /Link to SQL CS-6634/i }).click();
  await page.getByLabel('Title').fill('SQL CHAR and VARCHAR2');
  await page
    .getByLabel('Your question related to SQL CS-6634')
    .fill('What is the difference between CHAR and VARCHAR2 datatype in SQL?');
  await page.getByRole('button', { name: /ADD QUESTION SQL CS-6634/i }).click();
  await expect(
    page.getByText('SQL CHAR and VARCHAR2', { exact: true })
  ).toBeVisible();
  await expect(
    page.getByText(
      'What is the difference between CHAR and VARCHAR2 datatype in SQL?',
      { exact: true }
    )
  ).toBeVisible();
});

test('Test to add answer to Fortran CS-5758 course section Hello Fortran question', async ({
  page,
}) => {
  await page.goto('/');
  await page.getByRole('button', { name: /Fortran/i }).click();
  await page.getByTitle('Hello Fortran').click();
  await page
    .getByLabel('Your answer to Hello Fortran')
    .fill(
      "program hello! This is a comment line; it is ignored by the compiler print *, 'Hello, World!'end program hello"
    );
  await page.getByRole('button', { name: /SUBMIT ANSWER/i }).click();
  await expect(
    page.getByText(
      "program hello! This is a comment line; it is ignored by the compiler print *, 'Hello, World!'end program hello",
      { exact: true }
    )
  ).toBeVisible();
});

test('Test to add question vote for Fortran CS-5758 course section Hello Fortran question', async ({
  page,
}) => {
  await page.goto('/');
  await page.getByRole('button', { name: /Link to Fortran CS-5758/i }).click();
  await expect(page.getByText('Hello Fortran', { exact: true })).toBeVisible();
  await expect(page.locator('#question-vote-span-1')).toHaveText('1');
  await page.getByTestId('question-vote-1').click();
  await expect(page.locator('#question-vote-span-1')).toHaveText('2');
});
