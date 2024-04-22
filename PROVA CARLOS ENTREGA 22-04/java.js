const escala = 10;
let subtotal = 0;
let blocoSelecionadoParaRotacao = null; // Variável para armazenar o bloco selecionado para rotação

function desenharBloco() {
    const canvas = document.getElementById('canvas');
    const blocoSelecionado = document.getElementById('bloco').value;
    let alturaPixels, larguraPixels, preco;

    switch (blocoSelecionado) {
        case 'telhado':
            alturaPixels = 150;
            larguraPixels = 300;
            preco = 310;
            break;
        case 'parede':
            alturaPixels = 150;
            larguraPixels = 250;
            preco = 440;
            break;
        case 'porta':
            alturaPixels = 200;
            larguraPixels = 80;
            preco = 430;
            break;
        case 'janela':
            alturaPixels = 100;
            larguraPixels = 200;
            preco = 180;
            break;
        default:
    }

    const novoBloco = document.createElement('div');
    novoBloco.textContent = blocoSelecionado;
    novoBloco.className = 'espaco';
    novoBloco.style.left =
        Math.random() * (canvas.offsetWidth - larguraPixels) + 'px';
    novoBloco.style.top =
        Math.random() * (canvas.offsetHeight - alturaPixels) + 'px';
    novoBloco.style.width = larguraPixels + 'px';
    novoBloco.style.height = alturaPixels + 'px';
    novoBloco.setAttribute('data-preco', preco); // Adiciona o atributo de preço ao bloco

    switch (blocoSelecionado) {
        case 'telhado':
            novoBloco.style.backgroundImage = 'url(img/telhado.webp)';
            novoBloco.style.backgroundSize = 'cover';
            break;
        case 'parede':
            novoBloco.style.backgroundImage = 'url(img/parede2.avif)';
            novoBloco.style.backgroundSize = 'cover';
            break;
        case 'porta':
            novoBloco.style.backgroundImage = 'url(img/porta.gif)';
            novoBloco.style.backgroundSize = 'cover';
            break;
        case 'janela':
            novoBloco.style.backgroundImage = 'url(img/janela.gif)';
            novoBloco.style.backgroundSize = 'cover';

            break;
        default:
    }

    canvas.appendChild(novoBloco);

    // Adiciona o preço do bloco ao subtotal
    subtotal += preco;
    document.getElementById('subtotal').textContent =
        'Subtotal: R$ ' + subtotal.toFixed(2);

    novoBloco.addEventListener('mousedown', function (event) {
        let diferencaX =
            event.clientX - novoBloco.getBoundingClientRect().left;
        let diferencaY =
            event.clientY - novoBloco.getBoundingClientRect().top;

        function moverBloco(event) {
            let novoX = event.clientX - diferencaX;
            let novoY = event.clientY - diferencaY;

            if (
                novoX >= 0 &&
                novoX + novoBloco.offsetWidth <= canvas.offsetWidth &&
                novoY >= 0 &&
                novoY + novoBloco.offsetHeight <= canvas.offsetHeight
            ) {
                novoBloco.style.left = novoX + 'px';
                novoBloco.style.top = novoY + 'px';
            }
        }

        function pararMoverBloco() {
            document.removeEventListener('mousemove', moverBloco);
            document.removeEventListener('mouseup', pararMoverBloco);
        }

        document.addEventListener('mousemove', moverBloco);
        document.addEventListener('mouseup', pararMoverBloco);

        // Define o bloco como o bloco selecionado para rotação
        blocoSelecionadoParaRotacao = novoBloco;
    });
}

document.addEventListener('keydown', function (event) {
    // Verifica se a tecla pressionada é a tecla "Delete"
    if (event.key === 'Delete') {
        // Verifica se há um bloco selecionado para exclusão
        if (blocoSelecionadoParaRotacao) {
            // Remove o bloco selecionado do canvas
            const canvas = document.getElementById('canvas');
            canvas.removeChild(blocoSelecionadoParaRotacao);

            // Redefine a variável do bloco selecionado para rotação como nula
            blocoSelecionadoParaRotacao = null;
        }
    }

    // Verifica se a tecla pressionada é a tecla "R" e se há um bloco selecionado para rotação
    if (event.key === 'r' && blocoSelecionadoParaRotacao) {
        // Obtém o ângulo de rotação atual
        let rotation =
            parseInt(
                blocoSelecionadoParaRotacao.style.transform
                    .replace('rotate(', '')
                    .replace('deg)', '')
            ) || 0;

        // Incrementa o ângulo de rotação em 45 graus
        rotation += 45;

        // Aplica a rotação ao bloco selecionado
        blocoSelecionadoParaRotacao.style.transform = `rotate(${rotation}deg)`;
    }
});

let clickCount = 0; // Contador de cliques no botão de limpar tela

function limparTela() {
    const canvas = document.getElementById('canvas');
    const blocos = canvas.getElementsByClassName('espaco');

    // Se houver blocos no canvas
    if (blocos.length > 0) {
        // Remove apenas o último bloco
        const ultimoBloco = blocos[blocos.length - 1];
        const precoUltimoBloco = parseFloat(
            ultimoBloco.getAttribute('data-preco')
        );
        subtotal -= precoUltimoBloco;
        canvas.removeChild(ultimoBloco);
    }

    // Atualiza o subtotal na interface
    document.getElementById('subtotal').textContent =
        'Subtotal: R$ ' + subtotal.toFixed(2);

    // Incrementa o contador de cliques
    clickCount++;

    // Reinicia o contador após 1 segundo para permitir um novo clique
    setTimeout(function () {
        clickCount = 0;
    }, 1000);
}

function alternarTelaCheia() {
    const canvas = document.getElementById('canvas');
    if (!document.fullscreenElement) {
        canvas.requestFullscreen().catch((err) => {
            alert(`Erro ao tentar entrar em tela cheia: ${err.message}`);
        });
    } else {
        document.exitFullscreen();
    }
}

function voltarPaginaInicial() {
    window.location.href = 'INICIO.HTML';
}

function adicionarProjeto() {
    const inputImagem = document.getElementById('inputImagem');

    inputImagem.addEventListener('change', function (event) {
        const arquivo = event.target.files[0];

        if (arquivo) {
            const leitor = new FileReader();

            leitor.addEventListener('load', function () {
                const imagem = new Image();
                imagem.src = leitor.result;

                imagem.addEventListener('load', function () {
                    const canvas = document.getElementById('canvas');
                    canvas.appendChild(imagem);

                    const offsetX =
                        (canvas.offsetWidth - imagem.width) / 2;
                    const offsetY =
                        (canvas.offsetHeight - imagem.height) / 2;
                    imagem.style.left = offsetX + 'px';
                    imagem.style.top = offsetY + 'px';

                    subtotal += 100;
                    document.getElementById('subtotal').textContent =
                        'Subtotal: R$ ' + subtotal.toFixed(2);

                    imagem.addEventListener('mousedown', function (
                        event
                    ) {
                        let diferencaX =
                            event.clientX -
                            imagem.getBoundingClientRect().left;
                        let diferencaY =
                            event.clientY -
                            imagem.getBoundingClientRect().top;

                        function moverImagem(event) {
                            let novoX =
                                event.clientX - diferencaX;
                            let novoY =
                                event.clientY - diferencaY;

                            if (
                                novoX >= 0 &&
                                novoX + imagem.width <=
                                    canvas.offsetWidth &&
                                novoY >= 0 &&
                                novoY + imagem.height <=
                                    canvas.offsetHeight
                            ) {
                                imagem.style.left =
                                    novoX + 'px';
                                imagem.style.top =
                                    novoY + 'px';
                            }
                        }

                        function pararMoverImagem() {
                            document.removeEventListener(
                                'mousemove',
                                moverImagem
                            );
                            document.removeEventListener(
                                'mouseup',
                                pararMoverImagem
                            );
                        }

                        document.addEventListener(
                            'mousemove',
                            moverImagem
                        );
                        document.addEventListener(
                            'mouseup',
                            pararMoverImagem
                        );
                    });

                    // Define o bloco como o bloco selecionado para rotação
                    blocoSelecionadoParaRotacao = imagem;
                });

                imagem.addEventListener('error', function () {
                    alert('Erro ao carregar a imagem.');
                });
            });

            leitor.readAsDataURL(arquivo);
        }
    });

    inputImagem.click();
}

function refreshPage() {
    location.reload();
}
