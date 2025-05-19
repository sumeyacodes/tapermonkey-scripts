// ==UserScript==
// @name         netflix scripts
// @namespace    http://tampermonkey.net/
// @version      2025-05-19
// @description  games BEGONE! 😡
// @match        https://www.netflix.com/browse
// @icon         https://www.google.com/s2/favicons?sz=64&domain=netflix.com
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  function hideSections() {
    const selectors = [
      "div.lolomoRow.lolomoRow_title_card.mobile-games-row.ltr-0",
      '[data-list-context*="games"]',
      "[data-list-context*=configbased_liveandupcomingepisodes]",
      "div.billboard-row.billboard-row-games",
    ];

    selectors.forEach((selector) => {
      document.querySelectorAll(selector).forEach((element) => {
        element.style.display = "none";
      });
    });
  }

  // run immediately
  hideSections();

  // set up MutationObserver to handle dynamically loaded content
  const observer = new MutationObserver(hideSections);
  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
})();
