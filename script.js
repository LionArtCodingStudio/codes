async function getProjectInfo(id) {
  try {
    const response = await fetch('Projetos.json');
    
    const projetos = await response.json();
    
    const data = projetos.find(projeto => projeto.id === Number(id));
    
    return data;

  } catch (error) {
    return 0;
  }
}

// Executa a função
has_project = true; //manten o loop aberto enquanto houver projetos
do {
  for (let i = 1; i <= 10; i++) { // Supondo que tenha 10 projetos
    const data = await getProjectInfo(i);
    if (data) {
      console.log(`Projeto: ${data.id} - ${data.nome}`);
      console.log(`Data de Início: ${data.data_publicacao}`);
      console.log(`Descrição: ${data.descricao}`);
      template
    }
    if (!data) {
      has_project = false;
    }
  }
} while (has_project==true); 

async function getPageInfo(id) {

  const projetosContainer = document.querySelector ('.projetos');
  const template = document.getElementById('.template');

  fecth ('Projetos.json')
  .then(response => response.json())
  .then(data => {
    data.foreach(projeto => {
      const clone = template.content.cloneNode(true);
      clone.querySelector('.nome').textContent = projeto.nome;
      clone.querySelector('.data_publicacao').textContent = projeto.data_publicacao;
      clone.querySelector('.descricao').textContent = projeto.descricao;
      
      const link = clone.querySelector('a');
      link.href = `projeto.html?id=${projeto.id}`;
    });
  })
  .catch(error => console.error('Erro ao carregar os projetos:', error));
};
