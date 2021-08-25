# Scrape Google SERP using WebScrapingAPI in Node.js

## What is web scraping? 

It is nothing but automating the task of collecting useful information from websites. There are a lot of use cases for web scraping: you might want to collect prices from various e-commerce sites for a price comparison site,you need flight times and hotel listings for a travel site, you could even be wanting to build a search engine like Google!

Getting started with web scraping is easy, and the process can be broken down into two main parts:

- acquiring the data using an HTML request library or a headless browser,
- and parsing the data to get the exact information you want.

## What is this article about and What are we going to do?

This article is all about learning how to scrape data. We are going to scrape in SERP data, you can use whatever scraping tool you feel most comfortable with. Just know that from here on, the article will focus on how to get the results using [**WebScrapingAPI**](https://www.webscrapingapi.com/). Why, you might ask. It is a simple, fast and reliable REST-API that collects the HTML from any web page, it manages in the backend all possible blocking points such as proxies, Javascript rendering, IP rotations, CAPTCHAs, and many more. So, let's learn how to get the SERP data using **WebScrapingAPI** in Node.js. 

### What is SERP or SERP data?

Every second Google process **60,000+** searches. That means that this year there will be over **2 trillion** Google searches. Seems interesting? 

Well, that’s a lot of Googling! It also means that as a digital marketer or a website developer it is more important than ever to understand Google SERP Features and how they affect your webpage.

SERP or Search Engine Results Pages is the result page's data that is returned by Search Engines. The search results pages data are relevant to the search keywords that are generally done manually by the users in Search Engines.

### Uses of SERP data 
- SEO Monitoring.
- Search Engine Optimization.
- Competitor Analysis.
- Paid ads Monitoring. 
- Optimizing your website and ranking for SERP Features can help boost website traffic and CTRs.
- Allows users to quickly find relevant information to their search query.

Sometimes we need search result pages data from all result pages and we develop *algorithm* for this. But it’s not always accurate as the Search Engines regularly keep on changing their SERP structures and algorithms and sometimes it seems impossible to scrape this data. We don’t need to panic though as there is **WebScrapingAPI** available for our ease. 

## What is WebScrapingAPI ?

It is one of the leading *REST API* for web scraping. **WebScrapingAPI** collects the HTML from any web page using a simple API and provides ready-to-process data to everyone in your company or maybe for personal use.

### Perks of WebScrapingAPI

- Make sure you never get blocked.
- 100M+ Rotating proxies at your fingertips.
- Easy to use, easy to customize.
- Around the globe geotargeting.
- 99.99% Uptime.
- Automatic Scaling.
- 24/7 Monitoring.
- Trusted by startups and the world's largest companies.
- Collect data from any type of webpage.


For more info check out [WebScrapingAPI](https://www.webscrapingapi.com/)

So let’s proceed with the tutorial to integrate *WebScrapingAPI* in Node.js.

## How to use WebScrapingAPI to scrape SERP data

In the following section, we will use *Node.js* and a some libraries like [`got`](https://www.npmjs.com/package/got) and [Cheerio](https://github.com/cheeriojs/cheerio) to create the script that will get all the data from a *SERP* and format it nicely to be as understandable as possible. Let’s see how all the information presented above can be converted to tangible results:

### Let's take it step by step 

**Step 1:** Get API Access Key


The API Key is required to access the API. So first we will create an [account](https://app.webscrapingapi.com/register) and get the `API Access Key` from the dashboard.

- Register yourself at [WebScapingAPI.com](https://app.webscrapingapi.com/register) (follow the link it will redirect you there)
- Get the API access key

You can start your [free trial](https://www.webscrapingapi.com/pricing/) with 5000 requests and access to all functionalities to test the product. For more information checkout the [pricing](https://www.webscrapingapi.com/pricing/) policy.

After successfully creating a free account, access the *API Playground* page by smashing the **“Use API Playground”** button on the Dashboard page. The page should look like this:

![image1](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/xj8vd7rld6exglbr4vru.png)

As the name suggests, this is the place where we can test the scraping tool before creating our script. Let’s copy the URL presented above in the URL input (left column), scroll down a little bit, and smash the **“Send API Request”** button. This action should return a result that looks like this:

![image2](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/kqubftm31965hvfrzkrf.png)

Now let’s build the script that is going to do the work for us.

**Step 2:** Check if you have installed *node* and *npm* in your system.
Run these commands in terminal/Command line
```Bash 
node -v
```
and 
```Bash
npm -v
```

Output might look like 
```Bash
v14.16.1
```

If you get the version as the output of the command you have already installed *node* and *npm*,if you receive any error please try installing them from here [Node.js](https://nodejs.org/) and once you have installed *Node.js* run command `npm install -g npm` to install *npm* and repeat **Step:2**.


**Step 3:** Set up new npm Package

```Bash 
npm init -y
```
This command will do a lot of the hard work at the back and create a *package.json* file which will keep a track of all the dependencies and DevDependencies we will install throughout our program.

**Step 4:** Installing the packages
```Bash
npm i got cheerio
```
or
```Bash
npm install got cheerio
```

**Step 5:** Go to your favorite Code Editor/IDE 

Let's make a file named **serpScraper.js** and now we will include the modules into our script, to get the HTML of the SERP(Search Engine Results Pages).

```JavaScript
const got = require('got');
const $ = require('cheerio');
```

> If you face any problem using cheerio, sometimes require('packageName').default needs to be exported. So if you get an error about cheerio is not function or $ is not a function. Try using this:

```JavaScript
var $ = require('cheerio');
if (typeof $ != "function") $ = require("cheerio").default;
```


**Step 6:** Use the `API Key`.

We will initialize `API Access Key` to create the client to access the API.

```JavaScript
(async () => {
const params = {
    api_key: "YOUR_API_KEY_HERE”,
    url: "https://www.google.com/search?q=nodejs&rlz=1C1SQJL_enIN868IN868&oq=nodejs&aqs=chrome.0.69i59l3j69i60j69i61j69i65j69i60j69i61.987j0j7&sourceid=chrome&ie=UTF-8",
    country: "US",
}

const response = await got('https://api.webscrapingapi.com/v1?', {searchParams: params});

// Storing the results in a variable
const html = response.body;
```

Make sure to replace the “YOUR_API_KEY_HERE” string with the *API key* provided to you by our service. You can find it on the dashboard page.

**Step 7:** Inspecting the Page.

Let’s get back to the page we want to scrape. This is how we can select only the information we need. Right-click on the first heading and click ‘Inspect.’

You’ll get a new window containing the HTML source code:

1. We will inspect the heading and get the class-name used to identify the heading from the source code.
![Alt Text](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/19vog3s3r7umz29fdftu.png)

- For the Heading we got class-name as `h3.LC20lb.DKV0Md`. The heading is contained inside the `h3` tag and the class-name is `.LC20lb.DKV0Md`.

> In `.LC20lb.DKV0Md`, `.LC20lb` and `.DKV0Md` are two different classes. 

2. We will inspect the link and get the class-name used to identify the paragraph from the source code.
![Alt Text](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/j1ng0xn9un9mkw1duidi.png)

![Alt Text](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/7j02ylaz3fc1277uxke8.png)

- For the links we got class-name as `yuRUbf` which contain another `a` tag inside of it. So we will use this syntax to get the link from the page `.yuRUbf > a`.


**Step 8:** Storing the Headings and Links in Separate Arrays.

As we have already inspected and got to know the class-name of the heading and link, we can now extract the information from the source code. Now we can go through and grab a list of links to all Node,js topics by getting them from the “attribs” section of each element.

Let's use them to extract the headings and links.

```javaScript
  const length = $("h3.LC20lb.DKV0Md", html).length;
  const links = [];
  const headings = [];

  for (let i = 0; i < length; i++) {
    links.push($(".yuRUbf > a", html)[i].attribs.href);
    headings.push($("h3.LC20lb.DKV0Md", html)[i].children[0].data);
  }
```

**Step 9:** Formatting the information.

As we have extracted the information from the source code, we need to format it in a human readable format.

```javaScript
function print(links, headings) {
    for(let i = 0; i < length; i++) {
      console.log(`${i+1}. ${links[i]} :- ${headings[i]}`);
    }
  }

print(links, headings);
```
 
**Step 10:** Putting it all together.

Here is the complete code to make **WebScrapingAPI** request and get response result data.

```JavaScript
const got = require("got");
var $ = require("cheerio");
if (typeof $ != "function") $ = require("cheerio").default;

(async () => {
  const params = {
    api_key: "YOUR_API_KEY_HERE",
    url: "https://www.google.com/search?q=nodejs&rlz=1C1SQJL_enIN868IN868&oq=nodejs&aqs=chrome.0.69i59l3j69i60j69i61j69i65j69i60j69i61.987j0j7&sourceid=chrome&ie=UTF-8",
    country: "US",
  };

  const response = await got(
    "https://api.webscrapingapi.com/v1?",
    { searchParams: params }
  );

  const html = response.body;
  const length = $("h3.LC20lb.DKV0Md", html).length;
  const links = [];
  const headings = [];

  for (let i = 0; i < length; i++) {
    links.push($(".yuRUbf > a", html)[i].attribs.href);
    headings.push($("h3.LC20lb.DKV0Md", html)[i].children[0].data);
  }

  function displayResults(links, headings) {
    for(let i = 0; i < length; i++) {
      console.log(`${i+1}. ${headings[i]} :- ${links[i]}`);
    }
  }
  
  displayResults(links, headings);
})();

```
Output: 
```
1. Node.js :- https://nodejs.org/
2. Node.js - Wikipédia :- https://fr.wikipedia.org/wiki/Node.js
3. NodeJs : le guide complet pour tout comprendre du javascript ... :- https://practicalprogramming.fr/nodejs
4. Qu'est-ce que Node.js et pourquoi l'utiliser ? - Kinsta :- https://kinsta.com/fr/base-de-connaissances/qu-est-ce-que-node-js/
5. Apprendre NodeJS | Grafikart :- https://grafikart.fr/tutoriels/nodejs
6. Tutoriel : Node.js sur Windows pour débutants | Microsoft Docs :- https://docs.microsoft.com/fr-fr/windows/dev-environment/javascript/nodejs-beginners-tutorial
```

As you can see, scraping SERP data using **WebScrapingAPI** is quite easy. We have to use a scraping API to get the HTML content, parse the response, get the relevant information from each element on the page and console everything or store it in arrays or json format.

> The results might differ depending on the location of the proxy. The results stated above are for a US proxy but if you choose a proxy from another location results will be different. 

## Conclusion

To take your startup or business to their peak nowadays takes a lot more than having a great product. There are endless opportunities depending on how creative you can be. Some of the most important and healthy strategies business owners should pay attention to are:

- creating an online presence;
- knowing the Substitutes for and Complimentary products to your own;
- working on providing the most value for the lowest price;
- knowing about the demand and supply for your product- this helps in knowing when to modify the pricing according to the demand and supply chains;
- having a complete understanding of the competition’s advantage.

All of these strategies can prove vital in one’s business. It feels good to know that web scrapers offer a huge help in tackling these problems. Adding automation to the data gathering process may be the easiest step to improve their business.

We try to offer a helping hand by creating the necessary tools for these kinds of jobs. Thank you for reading the article and let me tell you that WebScraping API has a [free trial](https://www.webscrapingapi.com/pricing/)
so that our users can test our product according to their needs.

### Additional Resources
- [WebScrapingAPI Introduction](https://docs.webscrapingapi.com/#introduction)
- [WebScrapingAPI Documentation](https://www.webscrapingapi.com/docs/)
- [Using WebScrapingAPI with Javascript](https://kb.webscrapingapi.com/article/11-webscrapingapi-with-javascript)
- [More articles on WebScrapingAPI](https://kb.webscrapingapi.com/)