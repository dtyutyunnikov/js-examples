'use strict';

const app = {
    cardsWrapper: null,
    user: null,

    init: function () {
        console.log('init');

        this.cardsWrapper = document.querySelector('.cards');

        document.querySelector('#add-card').addEventListener('submit', this.addCard);

        document.querySelector('#login-btn').addEventListener('click', this.toggleLoginForm);
        document.querySelector('#save-name-btn').addEventListener('click', this.login);
        document.querySelector('#logout-btn').addEventListener('click', this.logout);

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
    },

    login: function (event) {
        event.preventDefault();

        const field = document.querySelector('#user-name-field');
        if (field.value.length === 0) {
            return;
        }

        app.user = field.value;
        field.value = '';

        const form = document.querySelector('#login-window');
        form.classList.toggle('hidden');

        document.querySelector('.login-area').classList.add('hidden');
        document.querySelector('.user-area').classList.remove('hidden');
        document.querySelector('#user-name').textContent = app.user;
    },

    toggleLoginForm: function (event) {
        event.preventDefault();

        document.querySelector('#login-window').classList.toggle('hidden');
    },

    logout: function (event) {
        event.preventDefault();

        document.querySelector('.user-area').classList.add('hidden');
        document.querySelector('.login-area').classList.remove('hidden');

        app.user = null;
    },
};

app.init();
