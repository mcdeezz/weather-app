// check if service workers are supported
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("../sw_offline_pages.js")
      .then((reg) => {})
      .catch((err) => {
        console.log(`Service Worker: Error: ${err}`);
      });

    // declaring variables for my tabbed view
    const tabs = document.querySelectorAll(".tablinks");
    const tabPages = document.querySelectorAll(".tab-page");

    //switch between tabs
    tabs[0].classList.add("active");
    tabPages[0].classList.add("active");
    for (let i = 0; i < tabs.length; i += 1) {
      tabs[i].addEventListener("click", () => {
        tabs[i].classList.add("active");
        tabPages[i].classList.add("active");
        if (tabs[i + 1] !== undefined) {
          tabs[i + 1].classList.remove("active");
          tabPages[i + 1].classList.remove("active");
        } else {
          tabs[i - 1].classList.remove("active");
          tabPages[i - 1].classList.remove("active");
        }
      });
    }

    initializeOnload();
  });
}
