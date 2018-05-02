const request = require("request");
const cheerio = require("cheerio");

//scrape articles from the New YorK Times
const scrape = function(callback) {

  var articlesArr = [];

  request("https://www.nytimes.com/", function(error, response, html) {

      let $ = cheerio.load(html);


      $("h2.story-heading").each(function(i, element) {

          let result = {};

          result.title = $(this).children("a").text();
          result.link = $(this).children("a").attr("href");

          if (result.title !== "" && result.link !== "") {
              articlesArr.push(result);
          }
      });
      callback(articlesArr);
  });

};

module.exports = scrape;
