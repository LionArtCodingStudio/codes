async function getGithubInfo(id) {
  try {
    const response = await fetch('projetos.json');
    
    const projetos = await response.json();
    
    const data = projetos.find(projeto => projeto.id === Number(id));
    
    if (data) {
      console.log(data);
      console.log(`Projeto: ${data.nome}`); 
    } else {
      console.log(`Projeto com o ID ${id} não foi encontrado.`);
    }

  } catch (error) {
    console.error("Erro ao buscar os dados:", error);
  }
}

// Executa a função
getGithubInfo('1');
getGithubInfo('2');

