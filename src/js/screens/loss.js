function renderLossBlock(container) {
    const loss = {
        tag: 'div',
        cls: 'result-screen',
        content: [{
            tag: 'h2',
            cls: 'result_title',
            content: ['Упс... Вы проиграли ', { tag: 'i', cls: ['fa-regular', 'fa-face-sad-tear'] }],
        }, {
            tag: 'div',
            cls: 'result_wrapper',
            content: [{
                tag: 'div',
                cls: 'buttons',

            }, {
                tag: 'img',
                cls: 'result_img',
                attrs: {
                    src: 'src/img/loss.png',
                    alt: 'you are lost'
                },
            }]
        }]
    }
    container.append(templateEngine(loss));
}

window.application.blocks['loss'] = renderLossBlock;

function renderLossScreen() {
    window.application.timers.forEach(timer => {
        clearInterval(timer);
    });
    window.application.timers = [];
    const app = document.querySelector('.app');
    app.textContent = '';

    window.application.renderBlock('loss', document.querySelector('.app'));
    window.application.renderBlock('gotoLobby', document.querySelector('.buttons'));
    window.application.renderBlock('playButton', app.querySelector('.buttons'));
}

window.application.screens['lossScreen'] = renderLossScreen;
