'use strict';

const app = {
    cardsWrapper: null,

    init: function () {
        console.log('init');

        this.cardsWrapper = document.querySelector('.cards');

        document.querySelector('#add-card').addEventListener('submit', this.addCard);

        document.querySelectorAll('.card__remove').forEach((btn) => {
            btn.addEventListener('click', this.removeCard);
        });
    },

    addCard: function (event) {
        event.preventDefault();

        const data = new FormData(event.target);
        const text = data.get('text');
        if (text.length === 0) {
            console.log('empty text');

            return;
        }

        app.cardsWrapper.insertAdjacentHTML('beforeend', app.createCard(text));
        app.cardsWrapper.querySelector('.card:last-child > a.card__remove').addEventListener('click', app.removeCard);

        document.querySelector('#text-field').value = '';
    }, 

    removeCard: function (event) {
        event.preventDefault();
        event.target.closest('.card').remove();
    },

    createCard: function (text) {
        const template = document.querySelector('template[name="card-template"]').innerHTML;

        return template.replace('%text%', text);
    }
};

app.init();
