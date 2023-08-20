# Stock-Web-Scraper
A web scraper that gets publicly available stock information from various financial websites. 

# server.js
This file is the main entry point for this project, and it contains all of our code to run the application. The main libaries used in this file are puppeteer, cheerio, axios, express and fs.

# puppeteer
Puppeteer is a Node.js library that provides a high-level API to control headless Chrome or Chromium browsers. It's commonly used for web scraping, automating user interactions, taking screenshots, generating PDFs, and other tasks that involve browser automation.Pu ppeteer lets you programmatically control the browser and perform various actions that a real user would do, such as navigating to web pages, filling forms, clicking buttons, submitting forms, scrolling, and more.
You can access the Document Object Model (DOM) of a web page and manipulate its elements using Puppeteer. In this specific project we are accessing specific DOM elements from the yahoo finance web page via their css selector and xpath. (If you are using Chrome, you can download something known as the SelectorGadget. However, from personal experience, I find it much easier to inspect the page and manually obtain the selector or XPath. The SelectorGadget tends to be less accurate when trying to select more complex selectors, XPaths, and so on.) You can also evaluate JavaScript expressions in the context of the web page.

# cheerio
Cheerio is a lightweight library for parsing and manipulating HTML and XML documents in a manner similar to how you would use jQuery to manipulate the DOM in web development. It is particularly useful for web scraping and data extraction tasks in Node.js.
You can substitute the use of the Puppeteer library with Cheerio in some instances, but Cheerio has limitations and drawbacks depending on how you attempt to use it. For example, when dealing with Yahoo Finance, the webpage contains dynamic JavaScript that will only render the values once the page is loaded. This becomes problematic when trying to utilize the Cheerio library since it does not actually render the page. Therefore, in this particular case, Puppeteer is the superior library for scraping values from the Yahoo Finance webpage. 

# express
I use the Express library to define routes for various URL paths and HTTP methods (GET, POST, PUT, DELETE, etc.). This enables anyone who intends to utilize the code to make specific API requests and execute distinct protocols. You can access request parameters, query strings, headers, and request bodies, in addition to configuring response headers and transmitting data back to the client.

# fs
I leverage the fs library to categorize and store the parsed data into a JSON file. This way, I can efficiently utilize the fetched data within my application, streamlining the process for accessing and working with the information.

# axios
The Axios library is a widely-used JavaScript library that facilitates making HTTP requests from web browsers or Node.js environments. It offers a simple and intuitive interface for sending asynchronous HTTP requests to various endpoints, such as APIs, servers, or other web resources.
I intend to utilize this library to leverage Promises, which offer a more structured and manageable approach for handling asynchronous operations. This facilitates better management of data flow and error handling.

# vite
The frontend file is configured with a Vite environment that I intend to utilize. This environment enables users to perform various statistical models/methods on the parsed data and allows them to track specific stocks while discussing their thoughts on specific securities with like-minded individuals. The Vite library provides a development experience that is not only faster but also more optimized for modern web applications, leveraging the native capabilities of ES modules. This will be particularly beneficial for developing and testing various applications using the parsed data. Vite is designed to enhance the efficiency and speed of modern web development projects, making it well-suited for a website that will handle large amounts of data. 