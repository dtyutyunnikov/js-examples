'use strict';

const app = {
    init: function () {
        console.log('init');

        document.querySelector('#add-card').addEventListener('submit', this.addCard);

        document.querySelectorAll('.card__remove').forEach((btn) => {
            btn.addEventListener('click', this.removeCard);
        });
    },

    addCard: function (event) {
        event.preventDefault();
        console.log('addCard');

        let data = new FormData(event.target);
        let text = data.get('text');
        if (text.length === 0) {
            console.log('empty text');

            return;
        }

        const card = document.querySelector('template[name="card-template"]')
            .innerHTML
            .replace('%text%', text);

        const cards = document.querySelector('.cards');
        cards.insertAdjacentHTML('beforeend', card);
        const btn = cards.querySelector('.card:last-child > a');
        btn.addEventListener('click', this.removeCard);

        document.querySelector('#text-field').value = '';
    }, 

    removeCard: function (event) {
        event.preventDefault();
        event.target.closest('.card').remove();
    }
};

app.init();
