import { Page, type Locator } from "playwright";
import { expect } from "@playwright/test";
import leaveTestPage_content from "../content/leaveTestPage_content";

export class LeaveStartPage {
  private readonly title: string;
  private readonly page: Page;
  private readonly heading: string;
  private readonly day_input: Locator;
  private readonly month_input: Locator;
  private readonly year_input: Locator;
  private readonly continue_button: Locator;
  private readonly error_message: string;
  private readonly error_heading: string;

  constructor(page: Page) {
    this.page = page;
    this.title = leaveTestPage_content.pageTitle;
    this.heading = leaveTestPage_content.heading;
    this.day_input = page.locator("#response-0");
    this.month_input = page.locator("#response-1");
    this.year_input = page.locator("#response-2");
    this.continue_button = page.getByRole("button", { name: "Continue" });
    this.error_message = leaveTestPage_content.error_message;
    this.error_heading = leaveTestPage_content.error_heading;
  }

  async checkPageLoads(): Promise<void> {
    await Promise.all([
      await expect(this.page).toHaveTitle(this.title),
      await expect(
        this.page.getByRole("heading", { name: this.heading }),
      ).toBeVisible(),
      await expect(this.day_input).toBeEmpty(),
      await expect(this.month_input).toBeEmpty(),
      await expect(this.year_input).toBeEmpty(),
    ]);
  }

  async enterDate(day: string, month: string, year: string): Promise<void> {
    await this.day_input.fill(day);
    await this.month_input.fill(month);
    await this.year_input.fill(year);
  }

  async continueOn(): Promise<void> {
    await this.continue_button.click();
  }
}

export default LeaveStartPage;
