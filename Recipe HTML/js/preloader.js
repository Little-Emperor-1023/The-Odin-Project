window.addEventListener("load", () => {
  const preloader = document.querySelector(".preloader");
  const follower = document.getElementById("follower");

  setTimeout(() => {
    preloader.classList.add("fade-out");

    setTimeout(() => {
      preloader.style.display = "none";

      if (follower) {
        follower.classList.add("visible");
      } else {
        console.error("Follower element not found!");
      }

      document.body.classList.add("loaded");

    }, 600); 
  }, 1000); 
});
