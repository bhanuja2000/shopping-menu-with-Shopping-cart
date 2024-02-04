const menuBtn = document.getElementById('menu-btn');
const menuOverlay = document.querySelector('.menu-overlay');
const navbar = document.querySelector('.navbar');
const searchBtn = document.getElementById('search-btn');
const searchBar = document.querySelector('.search-bar-container');
const header = document.querySelector('header');
var lastScrollTop = 0;


window.onscroll = () => {   
    menuOverlay.classList.remove('active');
    navbar.classList.remove('active');
    searchBar.classList.remove('active');
    searchBtn.classList.remove('fa-times');
    menuBtn.classList.remove('fa-times');
}

window.addEventListener("scroll", function(){
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > lastScrollTop){
       header.style.top = "-80px";
    } else {
        header.style.top = "0";
    }
    lastScrollTop = scrollTop;
}, false);


menuBtn.addEventListener('click', () => {
  menuOverlay.classList.toggle('active');
  navbar.classList.toggle('active');
  menuBtn.classList.toggle('fa-times');
});

searchBtn.addEventListener('click', () => {
  searchBar.classList.toggle('active');
  searchBtn.classList.toggle('fa-times');
});
