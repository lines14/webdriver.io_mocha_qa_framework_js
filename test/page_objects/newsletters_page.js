const BaseForm = require('../../main/framework/base_form');
const Button = require('../../main/framework/base_element_children/label');
const TextBox = require('../../main/framework/base_element_children/text_box');
const Label = require('../../main/framework/base_element_children/label');
const configManager = require('../../main/config_manager');

class NewslettersPage extends BaseForm {
    constructor() {
        super('//span[contains(@class, "h1") and contains(text(), "Our newsletters")]', '"newsletters" page');
        this.allSubscriptionButtons = new Button('//label[contains(text(), "Choose this newsletter")]', 'all subscription buttons');
        this.specialCoverageButton = new Button('//h2[text()="Special Coverage"]//ancestor::div[@class="p-8"]//following-sibling::label[contains(text(), "Choose this newsletter")]', '"special coverage" subscription button');
        this.emailBox = new TextBox('//input[@placeholder="Enter your email"]', 'email box');
        this.submitButton = new Button('//input[@type="submit"]', 'submit button');
        this.newslettersHeading = new Label('//span[contains(text(), "Our newsletters")]', 'heading of the "newsletters" page');
        this.confirmationForm = new Label('//span[contains(text(), "Thanks! To complete your subscription")]', '"confirmation request" form');
        this.allSeePreviewsButtons = new Button('//form[@id="newsletters-form"]//following-sibling::a[contains(@class, "text-primary")]', 'all "see previews" buttons');
        this.allPreviewsIframes = new Label('//iframe[@class="iframe-preview"]', 'all previews iframes');
    }

    async clickRandomSubscriptionButton() {
        this.element = await this.allSubscriptionButtons.clickRandomElementsFromList(this.specialCoverageButton.elementLocator);
    }

    async waitSubmitButtonClickable() {
        await this.submitButton.waitIsClickable();
    }

    async emailBoxDisplayedInViewport() {
        return await this.emailBox.elementIsDisplayedInViewport();
    }

    async inputEmail() {
        await this.emailBox.inputData(configManager.getTestData().email);
    }

    async scrollToHeading() {
        await this.newslettersHeading.scrollToElement();
    }

    async clickSubmitButton() {
        await this.submitButton.clickElement();
    }

    async waitConfirmationFormClickable() {
        await this.confirmationForm.waitIsClickable();
    }

    async clickSeePreviewsButton() {
        await this.allSeePreviewsButtons.clickElementFromList(this.element.index);
    }

    async getIframeElement() {
        return (await this.allPreviewsIframes.getElements())[this.element.index];
    }
}

module.exports = new NewslettersPage();