let contain = document.getElementById("contain");
let body = document.querySelector("body");
let url = "https://api.github.com/users/"
let userName = document.getElementById("userName");
let searchUser = document.getElementById("searchUser");
let getData = async (user)=>{
    contain.innerHTML = "";
    contain.innerHTML = `
    <div class="content-loaders">
     <svg viewBox="25 25 50 50">
       <circle r="20" cy="50" cx="50"></circle>
     </svg> 
    </div>
    
    `
    let promise = await fetch(url+user);
    console.log(userName.value);
    let data = await promise.json();
    console.log(data);
    if(data.status === "404"){
        contain.innerHTML = `
        <div class="message">
        <span><i class="fa-solid fa-user"></i></span>
         <p>User Not Found</p> 
         </div> 
         `
    }else{
        contain.innerHTML =
        `
         <div class="details">
                   <div class="profile"><img onclick="openProfile(this)" src="${data.avatar_url}  alt=""></div>
                   <div class="info">
                       <div class="basic-info">
                           <div class="info-box" onclick="showFollowers('${data.followers_url}')"><p><span class="icon"><i class="fa-solid fa-user"></i></span> <span class="bold">${data.followers}</span> followers</p></div>
                           <div class="info-box" onclick="showFollowing('${data.login}')"><p><span class="icon"><i class="fa-solid fa-user"></i></span> <span class="bold">${data.following}</span> Following</p></div>
                           <div class="info-box" onclick="showRepos('${data.repos_url}')"><p><span class="icon"><i class="ri-git-repository-line"></i></span> <span class="bold">${data.public_repos}</span> repos</p></div>
                       </div>
                       <div class="personal-info">
                       <div><h3>${(data.name) ? data.name : ""}</h3></div>
                           <div><p>${data.login} <a href="${data.html_url}" target="_blank"><i class="fa-solid fa-arrow-up-right-from-square"></i></a></p></div>
                           <div><p>${(data.bio) ? data.bio : "" }</div>
                       </div>
                   </div>
               </div>
        `
    }

} 
searchUser.addEventListener("click",()=>{
    getData(userName.value);
})
function openProfile(img){
    let imgSrc = img.src;
    body.innerHTML += `
    <div class="imgCover">
         <div class="fullimg">
            <img src="${imgSrc}" alt="" width="100%">
            <div class="close" onclick="removeCover(this)"><i class="fa-solid fa-xmark"></i></div>
        </div>
    </div>
      `
    

}
async function showFollowers(followers){
    let imgCover = document.createElement("div")
    imgCover.className = 'imgCover'
    imgCover.innerHTML += `
        <div class="details-contain">
             <h3 style="text-align: center;">Followers</h3>
             <div id="followersDiv"></div>
             <div class="close" onclick="removeCover(this)"><i class="fa-solid fa-xmark"></i></div>
        </div>
    `
    body.append(imgCover)
    let followersDiv = document.getElementById("followersDiv")
    followersDiv.innerHTML = `
      <div class="content-loaders">
         <svg viewBox="25 25 50 50">
          <circle r="20" cy="50" cx="50"></circle>
         </svg> 
      </div>
    `
    let promise = await fetch(followers)
    let followersData = await promise.json();
    console.log(followersData);
    followersDiv.innerHTML = "";
    followersData.map((e)=>{
        followersDiv.innerHTML += `
         <div class="user-profile">
                <img src="${e.avatar_url}" alt="" >
                 <a href="${e.html_url}" target="_blank"">${e.login}</a>
            </div>
        `
    })
}
async function showFollowing(userId){
    console.log(userId)
    let followingUrl = `https://api.github.com/users/`
    let imgCover = document.createElement("div");
    imgCover.className = "imgCover"
    imgCover.innerHTML += `
         <div class="details-contain">
              <h3 style="text-align: center;">following</h3>
              <div id="followersDiv"></div>
              <div class="close" onclick="removeCover(this)"><i class="fa-solid fa-xmark"></i></div>
         </div>
    `
    body.append(imgCover)

    let followersDiv = document.getElementById("followersDiv");
    followersDiv.innerHTML = `
      <div class="content-loaders">
         <svg viewBox="25 25 50 50">
          <circle r="20" cy="50" cx="50"></circle>
         </svg> 
      </div>
   `
    let promise = await fetch(followingUrl+userId+"/following");
    let followingData = await promise.json()
    console.log(followingData);
    followersDiv.innerHTML = "";
    followingData.map((e)=>{
        followersDiv.innerHTML += `
         <div class="user-profile">
                <img src="${e.avatar_url}" alt="" >
                <a href="${e.html_url}" target="_blank">${e.login}</a>
            </div>
        `
    })
}
async function showRepos(repo){
    let imgCover = document.createElement("div");
    imgCover.className = "imgCover"
    imgCover.innerHTML += `
        <div class="details-contain">
             <h3 style="text-align: center;">Repos</h3>
             <div id="followersDiv"></div>
             <div class="close" onclick="removeCover(this)"><i class="fa-solid fa-xmark"></i></div>
        </div>
    `
    body.append(imgCover)
    let reposDiv = document.getElementById("followersDiv");
    reposDiv.innerHTML = `
       <div class="content-loaders">
         <svg viewBox="25 25 50 50">
          <circle r="20" cy="50" cx="50"></circle>
         </svg> 
      </div>
    `
    let promise = await fetch(repo)
    let reposData = await promise.json();
    console.log(reposData);
    reposDiv.innerHTML = "";
    reposData.map((e)=>{
        reposDiv.innerHTML += `
         <div class="user-profile">
                 <div class="user-profile">
                    <div class="repo-icon"><i class="ri-git-repository-line"></i></div>
                    <a href="${e.html_url}" target="_blank"">${e.name}</a>
                </div>
            </div>
        `
    })


}
function removeCover(rem){
    rem.parentNode.parentNode.remove()
    // rem.parentElement.parentElement.remove()
    // // rem.parentElement.remove()
    // // rem.remove();
}

