//блок кнопки играть в лобби

function renderPlayButtonBlock(container) {
    const playButton = {
        tag: 'button',
        cls: 'button-play',
        content: 'Играть!',
        attrs: {
            type: 'submit'
        }
    }

    container.append(templateEngine(playButton));

    const play = document.querySelector('.button-play')
    play.addEventListener('click', () => {
        // запрос начала игры
        request({
            url: `${backURL}start`,
            params: {
                token: window.application.token,
            },
            onSuccess: (data) => {
                if (data.status === 'ok') {
                    console.log(data)
                    window.application.id = data['player-status'].game.id
                    window.application.renderScreen('waitingGame');
                } else if (data.status === 'error') {
                    console.warn(data.message)
                 }

            }
        })

    })

}

window.application.blocks['playButton'] = renderPlayButtonBlock;

//блок кнопки вернуться в лобби

function renderGotoLobbyButtonBlock(container) {
    const gotoLobby = {
        tag: 'button',
        cls: 'button-golobby',
        content: 'Вернуться в Лобби!',
        attrs: {
            type: 'submit'
        }
    }

    container.append(templateEngine(gotoLobby));

    const gotoLobbyBtn = document.querySelector('.button-golobby')
    gotoLobbyBtn.addEventListener('click', () => {
        // возвращение в лобби
        window.application.renderScreen('lobby');

    })
}

window.application.blocks['gotoLobby'] = renderGotoLobbyButtonBlock;

