let url = window.location.toString();
let getUsername = (url) => {
    let urlArray = url.split('=');
    let userName = urlArray[1];
    if(isNaN(userName)){
        userName = 'Alenamal';
    }
    return userName;
}
let name = getUsername(url);

fetch('https://api.github.com/users/' + name)
    .then(result => result.json())
    .then(json => {
      const body = document.body;

      const gitHubUser = document.createElement('h2');
      gitHubUser.innerHTML = json.login;
      body.append(gitHubUser);

      const gitHubUserName = document.createElement('a');
      gitHubUserName.innerHTML = json.name;
      gitHubUserName.href = json.html_url;
      body.append(gitHubUserName);

      const gitHubUserBio = document.createElement('p');
      gitHubUserBio.innerHTML = json.bio;
      body.append(gitHubUserBio);

      const gitHubUserAvatar = document.createElement('img');
      gitHubUserAvatar.src = json.avatar_url;
      body.append(gitHubUserAvatar);
      })
.catch(err => alert('Информация не доступна: ' + err));
