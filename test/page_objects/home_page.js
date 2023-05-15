import BaseForm from '../../main/framework/base_form.js';
import Label from '../../main/framework/base_element_children/label.js';

class HomePage extends BaseForm {
    constructor() {
        super('//p[@class="start__paragraph" and contains(text(), "welcome to User Inyerface")]', 'home page');
        this.startLink = new Label('//a[@class="start__link" and text()="HERE"]', 'link with text "here"');
    }
    
    async clickLink() {
        await this.startLink.clickElement();
    }
}

export default new HomePage();