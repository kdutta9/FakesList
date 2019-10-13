(function() {
    "use strict";

    window.addEventListener("load", init);

    function init() {
      id("submit-button").addEventListener("click", getURL);
    }

    function getURL() {
      id("loading").classList.remove("hidden");
      id("results").classList.add("hidden");
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
        id("loading").classList.add("hidden");
        console.log(json);
        let average = json["average price"].toFixed(2);
        let lowerBound = json["lower bound"];
        let price = json["this item price"];
        id("show-price").innerText = "The price of this listing was: $" + price.toString();
        id("average-price").innerText = "The average price of this item is: $" + average.toString();
        if (price >= lowerBound) {
          noScam();
          id("price-analysis").innerText = "which is not abnormally low compared to similar items."
        } else {
          scamLikely();
          id("price-analysis").innerText = "which is abnormally low compared to the price of similar items."
        }
        if(json["keyword"].length >= 1) {
          id("keywords").innerText = "We found the keyword(s): ";
          for (let i = 0; i < json["keyword"].length; i++) {
            id("keywords").innerText += " " + json["keyword"][i] + ",";
          }
          id("keywords").innerText += " which we have determined to be suspicious."
        } else {
          id("keywords").innerText = "No suspicious keywords were detected."
        }
      }

    function noScam() {
      id("message").innerText = "Congrats!"
      id("message2").innerText = "This eBay listing is most likely not a scam!"
      let bar = id("likelihood");
      bar.style.width = "100%";
      bar.style.backgroundColor = "green";
      id("results").style.backgroundColor = "rgba(108, 240, 50, 0.3)";
    }

    function scamLikely() {
      id("message").innerText = "Warning!"
      id("message2").innerText = "This eBay listing could be a scam. Use caution!"
      let bar = id("likelihood");
      bar.style.width = "50%";
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
