var express = require("express");
var cors = require("cors");
var morgan = require("morgan");
var monk = require("monk");
var Filter = require("bad-words");

var app = express();

var db = monk("127.0.0.1/twitter");
filter = new Filter();

var tweets = db.get("tweets");

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

const isValidTweet = (tweet) => {
  if (
    tweet.name &&
    tweet.name.toString().trim() !== "" &&
    tweet.content &&
    tweet.content.toString().trim() !== ""
  ) {
    return true;
  } else {
    return false;
  }
};

app.get("/", (req, res) => {
  res.json({
    message: "Hi",
  });
});

app.get("/tweet", (req, res) => {
  tweets.find().then((allTweets) => {
    res.json(allTweets);
  });
});

app.post("/tweet", (req, res) => {
  if (isValidTweet(req.body)) {
    const tweet = {
      name: filter.clean(req.body.name.toString()),
      content: filter.clean(req.body.content.toString()),
      created: new Date(),
    };

    tweets.insert(tweet).then((createdTweet) => {
      res.json(createdTweet);
    });
  } else {
    res.status(422);
    res.json({
      message: "Name and Content are required",
    });
  }
});

app.listen(8000, () => {
  console.log("Listening on port 8000 .......");
});