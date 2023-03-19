const BaseForm = require('../../main/framework/base_form');

class PersonalDetailsForm extends BaseForm {
    constructor() {
        super('//h3[text()="Personal details"]', 'personal details form');
    }
}

module.exports = new PersonalDetailsForm();