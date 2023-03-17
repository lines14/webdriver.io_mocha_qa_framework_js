const BaseForm = require('../../main/framework/base_form');
const CheckBox = require('../../main/framework/base_element_children/check_box');
const Label = require('../../main/framework/base_element_children/label');
const Button = require('../../main/framework/base_element_children/button');
const configManager = require('../../main/config_manager');

class ThisIsMeForm extends BaseForm {
    constructor() {
        super('h2=This is me', '"this is me" form');
        this.unselectAllCheckBox = new CheckBox('[for="interest_unselectall"] .checkbox__check', '"unselect all" checkbox');
        this.cinnamonCheckBox = new CheckBox('[for="interest_cinnamon"] .checkbox__check', '"cinnamon" checkbox');
        this.mulletsCheckBox = new CheckBox('[for="interest_mullets"] .checkbox__check', '"mullets" checkbox');
        this.windowsCheckBox = new CheckBox('[for="interest_windows"] .checkbox__check', '"windows" checkbox');
        this.uploadImageLink = new Label('a=upload', 'image');
        this.nextButton = new Button('button=Next', '"next" button');
    }
    async clickUnselectAllCheckBox() {
        await this.unselectAllCheckBox.clickButton();
    }
    async clickCinnamonCheckBox() {
        await this.cinnamonCheckBox.clickButton();
    }
    async clickMulletsCheckBox() {
        await this.mulletsCheckBox.clickButton();
    }
    async clickWindowsCheckBox() {
        await this.windowsCheckBox.clickButton();
    }
    async uploadImage() {
        await this.uploadImageLink.inputData(configManager.getTestFile());
    }
    async clickNextButton() {
        await this.nextButton.clickButton();
    }
}

module.exports = new ThisIsMeForm();