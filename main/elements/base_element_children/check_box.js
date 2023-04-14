const BaseElement = require('../base_element');

class CheckBox extends BaseElement {
    constructor(locator, name) {
        super(locator, name);
    }
}

module.exports = CheckBox;