const form = document.querySelector("form");
const loadingElement = document.querySelector(".loading");
const tweetsElement = document.querySelector(".tweets");
const API_URL = "http://localhost:8000/tweet";

const listAllTweets = () => {
    tweetsElement.innerHTML = '';
  fetch(API_URL)
    .then((response) => response.json())
    .then((allTweets) => {
      console.log(allTweets);
      allTweets.reverse();
      allTweets.forEach((tweet) => {
        const div = document.createElement("div");
        const header = document.createElement("h3");
        header.textContent = tweet.name;

        const content = document.createElement("p");
        content.textContent = tweet.content;

        const date = document.createElement("small");
        date.textContent = new Date(tweet.created);

        div.appendChild(header);
        div.appendChild(content);
        div.appendChild(date);

        tweetsElement.appendChild(div);
        })
    });
};

loadingElement.style.display = "none";

listAllTweets();

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const name = formData.get("name");
  const content = formData.get("content");

  const tweet = {
    name,
    content,
  };
  console.log(tweet);
  form.style.display = "none";
  loadingElement.style.display = "";

  fetch(API_URL, {
    method: "POST",
    body: JSON.stringify(tweet),
    headers: {
      "content-type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((createdTweet) => {
      console.log(createdTweet);
      form.reset();
      form.style.display = "";
      loadingElement.style.display = "none";
      listAllTweets();
    });
});