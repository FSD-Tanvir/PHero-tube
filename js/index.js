const loadData = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/videos/categories"
  );
  const allData = await res.json();
  const categories = allData.data;
  showTabs(categories);
};

const showTabs = (categories) => {
  const tabsContainer = document.getElementById("tabs");
  categories.forEach((category) => {
    const div = document.createElement("div");
    div.innerHTML = `<a onclick = "handelLoadData('${category.category_id}')" class="btn">${category.category}</a> `;
    tabsContainer.appendChild(div);
  });
};

const handelLoadData = async (categoryId) => {
  const res = await fetch(
    ` https://openapi.programming-hero.com/api/videos/category/${categoryId}`
  );
  const allData = await res.json();
  const cardContainer = document.getElementById("card-container");
  const iconContainer = document.getElementById("icon-container");
  cardContainer.textContent = "";
  iconContainer.textContent = "";
  const data = allData.data;
  console.log(data);
  if (data.length === 0) {
    const div = document.createElement("div");
    div.classList = "flex flex-col justify-center items-center";
    div.innerHTML = `
        <img src="./images/icon.png" alt="" >
      <p class="text-5xl font-bold text-center">Oops!! Sorry, There is no content here</p>
        `;
    iconContainer.appendChild(div);
  } else {
    data.forEach((video) => {
      if (video?.authors[0].verified) {
        const div = document.createElement("div");
        div.innerHTML = `
            <div class="card  bg-base-100 shadow-xl">
            <figure><img class= "h-40 w-80" src="${video?.thumbnail}" /></figure>
            <div class="card-body">
            <div class="flex gap-2">
            <img class= "h-10 w-10 rounded-full " src=${video?.authors[0].profile_picture} />
            <h2 class="card-title">${video.title}</h2>
            </div>
            <div class="flex gap-2">
                <h2>${video?.authors[0].profile_name}</h2>
                <span><img src="./images/verified.png" alt="" ></span>
            </div>
                <p>${video?.others.views} views</p>
            </div>
            </div>
            `;
        cardContainer.appendChild(div);
      } else {
        const div = document.createElement("div");
        div.innerHTML = `
            <div class="card  bg-base-100 shadow-xl">
            <figure><img class= "h-40 w-80" src="${video?.thumbnail}" /></figure>
            <div class="card-body">
            <div class="flex gap-2">
            <img class= "h-10 w-10 rounded-full " src=${video?.authors[0].profile_picture} />
            <h2 class="card-title">${video.title}</h2>
            </div>
            <div class="flex gap-2">
                <h2>${video?.authors[0].profile_name}</h2>
            </div>
                <p>${video?.others.views} views</p>
            </div>
            </div>
            `;
        cardContainer.appendChild(div);
      }
    });
  }
};

const Home = () => {
  window.location.replace("./index.html");
};

const blogPage = () => {
  window.location.replace("./blog.html");
};

loadData();
handelLoadData(1000);
