const token = "";
const username = "BONBINOVNCH";

async function fetchRepos(){
   const url = `https://api.github.com/users/${username}/repos`;

   try {
      const response =  await fetch(url, {
         headers: {
            Authorization: `Bearer ${token}`
         }
      });

      if (!response.ok){
         throw new Error(`Error: ${response.status}`);
      }

      const repos = await response.json();

      console.log(repos);
      

      // const repoList =  document.getElementById("repo-list");
      // repos.forEach(repo => {
      //    const li = document.createElement("li");
      //    li.innerHTML = `
      //       <a href="${repo.html_url}" target="_blank">${repo.name}</a>`

      //    repoList.appendChild(li);
      // })

      const scrollBar = document.querySelector(".scrollBar_line")
      repos.forEach(repo => {
         if (repo.description && repo.topics.includes('done')){
            console.log(repo);
            
            let data = new Date(repo.updated_at);
            
            const recol = fetchReadme(repo.owner.login, repo.name)

            recol.then((u) => {

      
            scrollBar.innerHTML += `
                           <div class="scrollBar_block coffe" style="background-image: url('${u}')">
              <div class="scrollBar_block_title"><a href="projects/CoffeeFor You/index.html">${repo.name}</a></div>
              <div class="scrollBar_icon_wrap">
                <a href="${repo.html_url}">
                <img
                  src="images/open-in-new 1.png"
                  alt=""
                  class="scrollBar_icon"
                />
              </a>
              </div>
            </div>

            `;
            })
            console.log(fetchReadme(repo.owner.login, repo.name))

         }
      })

   } catch(error) {
      console.error("Error:", error);
      
   };
}

fetchRepos();


// async function fetchUser() {
//    const url = `https://api.github.com/users/${username}`;

//    try {
//       const response = await fetch(url, {
//          headers: {
//             Authorization: `Bearer ${token}`
//          }
//       });

//       if (!response.ok) {
//          throw new Error(`Error: ${response.status}`);
//       }

//       const user = await response.json();
//       console.log(user);
      
      
//       const userInfoDiv = document.getElementById("user-info");


//       userInfoDiv.innerHTML = `
//          <h2>${user.name || "No name"}</h2>
//          <p><strong>Username:</strong>${user.login}</p>
//          <p><strong>Bio:</strong>${user.bio}</p>
//          <img src="${user.avatar_url}" alt="" style="width: 100px; border-radius: 50%;">
//       `;

//    } catch (error) {
//       console.error("Error:", error);
      
//    };
// }

// fetchUser();


function fetchReadme(owner, repo){
   const url = `https://api.github.com/repos/${owner}/${repo}/readme`

    const newurl = fetch(url, {
      headers: {
         Authorization: `Bearer ${token}`
      }
   })
   .then(response => response.json())
   .then(data => {
      

      const decode = atob(data.content)
      console.log(decode);
      const mdImages = [...decode.matchAll(/!\[.*?\]\((.*?)\)/g)].map(m => m[1]);
      console.log(mdImages);

      let relative_path = mdImages[0]
      if(mdImages.length > 0) {
      
      relative_path = relative_path.slice(2)
      console.log(relative_path)
}


      const ingUrl = `http://raw.githubusercontent.com/${owner}/${repo}/main/${relative_path}`
      console.log(ingUrl)

      // getImg(ingUrl)
      return ingUrl
   })
return newurl

   // console.log(url);
   
}

// function getImg(url) {
//    let box = document.querySelector(".repo-item")
//    let img = document.createElement('img')
//    img.src = url;
//    box.appendChild(img)

// }

