function renderWinBlock(container) {
    const win = {
        tag: 'div',
        cls: 'result-screen',
        content: [{
            tag: 'h2',
            cls: 'result_title',
            content: ['Ура! Победа! ', { tag: 'i', cls: ['fa-regular', 'fa-face-laugh-beam'] }],
        }, {
            tag: 'div',
            cls: 'result_wrapper',
            content: [{
                tag: 'div',
                cls: 'buttons',

            }, {
                tag: 'img',
                cls: ['result_img', 'win_img'],
                attrs: {
                    src: 'src/img/win.png',
                    alt: 'you are lost'
                },
            }]
        }]
    }
    container.append(templateEngine(win));
}

window.application.blocks['win'] = renderWinBlock;

function renderWinScreen() {
    window.application.timers.forEach(timer => {
        clearInterval(timer);
    });
    window.application.timers = [];
    const app = document.querySelector('.app');
    app.textContent = '';

    window.application.renderBlock('win', document.querySelector('.app'));
    window.application.renderBlock('gotoLobby', document.querySelector('.buttons'));
    window.application.renderBlock('playButton', app.querySelector('.buttons'));
    app.querySelector('.button-play').textContent ='Играть ещё!'

}

window.application.screens['winScreen'] = renderWinScreen;

