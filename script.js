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

let getNowDate = new Promise((resolve, reject) => {
    let nowDate = new Date();
    setTimeout(() => nowDate ? resolve(nowDate) : reject ('Время не определенно'), 3000)
  });
let getUserData = fetch('https://api.github.com/users/' + name);

Promise.all([getUserData, getNowDate])
    .then(([ourUserData, ourNowDate]) => {
        userData = ourUserData;
        currentDate = ourNowDate;
    })

    .then(result => userData.json())
    .then(userInfo => {
      const body = document.body;

      let elementForPreloader = document.getElementById('loader');
      elementForPreloader.className = 'active';

      const gitHubUser = document.createElement('h2');
      gitHubUser.innerHTML = userInfo.login;
      gitHubUser.className='active_login';
      body.append(gitHubUser);

      const gitHubUserName = document.createElement('a');
      gitHubUserName.innerHTML = userInfo.name;
      gitHubUserName.href = userInfo.html_url;
      body.append(gitHubUserName);

      const gitHubUserBio = document.createElement('p');
      gitHubUserBio.innerHTML = userInfo.bio;
      body.append(gitHubUserBio);

      const gitHubUserAvatar = document.createElement('img');
      gitHubUserAvatar.src = userInfo.avatar_url;
      body.append(gitHubUserAvatar);

      const elementDate = document.createElement('p');
      elementDate.innerHTML = currentDate;
      body.appendChild(elementDate);
      })
.catch(err => alert('Информация не доступна: ' + err));
