//Overview Div- Profile Information
const overview = document.querySelector(".overview");
//My username
const username = "ianmcdavid";
//Repo list UL
const repoList = document.querySelector(".repo-list");
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