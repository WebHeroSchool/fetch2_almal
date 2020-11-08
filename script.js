let url = window.location.toString();

let getUsername = (url) => {
    let urlArray = url.split('=');
    let userName = urlArray[1];
    if(userName == undefined){
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
      let body = document.body;
      let avatar = userInfo.avatar_url;
      let name = userInfo.login;
      let bio = userInfo.bio;
      let login = userInfo.html_url;
      let elementForPreloader = document.getElementById('loader');
      elementForPreloader.className = 'active';
      if (name) {
        let createLogin = () => {
          let elementName = document.createElement('h2');
          elementName.innerText = name;
          elementName.className='active_login';
          document.body.append(elementName);
        };

        let createName = () => {
          let elementLink = document.createElement('a');
          elementLink.innerHTML = userInfo.name;
          elementLink.href = login;
          document.body.append(elementLink);
        };

        let createAvatar = () => {
          let elementAvatar = document.createElement('img');
          elementAvatar.src = avatar;
          document.body.append(elementAvatar);
        };

        let createBio = () => {
          let elementBio = document.createElement('p');
          elementBio.innerHTML = bio;
          document.body.append(elementBio);
        }

        let elementDate = document.createElement('p');
        elementDate.innerHTML = currentDate;
        document.body.append(elementDate);

        createLogin();
        createName();
        createBio();
        createAvatar();
      }
      else {
        let createError = () => {
          let elementError = document.createElement('h1');
          elementError.innerText = ' Информация о пользователе не найдена ';
          document.body.append(elementError);
      }
      elementError();
    }
})

.catch(err => alert('Информация не доступна: ' + err));
