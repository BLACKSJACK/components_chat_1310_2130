import {Chat} from './../chat/chat.js';
import {Form} from './../form/form.js';

const USER_NAME = 'Artsiom';


export class App {
    constructor({el}) {
        this.el = el;
        this.chat = new Chat({
            el: document.createElement('div'),
            data: {
                messages: [],
                user: USER_NAME
            }
        });
        this.form = new Form({
            el: document.createElement('div'),
            onSubmit: this._onFormSubmit.bind(this)
        });

        this.el.append(this.chat.el, this.form.el);

        this._asyncInit();
    }

    async _asyncInit() {
        let data = await this.getData();
        let ms = await this._setChatData(data);

        this.render();
        console.log(`Чат был запущен за ${ms} ms`);
    }

    _setChatData(data) {
        return new Promise((resolve) => {
            const ms = Math.round(Math.random() * 3000);

            setTimeout(() => {
                this.chat.add(data);
                resolve(ms);
            }, ms);
        });
    }

    render() {
        this.chat.render();
        this.form.render();
    }

    _onFormSubmit({text}) {
        this.chat.addOne({
            text,
            name: USER_NAME
        });
        this.render();
    }

    getData() {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.addEventListener('readystatechange', (event) => {
                if (xhr.readyState !== 4) {
                    return;
                }

                if (xhr.status === 502) {
                    reject(xhr.status);
                    return;
                }

                const data = JSON.parse(xhr.responseText);
                resolve(data);
            });

            xhr.open('GET', '/data/chat.json', true);
            xhr.send();
        });
    }
}
