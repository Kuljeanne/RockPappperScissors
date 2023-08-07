//блок ожидания
function renderWaitingGameBlock(container) {
    const waitingBlock = {
        tag: 'div',
        cls: 'waiting',
        content: [
            {
                tag: 'h3',
                cls: 'waiting_title',
                content: 'Ожидание начала игры...'
            }, {
                tag: 'i',
                cls: ['fa-solid', 'fa-spinner'],

            }, {
                tag: 'img',
                attrs: {
                    src: 'src/img/waitingGame.svg',
                    alt: 'waiting',
                }
            }]
    }

    container.append(templateEngine(waitingBlock));
}

window.application.blocks['waitingGame'] = renderWaitingGameBlock;


// экран ожидания 
function renderWaitingGameScreen() {
    window.application.timers.forEach(timer => {
        clearInterval(timer);
    });
    window.application.timers = [];
    const app = document.querySelector('.app');
    app.textContent = '';

    window.application.renderBlock('waitingGame', document.querySelector('.app'));

    const refresGameStatus = setInterval(request, 500,
        {
            url: `${backURL}game-status`,
            params: {
                token: window.application.token,
                id: window.application.id,
            },
            onSuccess: (data) => {
                if (data['game-status'].status === 'waiting-for-start') {
                    console.log('Ожидание начала игры. Пока в игре только один участник (вы),ожидаем, когда соперник присоединится к игре')
                } else {
                    if (data['game-status'].status === 'waiting-for-your-move') {
                        window.application.renderScreen('moveScreen');
                    } else if (data['game-status'].status === 'waiting-for-enemy-move') {
                        window.application.renderScreen('waitingEnemy');
                    } else if (data['game-status'].status === 'lose') {
                        window.application.renderScreen('lossScreen');
                    } else if (data['game-status'].status === 'win') {
                        window.application.renderScreen('winScreen');
                    }
                }
            }
        })
    window.application.timers.push(refresGameStatus);
}

window.application.screens['waitingGame'] = renderWaitingGameScreen;

//вызов
//window.application.renderScreen('waitingGame');