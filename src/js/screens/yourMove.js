function renderMoveBlock(container) {
    const moveBlock = {
        tag: 'div',
        cls: 'move',
        content: [{
            tag: 'h2',
            cls: 'move_title',
            content: 'Ваш ход',
        }, {
            tag: 'div',
            cls: 'move-wrapper',
            content: [{
                tag: 'div',
                cls: 'move_choices',
                content: [{
                    tag: 'i',
                    cls: ['fa-solid', 'fa-hand-back-fist'],
                    attrs: {
                        'data-choice': `rock`
                    },
                    content: {
                        tag: 'span',
                        cls: 'name',
                        content: 'Камень'
                    }
                },
                {
                    tag: 'i',
                    cls: ['fa-solid', 'fa-hand-scissors'],
                    attrs: {
                        'data-choice': `scissors`
                    },
                    content: {
                        tag: 'span',
                        cls: 'name',
                        content: 'Ножницы'
                    }
                }, {
                    tag: 'i',
                    cls: ['fa-solid', 'fa-hand'],
                    attrs: {
                        'data-choice': `paper`
                    },
                    content: {
                        tag: 'span',
                        cls: 'name',
                        content: 'Бумага'
                    }
                }],
            }, {
                tag: 'img',
                cls: 'move_img',
                attrs: {
                    src: 'src/img/move.png',
                    alt: 'move'
                },
            }]
        }]
    }

    container.append(templateEngine(moveBlock));

    let moves = document.querySelectorAll('i');
    moves.forEach(move =>
        move.addEventListener('click', () => {
            request({
                url: `${backURL}play`,
                params: {
                    token: window.application.token,
                    id: window.application.id,
                    move: move.dataset.choice,
                },
                onSuccess: (data) => {
                    if (data.status === 'ok') {
                        if (data['game-status'].status === 'lose') {
                            window.application.renderScreen('lossScreen');
                        } else if (data['game-status'].status === 'win') {
                            window.application.renderScreen('winScreen');
                        } else if (data['game-status'].status === 'waiting-for-enemy-move') {
                            window.application.renderScreen('waitingEnemy');
                        }
                    } else if (data.status === 'error') {
                        if (data.message === 'not your move') {
                            window.application.renderScreen('waitingEnemy')
                        } else { console.warn(data.message) }

                    }
                }
            })

        })
    )
}

window.application.blocks['move'] = renderMoveBlock;

function renderMoveScreen() {
    window.application.timers.forEach(timer => {
        clearInterval(timer);
    });
    window.application.timers = [];
    const app = document.querySelector('.app');
    app.textContent = '';
    
    window.application.renderBlock('move', document.querySelector('.app'));
}

window.application.screens['moveScreen'] = renderMoveScreen;

//вызов window.application.renderScreen('moveScreen');