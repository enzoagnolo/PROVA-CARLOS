const escala = 10; 
        let subtotal = 0;

        function desenharBloco() {
            const canvas = document.getElementById('canvas');
            const blocoSelecionado = document.getElementById('bloco').value;
            let alturaPixels, larguraPixels, preco;

            
            switch(blocoSelecionado) {
                case 'telhado':
                    alturaPixels = 150;
                    larguraPixels = 300;
                    preco = 54;
                    break;
                case 'parede':
                    alturaPixels = 100;
                    larguraPixels = 200;
                    preco = 50;
                    break;
                case 'porta':
                    alturaPixels = 200;
                    larguraPixels = 80;
                    preco = 430;
                    break;
                case 'janela':
                    alturaPixels = 100;
                    larguraPixels = 200;
                    preco = 580;
                    break;             
                default:
                    alturaPixels = 100;
                    larguraPixels = 100;
                    preco = 0;
            }

            
            const novoBloco = document.createElement('div');
            novoBloco.textContent = blocoSelecionado; 
            novoBloco.className = 'espaco';
            novoBloco.style.left = Math.random() * (canvas.offsetWidth - larguraPixels) + 'px';
            novoBloco.style.top = Math.random() * (canvas.offsetHeight - alturaPixels) + 'px';
            novoBloco.style.width = larguraPixels + 'px';
            novoBloco.style.height = alturaPixels + 'px';

            
            switch(blocoSelecionado) {
                case 'telhado':
                    novoBloco.style.backgroundImage = 'url(./imagem/telhado.webp)';
                    novoBloco.style.backgroundSize = 'cover'; 
                    break;
                case 'parede':
                    novoBloco.style.backgroundImage = 'url(./imagem/parede2.avif)';
                    novoBloco.style.backgroundSize = 'cover'; 
                    break;
                case 'porta':
                    novoBloco.style.backgroundImage = 'url(./imagem/porta.gif)';
                    novoBloco.style.backgroundSize = 'cover'; 
                    break;
                case 'janela':
                    novoBloco.style.backgroundImage = 'url(./imagem/janela.gif)';
                    novoBloco.style.backgroundSize = 'cover'; 
                    break;
                default:
            }

            
            canvas.appendChild(novoBloco);

            subtotal += preco;
            document.getElementById('subtotal').textContent = 'Subtotal: R$ ' + subtotal.toFixed(2);

            novoBloco.addEventListener('mousedown', function(event) {
                let diferencaX = event.clientX - novoBloco.getBoundingClientRect().left;
                let diferencaY = event.clientY - novoBloco.getBoundingClientRect().top;

                function moverBloco(event) {
                    let novoX = event.clientX - diferencaX;
                    let novoY = event.clientY - diferencaY;

                    if (novoX >= 0 && novoX + novoBloco.offsetWidth <= canvas.offsetWidth &&
                        novoY >= 0 && novoY + novoBloco.offsetHeight <= canvas.offsetHeight) {
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
            });
        }

        switch(blocoSelecionado) {
            case 'telhado':
                novoBloco.style.width = '10';
                novoBloco.style.height = '10';
                novoBloco.style.borderLeft = '150px solid transparent'; // Largura da base do triângulo
                novoBloco.style.borderRight = '150px solid transparent'; // Largura da base do triângulo
                novoBloco.style.borderBottom = '150px solid #ffffff'; // Altura do triângulo
                novoBloco.style.position = 'relative'; // Para que a posição absoluta funcione corretamente
                novoBloco.style.top = 'calc(50% - 75px)'; // Centraliza verticalmente
                novoBloco.style.left = 'calc(50% - 150px)'; // Centraliza horizontalmente
                break;
        }
        

        function alternarTelaCheia() {
            const canvas = document.getElementById('canvas');
            if (!document.fullscreenElement) {
                canvas.requestFullscreen().catch(err => {
                    alert(`Erro ao tentar entrar em tela cheia: ${err.message}`);
                });
            } else {
                document.exitFullscreen();
            }
        }

        function limparTela() {
            const canvas = document.getElementById('canvas');
            canvas.innerHTML = ''; 
            subtotal = 0; 
            document.getElementById('subtotal').textContent = 'Subtotal: R$ ' + subtotal.toFixed(2);
        }

        function voltarPaginaInicial() {
            window.location.href = "INICIO.HTML";
        }

        function adicionarProjeto() {
           
            const inputImagem = document.getElementById('inputImagem');
        
            inputImagem.addEventListener('change', function(event) {
                const arquivo = event.target.files[0]; 
    
            
                if (arquivo) {
                    const leitor = new FileReader(); 
    
                    leitor.addEventListener('load', function() {
                        const imagem = new Image(); 
                        imagem.src = leitor.result; 
    
                       
                        imagem.addEventListener('load', function() {

                            const canvas = document.getElementById('canvas');
                            canvas.appendChild(imagem);

                            const offsetX = (canvas.offsetWidth - imagem.width) / 2;
                            const offsetY = (canvas.offsetHeight - imagem.height) / 2;
                            imagem.style.left = offsetX + 'px';
                            imagem.style.top = offsetY + 'px';
    
                            subtotal += 100; 
                            document.getElementById('subtotal').textContent = 'Subtotal: R$ ' + subtotal.toFixed(2);

                            imagem.addEventListener('mousedown', function(event) {
                                let diferencaX = event.clientX - imagem.getBoundingClientRect().left;
                                let diferencaY = event.clientY - imagem.getBoundingClientRect().top;

                                function moverImagem(event) {
                                    let novoX = event.clientX - diferencaX;
                                    let novoY = event.clientY - diferencaY;

                                    if (novoX >= 0 && novoX + imagem.width <= canvas.offsetWidth &&
                                        novoY >= 0 && novoY + imagem.height <= canvas.offsetHeight) {
                                        imagem.style.left = novoX + 'px';
                                        imagem.style.top = novoY + 'px';
                                    }
                                }

                                function pararMoverImagem() {
                                    document.removeEventListener('mousemove', moverImagem);
                                    document.removeEventListener('mouseup', pararMoverImagem);
                                }

                                document.addEventListener('mousemove', moverImagem);
                                document.addEventListener('mouseup', pararMoverImagem);
                                
                            });
                        });
    
                        imagem.addEventListener('error', function() {
                            alert('Erro ao carregar a imagem.');
                        });
                    });
                        
                    leitor.readAsDataURL(arquivo);
                }
            });
    
            
            inputImagem.click();
        }