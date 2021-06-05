//Overview Div- Profile Information
const overview = document.querySelector(".overview");
//My username
const username = "ianmcdavid";
//Repo list UL
const repoList = document.querySelector(".repo-list");
//Repos section
const repos = document.querySelector(".repos");
//Individual repo info sections
const reposData = document.querySelector(".repo-data");

//Get profile info from GitHub API
const getUser = async function() {
    const userResults = await fetch(`https://api.github.com/users/${username}`);
    const userData = await userResults.json();
    displayUser(userData);
    //console.log(userData);
    
};
getUser();


//Display Profile Info
const displayUser = function(userData) {
    const infoDiv = document.createElement("div");
    infoDiv.classList.add("user-info");
    infoDiv.innerHTML = `<figure>
    <img alt="user avatar" src=${userData.avatar_url} />
  </figure>
  <div>
    <p><strong>Name:</strong> ${userData.name}</p>
    <p><strong>Bio:</strong> ${userData.bio}</p>
    <p><strong>Location:</strong> ${userData.location}</p>
    <p><strong>Number of public repos:</strong> ${userData.public_repos}</p>
  </div>`;
    overview.append(infoDiv);
};

//Get repo data from GitHub API
const getRepos = async function() {
    const repoResults = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const repoData = await repoResults.json();
    
    //console.log(listItem);
    displayRepos(repoData);
};
getRepos();

//Displays Repo Info
const displayRepos = function(repoData) {
    for (let repo of repoData) {
        let listItem = repo;
        listItem = document.createElement("li");
        listItem.classList.add("repo");
        listItem.innerHTML = `<h3>${repo.name}`;
        repoList.append(listItem);
    }
};

//To listen for a click on different repos
repoList.addEventListener("click", function(e) {
    if (e.target.matches("h3")) {

        const repoName = e.target.innerText;
        getRepo(repoName);
    }
}); 

//Get repo info from GitHub API
const getRepo = async function(repoName) {
    const repoResults = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
    const repoInfo = await repoResults.json();
    const fetchLanguages = await fetch(repoInfo.languages_url);
    const languageData = await fetchLanguages.json();
    console.log(repoInfo);
    const languages = [];
    for (let language in languageData) {
        languages.push(language);
    }
    //console.log(languages);
    displayRepo(repoInfo, languages);
};

//Display repo information
const displayRepo = function(repoInfo, languages) {
    reposData.innerHTML = "";
    const repoDisplay = document.createElement("div");
    repoDisplay.innerHTML = `<h3>Name: ${repoInfo.name}</h3>
    <p>Description: ${repoInfo.description}</p>
    <p>Default Branch: ${repoInfo.default_branch}</p>
    <p>Languages: ${languages.join(", ")}</p>
    <a class="visit" href="${repoInfo.svn_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>`;
    reposData.append(repoDisplay);
    reposData.classList.remove("hide");
    repos.classList.add("hide");
};