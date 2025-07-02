document.addEventListener("DOMContentLoaded", () => {
  const mobileNav = document.querySelector('.mobile-nav');
  const mainMenu = document.querySelector('.main-menu');

  if (mobileNav && mainMenu) {
    mobileNav.addEventListener('click', () => {
      mainMenu.classList.toggle('active');
    });
  }
});
