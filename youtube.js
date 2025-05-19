// ==UserScript==
// @name         youtube scripts
// @namespace    http://tampermonkey.net/
// @version      2025-05-19
// @description  make yt less evil again
// @match        https://www.youtube.com/
// @match        https://m.youtube.com/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  const shelvesToHide = [
    {
      selector: "ytd-rich-shelf-renderer",
      titles: ["shorts", "youtube playables"],
    },
  ];

  function hideSections() {
    shelvesToHide.forEach((type) => {
      document.querySelectorAll(type.selector).forEach((shelf) => {
        const title = shelf.querySelector("#title, .title");
        if (title) {
          const titleText = title.textContent.toLowerCase().trim();
          const shouldHide = type.titles.some((t) => titleText.includes(t));

          if (shouldHide) {
            shelf.style.display = "none";
          }
        }
      });
    });
  }

  // run initially
  hideSections();

  // set up MutationObserver to handle dynamically loaded content
  const observer = new MutationObserver(hideSections);
  observer.observe(document.body, { childList: true, subtree: true });
})();
