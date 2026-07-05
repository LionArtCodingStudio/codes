// Executa as funções corretas dependendo de qual página o usuário está acessando
document.addEventListener('DOMContentLoaded', () => {
    // Se existir o container de projetos, renderiza a lista (Página Index)
    if (document.querySelector('.projetos') && document.getElementById('template')) {
        renderizarProjetosIndex();
    }
    
    // Se estiver na página de detalhes do projeto, carrega os dados específicos
    if (document.getElementById('detalhe-projeto')) {
        carregarDetalhesProjeto();
    }

    // Se estiver na página de contato, ativa a validação do formulário
    if (document.getElementById('form-contato')) {
        configurarValidacaoContato();
    }
});

// FUNÇÃO 1: Renderiza dinamicamente os projetos na página principal (index.html)
function renderizarProjetosIndex() {
    const projetosContainer = document.querySelector('.projetos');
    const template = document.getElementById('template');

    projetosContainer.innerHTML = '';

    fetch('Projetos.json')
        .then(response => response.json())
        .then(data => {
            data.forEach(projeto => {
                const clone = template.content.cloneNode(true);
                
                // Preenche os dados usando as classes que você definiu no template
                clone.querySelector('.Projetos-nome').textContent = projeto.nome;
                clone.querySelector('.Projetos-data_publicacao').textContent = `inicio: ${projeto.data_publicacao}`;
                clone.querySelector('.Projetos-descricao').textContent = projeto.descricao;
                
                // Configura o link para abrir a página detalhada passando o ID na URL
                const link = clone.querySelector('a');
                link.href = `projeto.html?id=${projeto.id}`;
                
                projetosContainer.appendChild(clone);
            });
        })
        .catch(error => console.error('Erro ao carregar os projetos:', error));
}

// FUNÇÃO 2: Carrega os dados de um único projeto na página projeto.html
async function carregarDetalhesProjeto() {
    // Pega o ID passado pela URL (ex: projeto.html?id=1)
    const urlParams = new URLSearchParams(window.location.search);
    const idProjeto = urlParams.get('id');

    if (!idProjeto) return;

    try {
        const response = await fetch('Projetos.json');
        const projetos = await response.json();
        const projeto = projetos.find(p => p.id === Number(idProjeto));

        if (projeto) {
            // Atualiza os elementos da página projeto.html
            document.getElementById('nome-projeto').textContent = projeto.nome.toUpperCase();
            document.getElementById('desc-projeto').textContent = projeto.descricao;
            document.getElementById('link-repositorio').href = projeto.repositorio;
            document.getElementById('linguagens').textContent = projeto.linguagens;
        }
    } catch (error) {
        console.error('Erro ao carregar detalhes do projeto:', error);
    }
}

// FUNÇÃO 3: Validação do formulário de contato (Requisito obrigatório do MAPA)
function configurarValidacaoContato() {
    const form = document.getElementById('form-contato');
    form.addEventListener('submit', function(event) {
        const nome = document.getElementById('nome').value.trim();
        const email = document.getElementById('email').value.trim();
        const mensagem = document.getElementById('mensagem').value.trim();

        if (nome === '' || email === '' || mensagem === '') {
            event.preventDefault(); // Impede o envio do formulário
            alert('Por favor, preencha todos os campos obrigatórios (Nome, E-mail e Mensagem).');
        } else {
            alert('Mensagem enviada com sucesso! (Simulação)');
        }
    });
}