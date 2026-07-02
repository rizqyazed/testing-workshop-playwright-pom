import { Page, type Locator } from "playwright";
import { expect } from "@playwright/test";
import hoursWorkedPage_content from "../content/hoursWorkedPage_content";

export class HoursWorkedPage {
  private readonly title: string;
  private readonly page: Page;
  private readonly heading: string;
  private readonly hours_input: Locator;
  private readonly continue_button: Locator;
  private readonly error_message: string;
  private readonly error_heading: string;

  constructor(page: Page) {
    this.page = page;
    this.title = hoursWorkedPage_content.pageTitle;
    this.heading = hoursWorkedPage_content.heading;
    this.hours_input = page.locator("#response");
    this.continue_button = page.getByRole("button", { name: "Continue" });
    this.error_message = hoursWorkedPage_content.error_message;
    this.error_heading = hoursWorkedPage_content.error_heading;
  }

  async checkPageLoads(): Promise<void> {
    await Promise.all([
      await expect(this.page).toHaveTitle(this.title),
      await expect(
        this.page.getByRole("heading", { name: this.heading }),
      ).toBeVisible(),
      await expect(this.hours_input).toBeEmpty(),
    ]);
  }

  async enterHours(hours: string): Promise<void> {
    await this.hours_input.fill(hours);
  }

  async continueOn(): Promise<void> {
    await this.continue_button.click();
  }
}

export default HoursWorkedPage;
