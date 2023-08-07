function renderLogInBlock(container) {
    const logIn = {
        tag: 'div',
        cls: 'login_app',
        content: [{
            tag: 'img',
            cls: 'login_img',
            attrs: {
                src: 'src/img/login.png',
                alt: 'hello pikachu',
            }
        }, {
            tag: 'form',
            cls: 'login_form',
            attrs: { novalidate: 'novalidate' },
            content: [{
                tag: 'h2',
                cls: 'login_title',
                content: 'Начнем игру?',
            }, {
                tag: 'div',
                cls: 'form-field',
                content: [{
                    tag: 'input',
                    cls: 'login_input',
                    attrs: {
                        type: 'text',
                        name: 'login',
                        id: 'login',
                        required: 'required'
                    }
                }, {
                    tag: 'label',
                    cls: 'login_label',
                    content: 'Имя',
                    attrs: { for: 'login' }
                },]
            }, {
                tag: 'button',
                cls: 'login-button',
                attrs: { type: 'submit' },
                content: 'Войти',
            }]
        }]
    }

    container.append(templateEngine(logIn));
}

window.application.blocks['logIn'] = renderLogInBlock;

function renderLogInScreen() {
    const app = document.querySelector('.app');
    app.textContent = '';
    const header = document.createElement('h1');
    header.textContent = 'Камень, ножницы, бумага'
    app.append(header); 
    window.application.renderBlock('logIn', document.querySelector('.app'));
}

window.application.screens['logInScreen'] = renderLogInScreen;

//вызов-отрисовка страницы
window.application.renderScreen('logInScreen');

// валидация формы
function formValidation(input) {

    if (!input.value) {
        const error = document.createElement('span');
        error.classList.add('error');
        error.textContent = 'Необходимо заполнить имя'
        form.append(error);
        input.classList.add('error-border')
        form.querySelector('button').setAttribute('disabled', 'disabled');
        return false
    } else {
        return true
    }
};

const app = document.querySelector('.app');
const form = app.querySelector('form');
const input = form.querySelector('input');

form.addEventListener('submit', (event) => {
    event.preventDefault();

    if (formValidation(input)) {
        request({
            url: `${backURL}login`,
            params: {
                login: input.value,
            },
            onSuccess: (data) => {
                form.querySelector('button').setAttribute('disabled', 'disabled');
                window.application.token = data.token,

                    request({
                        url: `${backURL}player-status`,
                        params: {
                            token: window.application.token,
                        },
                        onSuccess: (data) => {
                            if (data['player-status'].status === 'lobby') {
                                window.application.renderScreen('lobby');
                            } else if (data['player-status'].status === 'game') {
                                window.application.id = data['player-status'].game.id
                                window.application.renderScreen('moveScreen');
                            }else if (data['player-status'].status === 'error'){
                                console.warn('Нет игрока с таким токеном')
                            }
                          
                        }
                    })

            },

        })

    }
})

input.addEventListener('input', () => {
    if (input.classList.contains('error-border')) {
        const error = document.querySelector('.error')
        error.remove();
        input.classList.remove('error-border')
        form.querySelector('button').removeAttribute('disabled', 'disabled');
    }
})
