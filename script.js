// Creating  HTML elements

///container div
const container = document.createElement("div");
container.className = "container-fluid";
document.body.appendChild(container);

//row div
const row = document.createElement("div");
row.className = "row";
container.appendChild(row);

//Using fetch to retrieve data from API
const fetchNews = async () => {
  let loader = `<div class="boxLoading">Loading...</div>`;
  document.querySelector(".row").innerHTML = loader;

  try {
    //Here we use promise to fetch data from API and store it to a variable "data" from which we iterate over the array and return the required info from the API response.
    const response = await fetch(
      "https://inshorts.deta.dev/news?category=technology"
    );
    //to see if API response is ok or not.
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    const news = await response.json();
    const data = news.data;
    console.log(data);

    //  Page Heading
    let result = `<h1>TECHNOLOGY NEWS</h1> `;
    data.forEach((info) => {
      const { title, content, imageUrl, date, readMoreUrl, author } = info;
      result +=
        // Creating remaining repeating HTML elements using Bootstrap
        `<div class="col-lg-">
                <div class="col-md-12">
                    <div class="col-sm-12">
                        <div class="card">
                            <img src="${imageUrl}" class="card-img-top" alt="News_thumbnail">
                            <div class="card-body">
                                <h3 class="card-title">${title} </h3>
                                <p class="card-text t1">${author}  </p>
                                <p class="card-text t3">${date} </p> 
                                <p class="card-text t2">${content} </p>
                                <a href="${readMoreUrl}" class="card-link-info">More Info </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;

      //Appending the above html elements to row div
      document.querySelector(".row").innerHTML = result;
    });
  } catch (error) {
    //to catch error in fetch
    console.error(`Could not get news: ${error}`);
  }
};

fetchNews(); //calling the function to be executed.
