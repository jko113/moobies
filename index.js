const express = require("express");
const app = express();
const hbs = require("express-handlebars");
const port = 5555;
const static = express.static;
const http = require("http");
const request = require("request");
// const bodyParser = require("body-parser");
// const jsonParser = bodyParser.json();
// const urlencodedParser = bodyParser.urlencoded({extended: false});
const omdbOrigin = "http://www.omdbapi.com/?i=";
const apiKey = "&apikey=bb06bdc0";

app.engine(".hbs", hbs({
    extname: ".hbs",
    defaultLayout: "layout"
}));
app.set("view engine", ".hbs");
app.use(static("public"));

/****** GETS */
// get home page
app.get("/", (req, res) => {
    res.render("home");
});

app.get("/:id", (req, res) => {
    let movieId = req.params.id;

    let requestUrl = omdbOrigin + movieId + apiKey;

    http.get(requestUrl, (apiRes) => {

        let unparsedData = "";
        apiRes.on("data", (chunk) => {
            unparsedData += chunk;
        }).on("end", () => {
            data = JSON.parse(unparsedData);
            // let isFalse = Object.values(data)[13] +
            // Object.values(data)[14] +
            // Object.values(data)[15] +
            // Object.values(data)[16] +
            // Object.values(data)[17];
            //console.log(Object.values(data)[13]);
            if (data.Response === "False") {
                console.log(requestUrl);
                console.log(data);
                throw new Error("An error occurred fetching the data.");
            }
            // res.send(JSON.parse(data));
            // data = JSON.parse(data);
            // res.send(Object.keys(data));

            res.render("moobie", {
                // fullData: JSON.stringify(data),
                fullData: unparsedData,
                entries: Object.entries(data),
                title: data.Title,
                year: data.Year,
                rated: data.Rated,
                released: data.Released,
                runtime: data.Runtime,
                genre: data.Genre,
                director: data.Director,
                actors: data.Actors,
                writers: data.Writer,
                // ratings: data.Ratings
                plot: data.Plot,
                language: data.Language,
                country: data.Country,
                awards: data.Awards,
                poster: data.Poster,
                metascore: data.Metascore,
                imdbRating: data.imdbRating,
                imdbVotes: data.imdbVotes,
                imdbID: id,
                type: data.Type,
                DVD: data.DVD,
                boxOffice: data.BoxOffice,
                production: data.Production,
                website: data.Website

                // data: JSON.stringify(data)
            });
        });

    });

});

// LISTEN
app.listen(port, () => {
    console.log(`Your application is running at http://localhost:${port}`);
});