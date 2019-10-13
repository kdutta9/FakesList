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
      let keyVal = JSON.stringify({"url": ebayURL});
      fetch("/get-results", {
        method: "POST",
        body: keyVal,
        "Content-Type": "application/json"
      })
        .then(resp => resp.json())
        .then(json => {
          displayResult(json) // call other function to put on website here
          })
      }

      function displayResult(json) {
        if (qs(".hidden")) {
          qs(".hidden").classList.remove("hidden");
        }
        console.log(json);
        let z = json[0];
        let price = json["this item price"];
        id("show-price").innerText = "The price of this listing was: $" + price.toString();
        if (z <= price) {
          id("description").innerText = "";
          console.log("hi");
        } else {
          scamLikely();
          console.log("oops");
        }
      }

    // function unsureBar() {
    //   let bar = id("likelihood");
    //   bar.style.width = "66%";
    //   bar.style.backgroundColor = "rgba(225, 225, 0, 2)";
    //   id("message").innerText = "Hmm..."
    //   id("message2").innerText = "This eBay listing is OK. Proceed with caution, but you should  be ok!"
    //   id("results").style.backgroundColor = "rgba(225, 225, 0, 0.3)";
    // }

    function scamLikely() {
      id("message").innerText = "Warning!"
      id("message2").innerText = "This eBay listing is probably a scam. Do not buy!"
      let bar = id("likelihood");
      bar.style.width = "33%";
      bar.style.backgroundColor = "rgba(240, 50, 50)";
      id("results").style.backgroundColor = "rgba(240, 50, 50, 0.3)";
    }

    // function updatePrice(pct) {
    //   id("price").innerText = pct + "%";
    // }


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
