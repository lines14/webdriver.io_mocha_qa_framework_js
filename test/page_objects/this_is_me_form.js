const BaseForm = require('../../main/framework/base_form');
const CheckBox = require('../../main/framework/base_element_children/check_box');
const Label = require('../../main/framework/base_element_children/label');
const Button = require('../../main/framework/base_element_children/button');
const configManager = require('../../main/config_manager');

class ThisIsMeForm extends BaseForm {
    constructor() {
        super('//h2[@class="avatar-and-interests__title" and text()="This is me"]', '"this is me" form');
        this.unselectAllCheckbox = new CheckBox('//label[@for="interest_unselectall"]//span[contains(@class, "checkbox__check")]', '"unselect all" checkbox');
        this.selectAllCheckbox = new CheckBox('//label[@for="interest_selectall"]//span[contains(@class, "checkbox__check")]', '"select all" checkbox');
        this.allCheckboxes = new CheckBox('//span[contains(@class, "checkbox__check")]', 'all checkboxes');
        this.uploadImageLink = new Label('//a[@class="avatar-and-interests__upload-button" and text()="upload"]', 'image');
        this.nextButton = new Button('//button[contains(@class, "button--white")]', '"next" button');
    }

    async clickUnselectAllCheckbox() {
        await this.unselectAllCheckbox.clickElement();
    }

    async clickThreeRandomCheckboxes() {
        await this.allCheckboxes.clickRandomElementsFromList(configManager.getTestData().checkboxCount, this.selectAllCheckbox.elementLocator, this.unselectAllCheckbox.elementLocator);
    }

    async uploadImage() {
        await this.uploadImageLink.inputData(configManager.getTestFile());
    }
    
    async clickNextButton() {
        await this.nextButton.clickElement();
    }
}

module.exports = new ThisIsMeForm();