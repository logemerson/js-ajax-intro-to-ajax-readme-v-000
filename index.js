function getRepositories() {
  const req = new XMLHttpRequest();
  req.addEventListener("load", showRepositories);
  req.open("GET", "https://api.github.com/users/octocat/repos");
  req.send();
}

function showRepositories(event, data) {
  //create variable to hold response JSON
  const repos = JSON.parse(this.responseText);

  // ==== VERSION WITHOUT LINK ====
  // //create variable for list of repos
  // //begin the HTML element of repo list with list tag
  // let repoList = "<ul>";
  //
  // //for every repo, create a list element and
  // //display the "name" property for each
  // for (var i = 0; i < repos.length; i++) {
  //   repoList += "<li>" + repos[i]["name"] + "</li>";
  // }
  // //close list with tag
  // repoList += "</ul>";
  // ========

  // ==== VERSION WITH LINK ====
  const repoList = `<ul>${repos
    .map(
      repo =>
        "<li>" +
        repo.name +
        ' - <a href="#" data-repo="' +
        repo.name +
        '" onclick="getCommits(this)">Get Commits</a></li>'
    )
    .join("")}</ul>`;

  //place this repoList into the  "repositories" div
  document.getElementById("repositories").innerHTML = repoList;
}

function getCommits(element) {
  const name = element.dataset.repo;
  const req = new XMLHttpRequest();

  req.addEventListener("load", showCommits);
  req.open("GET", "https://api.github.com/repos/octocat/" + name + "/commits");
  req.send();
}

function showCommits() {
  const commits = JSON.parse(this.responseText);
  const commitsList = `<ul>${commits
    .map(
      commit =>
        "<li><strong>" +
        commit.author.login +
        "</strong> - " +
        commit.commit.message +
        "</li>"
    )
    .join("")}</ul>`;

  document.getElementById("commits").innerHTML = commitsList;
}
