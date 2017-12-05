import {Chat} from './../chat/chat.js';
import {Form} from './../form/form.js';

export class App {
    constructor({el}) {
        this.el = el;
        this.chat = new Chat({
            el: document.createElement('div')
        });
        this.form = new Form({
            el: document.createElement('div'),
            onSubmit: this._onFormSubmit.bind(this)
        });

        this.el.append(this.chat.el, this.form.el);
        this.chat.add([
            {
                name: 'Ekaterina',
                text: 'тогда и класс надо менять'
            },
            {
                name: 'Ivan',
                text: 'закрывающий div'
            }
        ]);

        this.render();
    }

    render() {
        this.chat.render();
        this.form.render();
    }

    _onFormSubmit({text}) {
        this.chat.addOne({
            text,
            name: 'Me'
        });
        this.render();
    }
}
