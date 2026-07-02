async function getGithubInfo(owner, repo){
    const url = 'https://github.com{owner}/${repo}';
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
};

getGithubInfo('LionArtCodingStudio', 'LionArtCodingStudio');

template (){

};