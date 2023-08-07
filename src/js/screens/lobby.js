// блок списка игроков

function renderGamersListBlock(container) {
    const gamers = {
        tag: 'div',
        cls: 'gamers',
        content: [
            {
                tag: 'img',
                cls: 'lobby_img',
                attrs: {
                    src: 'src/img/lobby.png',
                    alt: 'lobby pikachu',
                }
            }, {
                tag: 'div',
                cls: 'list',
                content: [{
                    tag: 'h3',
                    cls: 'gamers_title',
                    content: 'Сейчас онлайн'
                }, {
                    tag: 'ul',
                    cls: 'gamers_list',
                }]
            }]
    }
    container.append(templateEngine(gamers));
}

window.application.blocks['gamers'] = renderGamersListBlock;


// экран Лобби

function renderLobbyScreen() {
    const app = document.querySelector('.app');
    app.textContent = '';
    createTitle('h2', 'Лобби', 'screen-title', app)
    window.application.renderBlock('gamers', document.querySelector('.app'));
    window.application.renderBlock('playButton', app.querySelector('.list'));

    const refreshList = setInterval(request, 1000,
        {
            url: `${backURL}player-list`,
            params: {
                token: window.application.token,
            },
            onSuccess: (data) => {
                let gamers = getLogins(data.list);
                app.querySelector('ul').textContent = '';
                gamers.forEach(el => {
                    createlistGamer(el)
                });
            }
        })
    window.application.timers.push(refreshList)

}

function createTitle(h, text, cls, container) {
    const title = document.createElement(h);
    title.textContent = text;

    title.classList.add(cls)

    container.append(title)
}

window.application.screens['lobby'] = renderLobbyScreen;

//вызов  window.application.renderScreen('lobby');


function getLogins(data) {
    return data.map(item => item['login'])
}
function createlistGamer(item) {
    const gamer = document.createElement('li');
    gamer.classList.add('gamer');
    gamer.textContent = item;
    app.querySelector('ul').append(gamer)
}




