fetch_data();
// --------------------------------- loading effect function -----------------------------

window.onload = () => {
  loading.style.display = "none";
};

// ------------------------------- these are selectors for select elements --------------------------

const menu_icon = document.querySelector(".menu-icon");
const sidebar_menu = document.querySelector(".sidebar");
const container = document.querySelector(".container");
const loading = document.querySelector(".loading");
const list_container = document.querySelector(".list-container");
const dark_mode = document.querySelector(".dark_mode");
const cream_mode = document.querySelector(".cream_mode");
const load_more = document.querySelector(".load_more");
const load_more_btn = document.querySelector(".load_more_btn");

// ------------------- this is load more function -------------

// this is show function

function show() {
  document.querySelector(".load_more").classList.add("show");
}

// this is hide function

function hide() {
  document.querySelector(".load_more").classList.remove("show");
}

// --------------------------------- dark mode  function -----------------------------
// --------------------------------- first color ---------------------------------

dark_mode.addEventListener("click", () => {
  document.documentElement.classList.toggle("dark_mode_on");

  if (localStorage.getItem("theme") === "light_mode") {
    localStorage.setItem("theme", "dark_mode");
  } else {
    localStorage.setItem("theme", "light_mode");
  }
});

// ----------------------------------- second color -------------------------------
cream_mode.addEventListener("click", () => {
  document.documentElement.classList.toggle("cream_mode_on");

  if (localStorage.getItem("theme") === "light_mode") {
    localStorage.setItem("theme", "cream_mode");
  } else {
    localStorage.setItem("theme", "light_mode");
  }
});

if (localStorage.getItem("theme") === "light_mode") {
  document.documentElement.classList.remove("dark_mode_on");
  document.documentElement.classList.remove("cream_mode_on");
}

// ============================================
else if (localStorage.getItem("theme") === "dark_mode") {
  document.documentElement.classList.add("dark_mode_on");
  document.documentElement.classList.remove("cream_mode_on");
}

// ============================================
else if (localStorage.getItem("theme") === "cream_mode") {
  document.documentElement.classList.add("cream_mode_on");
  document.documentElement.classList.remove("dark_mode_on");
}
// ============================================
else {
  localStorage.setItem("theme", "light_mode");
}

// --------------------------------- side bar menu  function -----------------------------

menu_icon.addEventListener("click", () => {
  sidebar_menu.classList.toggle("small_sidebar");
  container.classList.toggle("large-container");
});

// --------------------------------- img fetch api  function -----------------------------

async function fetch_data(range) {
  show();
  const url = await fetch(
    `https://jsonplaceholder.typicode.com/photos/?_limit=${
      range == null ? 15 : range
    }`
  )
    .then((data) => data.json())
    .then((items) => {
      // hide();
      get_img(items);
    });
}

// =================================

async function get_img(items) {
  let html = "";
  items.map((e, index) => {
    html += `
<div class="vid-list">
<a href="video${index + 1}.html">
  <img   src="https://picsum.photos/240/130?random=${e.id}" class="thumbnail" />
</a>
<div class="flex-div">
  <img  src="https://i.pravatar.cc/150?img${e.id}"/>

  <div class="vid-info">
    <a href="video.html"
      >${e.title}</a
    >
    <p>Easy Tutorials</p>
    <p>15k Views &bull; 2 days ago</p>
  </div>
</div>
</div>
`;
  });
  list_container.innerHTML = html;
}

window.addEventListener("scroll", () => {
  if (
    window.document.documentElement.offsetHeight - window.innerHeight - 500 <=
    window.pageYOffset
  ) {
    increments();
  }
});

// ---------------------------------  load more scroll function -----------------------------
let increment = 2;
function increments() {
  fetch_data(15 * increment++);
}

// ---------------------------------  load more btn  function -----------------------------

load_more_btn.addEventListener("click", () => {
  increments();
});
