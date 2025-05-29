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
            <div class="box_project left">
               <div class="box_left">
                  <img class="repoFoto" src="https://raw.githubusercontent.com/YuraKhalus/fakestore/main/src/img/readme/mainPage.png" alt="Mocap">
               </div>
               <div class="box_right">
                  <div class="box_content">
                     <h3 class="project_title">Fake api</h3>
                     <p class="project_description">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Earum vitae eligendi saepe nihil tempore quaerat reprehenderit ipsam ipsum provident, mollitia iste veritatis. Alias eum voluptatum doloremque dolores enim cupiditate suscipit.</p>
                     <div class="tags">
                        <span class="tag">HTML</span>
                        <span class="tag">CSS</span>
                        <span class="tag">JavaScript</span>
                        <span class="tag">Git</span>
                        <span class="tag">GitHub</span>
                        <span class="tag">Trello</span>
                        <span class="tag">Figma</span>
                     </div>
                     <a href="https://github.com/YuraKhalus/fakestore" target="_blank">
                        <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                           <path d="M24 19V25C24 25.5304 23.7893 26.0391 23.4142 26.4142C23.0391 26.7893 22.5304 27 22 27H11C10.4696 27 9.96086 26.7893 9.58579 26.4142C9.21071 26.0391 9 25.5304 9 25V14C9 13.4696 9.21071 12.9609 9.58579 12.5858C9.96086 12.2107 10.4696 12 11 12H17" stroke="#4B5563" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                           <path d="M21 9H27V15" stroke="#4B5563" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                           <path d="M16 20L27 9" stroke="#4B5563" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                     </a>
                     

                  </div>
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

