//Overview Div- Profile Information
const overview = document.querySelector(".overview");
//My username
const username = "ianmcdavid";
//Get profile info from GitHub
const getUser = async function() {
    const userResults = await fetch(`https://api.github.com/users/${username}`);
    const userData = await userResults.json();
    displayUser(userData);
    console.log(userData);
    
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
