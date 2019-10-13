(function() {
    "use strict";

    window.addEventListener("load", init);

    function init() {
      id("submit-button").addEventListener("click", getURL);
    }

    function getURL() {
      let ebayURL = id("url").value;
      if (ebayURL === "") {
        alert("Please enter a URL");
      }
      let keyVal = JSON.stringyify({"url": ebayURL});
    }


   /* ------------------------------ Helper Functions  ------------------------------ */
   // Note: You may use these in your code, but do remember that your code should not have
   // any functions defined that are unused.

   /**
    * Returns the element that has the ID attribute with the specified value.
    * @param {string} idName - element ID
    * @returns {object} DOM object associated with id.
    */
   function id(idName) {
     return document.getElementById(idName);
   }

   /**
    * Returns the first element that matches the given CSS selector.
    * @param {string} query - CSS query selector.
    * @returns {object} The first DOM object matching the query.
    */
   function qs(query) {
      return document.querySelector(query);
   }

   /**
    * Returns the array of elements that match the given CSS selector.
    * @param {string} query - CSS query selector
    * @returns {object[]} array of DOM objects matching the query.
    */
   function qsa(query) {
      return document.querySelectorAll(query);
   }

   /**
    * Helper function to return the response's result text if successful, otherwise
    * returns the rejected Promise result with an error status and corresponding text
    * @param {object} response - response to check for success/error
    * @returns {object} - valid result text if response was successful, otherwise rejected
    *                     Promise result
    */
   function checkStatus(response) {
      if (response.status >= 200 && response.status < 300) {
        return response.text();
      } else {
        return Promise.reject(new Error(response.status + ": " + response.statusText));
      }
   }

})();
