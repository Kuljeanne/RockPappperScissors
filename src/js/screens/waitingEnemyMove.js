function renderWaitingEnemyBlock(container) {
    const waitingEnemyBlock = {
        tag: 'div',
        cls: 'waiting',
        content: [
            {
                tag: 'h3',
                cls: 'waiting_title',
                content: 'Ожидание хода соперника...'
            }, {
                tag: 'i',
                cls: ['fa-solid', 'fa-spinner'],

            }, {
                tag: 'img',
                attrs: {
                    src: 'src/img/move.png',
                    alt: 'waiting',
                }
            }]
    }

    container.append(templateEngine(waitingEnemyBlock));
}

window.application.blocks['waitingEnemyBlock'] = renderWaitingEnemyBlock;

// экран ожидания 
function renderWaitingEnemyScreen() {
    window.application.timers.forEach(timer => {
        clearInterval(timer);
    });
    window.application.timers = [];
    const app = document.querySelector('.app');
    app.textContent = '';
    
    window.application.renderBlock('waitingEnemyBlock', document.querySelector('.app'));
    //отрисовываем таймер
    const refresGameStatus = setInterval(request, 500,
        {
            url: `${backURL}game-status`,
            params: {
                token: window.application.token,
                id: window.application.id,
            },
            onSuccess: (data) => {
                if (data['game-status'].status === 'lose') {
                    window.application.renderScreen('lossScreen');
                } else if (data['game-status'].status === 'win') {
                    window.application.renderScreen('winScreen');
                }
            }

        })
        window.application.timers.push(refresGameStatus)

}

window.application.screens['waitingEnemy'] = renderWaitingEnemyScreen;

//вызов
//window.application.renderScreen('waitingEnemy')