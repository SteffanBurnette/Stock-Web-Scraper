//Note for tmmr: Set up supabase database to store values taken in by the webscraper


//The current issue with cheerio is that the page is dynamically rendering its contents with javascript.
//This is an issue because cheerio is not rendering the page before webscraping so to fix this issue I,
//am going to use puppeteer which is a high frequency browser automation libary to mimic the users action
//and render the webpage, then deploy its web scraping capabilities get get the up to date information.
const express = require("express");
const app = express();
const cheerio = require("cheerio");
const axios = require("axios"); 
const fs = require("fs");
const puppeteer = require('puppeteer');

// URL to scrape
//Right now the url is the s&p500 index fund but can change since yahoofinace has multiple pages
const url = "https://finance.yahoo.com/quote/%5EGSPC?p=%5EGSPC";

// Array to store data  
const stockData = [];

/*
// Scrape function
async function scrapeData() {

  try {

    // Fetch HTML
    const response = await axios.get(url);

    // Load HTML into Cheerio
    //This is a function that holds the url that we are visiting so that we can perform functions
    //to find the css selectors that contains that values that we are looking for within the webpage
    const $ = cheerio.load(response.data);

    //const tickerSymbol = $(this).find("#quote-header-info > div.Mt\(15px\).D\(f\).Pos\(r\) > div.D\(ib\).Mt\(-5px\).Maw\(38\%\)--tab768.Maw\(38\%\).Mend\(10px\).Ov\(h\).smartphone_Maw\(85\%\).smartphone_Mend\(0px\) > div.D\(ib\)> h1").text().trim();


    
    // Loop through table rows 
    $("#quote-summary").each(function() {   

      // Get column data
      const previousClosing = $(this).find("div.D\\(ib\\).W\\(1\\/2\\).Bxz\\(bb\\).Pend\\(12px\\).Va\\(t\\).ie-7_D\\(i\\).smartphone_D\\(b\\).smartphone_W\\(100\\%\\).smartphone_Pend\\(0px\\).smartphone_BdY.smartphone_Bdc\\(\\$seperatorColor\\) > table > tbody > tr:nth-child(1) > td.Ta\\(end\\).Fw\\(600\\).Lh\\(14px\\)").text().trim();      
      const openingPrice = $(this).find("div.D\\(ib\\).W\\(1\\/2\\).Bxz\\(bb\\).Pend\\(12px\\).Va\\(t\\).ie-7_D\\(i\\).smartphone_D\\(b\\).smartphone_W\\(100\\%\\).smartphone_Pend\\(0px\\).smartphone_BdY.smartphone_Bdc\\(\\$seperatorColor\\) > table > tbody > tr:nth-child(2) > td.Ta\\(end\\).Fw\\(600\\).Lh\\(14px\\)").text().trim();
      const daysRange = $(this).find("div.D\\(ib\\).W\\(1\\/2\\).Bxz\\(bb\\).Pstart\\(12px\\).Va\\(t\\).ie-7_D\\(i\\).ie-7_Pos\\(a\\).smartphone_D\\(b\\).smartphone_W\\(100\\%\\).smartphone_Pstart\\(0px\\).smartphone_BdB.smartphone_Bdc\\(\\$seperatorColor\\) > table > tbody > tr:nth-child(1) > td.Ta\\(end\\).Fw\\(600\\).Lh\\(14px\\)").text().trim();
    const weekRange52 = $(this).find("div.D\\(ib\\).W\\(1\\/2\\).Bxz\\(bb\\).Pstart\\(12px\\).Va\\(t\\).ie-7_D\\(i\\).ie-7_Pos\\(a\\).smartphone_D\\(b\\).smartphone_W\\(100\\%\\).smartphone_Pstart\\(0px\\).smartphone_BdB.smartphone_Bdc\\(\\$seperatorColor\\) > table > tbody > tr:nth-child(2) > td.Ta\\(end\\).Fw\\(600\\).Lh\\(14px\\)").text().trim();
    const avgVolume = $(this).find("div.D\\(ib\\).W\\(1\\/2\\).Bxz\\(bb\\).Pstart\\(12px\\).Va\\(t\\).ie-7_D\\(i\\).ie-7_Pos\\(a\\).smartphone_D\\(b\\).smartphone_W\\(100\\%\\).smartphone_Pstart\\(0px\\).smartphone_BdB.smartphone_Bdc\\(\\$seperatorColor\\) > table > tbody > tr.Bxz\\(bb\\).Bdbw\\(1px\\).Bdbs\\(s\\).Bdc\\(\\$seperatorColor\\).H\\(36px\\).Bdbw\\(0\\)\\! > td.Ta\\(end\\).Fw\\(600\\).Lh\\(14px\\)").text().trim();
    const volume = $(this).find("div.D\\(ib\\).W\\(1\\/2\\).Bxz\\(bb\\).Pend\\(12px\\).Va\\(t\\).ie-7_D\\(i\\).smartphone_D\\(b\\).smartphone_W\\(100\\%\\).smartphone_Pend\\(0px\\).smartphone_BdY.smartphone_Bdc\\(\\$seperatorColor\\) > table > tbody > tr.Bxz\\(bb\\).Bdbw\\(1px\\).Bdbs\\(s\\).Bdc\\(\\$seperatorColor\\).H\\(36px\\).Bdbw\\(0\\)\\! > td.Ta\\(end\\).Fw\\(600\\).Lh\\(14px\\) > fin-streamer > span").text().trim();




      // Push to array  
      stockData.push({
        previousClosing,
        openingPrice,
        volume,
        daysRange,
        weekRange52,
       avgVolume,
       // tickerSymbol
      });

    });

  } catch (error) {
    console.log(error);
  }

}
*/

async function scrapePuppetData() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
  
    // Wait for JavaScript to render the content
    await page.waitForSelector('#quote-summary');
  
     // Fetch HTML
     const response = await axios.get(url);

     // Load HTML into Cheerio
     //This is a function that holds the url that we are visiting so that we can perform functions
     //to find the css selectors that contains that values that we are looking for within the webpage
     const $ = cheerio.load(response.data);
 
    
  try {
    //const tickerSymbol = $(this).find("#quote-header-info > div.Mt\(15px\).D\(f\).Pos\(r\) > div.D\(ib\).Mt\(-5px\).Maw\(38\%\)--tab768.Maw\(38\%\).Mend\(10px\).Ov\(h\).smartphone_Maw\(85\%\).smartphone_Mend\(0px\) > div.D\(ib\)> h1").text().trim();
    // Loop through table rows 
      
      // Get column data
      //const previousClosing = page.$eval("div.D\\(ib\\).W\\(1\\/2\\).Bxz\\(bb\\).Pend\\(12px\\).Va\\(t\\).ie-7_D\\(i\\).smartphone_D\\(b\\).smartphone_W\\(100\\%\\).smartphone_Pend\\(0px\\).smartphone_BdY.smartphone_Bdc\\(\\$seperatorColor\\) > table > tbody > tr:nth-child(1) > td.Ta\\(end\\).Fw\\(600\\).Lh\\(14px\\)").text().trim();      
      //const openingPrice = page.$eval("div.D\\(ib\\).W\\(1\\/2\\).Bxz\\(bb\\).Pend\\(12px\\).Va\\(t\\).ie-7_D\\(i\\).smartphone_D\\(b\\).smartphone_W\\(100\\%\\).smartphone_Pend\\(0px\\).smartphone_BdY.smartphone_Bdc\\(\\$seperatorColor\\) > table > tbody > tr:nth-child(2) > td.Ta\\(end\\).Fw\\(600\\).Lh\\(14px\\)").text().trim();
     // const daysRange = page.$eval("div.D\\(ib\\).W\\(1\\/2\\).Bxz\\(bb\\).Pstart\\(12px\\).Va\\(t\\).ie-7_D\\(i\\).ie-7_Pos\\(a\\).smartphone_D\\(b\\).smartphone_W\\(100\\%\\).smartphone_Pstart\\(0px\\).smartphone_BdB.smartphone_Bdc\\(\\$seperatorColor\\) > table > tbody > tr:nth-child(1) > td.Ta\\(end\\).Fw\\(600\\).Lh\\(14px\\)").text().trim();
    //const weekRange52 = page.$eval("div.D\\(ib\\).W\\(1\\/2\\).Bxz\\(bb\\).Pstart\\(12px\\).Va\\(t\\).ie-7_D\\(i\\).ie-7_Pos\\(a\\).smartphone_D\\(b\\).smartphone_W\\(100\\%\\).smartphone_Pstart\\(0px\\).smartphone_BdB.smartphone_Bdc\\(\\$seperatorColor\\) > table > tbody > tr:nth-child(2) > td.Ta\\(end\\).Fw\\(600\\).Lh\\(14px\\)").text().trim();
   // const avgVolume = page.$eval("div.D\\(ib\\).W\\(1\\/2\\).Bxz\\(bb\\).Pstart\\(12px\\).Va\\(t\\).ie-7_D\\(i\\).ie-7_Pos\\(a\\).smartphone_D\\(b\\).smartphone_W\\(100\\%\\).smartphone_Pstart\\(0px\\).smartphone_BdB.smartphone_Bdc\\(\\$seperatorColor\\) > table > tbody > tr.Bxz\\(bb\\).Bdbw\\(1px\\).Bdbs\\(s\\).Bdc\\(\\$seperatorColor\\).H\\(36px\\).Bdbw\\(0\\)\\! > td.Ta\\(end\\).Fw\\(600\\).Lh\\(14px\\)").text().trim();
    //const volume = page.$eval("div.D\\(ib\\).W\\(1\\/2\\).Bxz\\(bb\\).Pend\\(12px\\).Va\\(t\\).ie-7_D\\(i\\).smartphone_D\\(b\\).smartphone_W\\(100\\%\\).smartphone_Pend\\(0px\\).smartphone_BdY.smartphone_Bdc\\(\\$seperatorColor\\) > table > tbody > tr.Bxz\\(bb\\).Bdbw\\(1px\\).Bdbs\\(s\\).Bdc\\(\\$seperatorColor\\).H\\(36px\\).Bdbw\\(0\\)\\! > td.Ta\\(end\\).Fw\\(600\\).Lh\\(14px\\) > fin-streamer > span").text().trim();

    const tickerSymbolXPath = await page.$x("//*[@id='quote-header-info']/div[2]/div[1]/div[1]/h1");
    const tickerSymbolValues = [];
    
    for (const elementHandle of tickerSymbolXPath) {
      const tickerSymbolValue = await page.evaluate(element => element.textContent.trim(), elementHandle);
      tickerSymbolValues.push(tickerSymbolValue);
    }

    const currentMarketPriceCSS = await page.$x("//*[@id='quote-header-info']/div[3]/div[1]/div");
    const currentMarketPriceValues = [];
    
    for (const elementHandle of currentMarketPriceCSS) {
      const currentMarketPriceValue = await page.evaluate(element => element.textContent.trim(), elementHandle);
      currentMarketPriceValues.push(currentMarketPriceValue);
    }
    
    
    // Extract data using page.$eval
    const previousClosing = await page.$eval("#quote-summary > div.D\\(ib\\).W\\(1\\/2\\).Bxz\\(bb\\).Pend\\(12px\\).Va\\(t\\).ie-7_D\\(i\\).smartphone_D\\(b\\).smartphone_W\\(100\\%\\).smartphone_Pend\\(0px\\).smartphone_BdY.smartphone_Bdc\\(\\$seperatorColor\\) > table > tbody > tr:nth-child(1) > td.Ta\\(end\\).Fw\\(600\\).Lh\\(14px\\)", element => element.textContent.trim());
    const openingPrice = await page.$eval("#quote-summary > div.D\\(ib\\).W\\(1\\/2\\).Bxz\\(bb\\).Pend\\(12px\\).Va\\(t\\).ie-7_D\\(i\\).smartphone_D\\(b\\).smartphone_W\\(100\\%\\).smartphone_Pend\\(0px\\).smartphone_BdY.smartphone_Bdc\\(\\$seperatorColor\\) > table > tbody > tr:nth-child(2) > td.Ta\\(end\\).Fw\\(600\\).Lh\\(14px\\)", element => element.textContent.trim());
    const daysRange = await page.$eval("#quote-summary > div.D\\(ib\\).W\\(1\\/2\\).Bxz\\(bb\\).Pstart\\(12px\\).Va\\(t\\).ie-7_D\\(i\\).ie-7_Pos\\(a\\).smartphone_D\\(b\\).smartphone_W\\(100\\%\\).smartphone_Pstart\\(0px\\).smartphone_BdB.smartphone_Bdc\\(\\$seperatorColor\\) > table > tbody > tr:nth-child(1) > td.Ta\\(end\\).Fw\\(600\\).Lh\\(14px\\)", element => element.textContent.trim());
    const weekRange52 = await page.$eval("#quote-summary > div.D\\(ib\\).W\\(1\\/2\\).Bxz\\(bb\\).Pstart\\(12px\\).Va\\(t\\).ie-7_D\\(i\\).ie-7_Pos\\(a\\).smartphone_D\\(b\\).smartphone_W\\(100\\%\\).smartphone_Pstart\\(0px\\).smartphone_BdB.smartphone_Bdc\\(\\$seperatorColor\\) > table > tbody > tr:nth-child(2) > td.Ta\\(end\\).Fw\\(600\\).Lh\\(14px\\)", element => element.textContent.trim());
    const avgVolume = await page.$eval("#quote-summary > div.D\\(ib\\).W\\(1\\/2\\).Bxz\\(bb\\).Pstart\\(12px\\).Va\\(t\\).ie-7_D\\(i\\).ie-7_Pos\\(a\\).smartphone_D\\(b\\).smartphone_W\\(100\\%\\).smartphone_Pstart\\(0px\\).smartphone_BdB.smartphone_Bdc\\(\\$seperatorColor\\) > table > tbody > tr.Bxz\\(bb\\).Bdbw\\(1px\\).Bdbs\\(s\\).Bdc\\(\\$seperatorColor\\).H\\(36px\\).Bdbw\\(0\\)\\! > td.Ta\\(end\\).Fw\\(600\\).Lh\\(14px\\)", element => element.textContent.trim());
    //const volume = await page.$eval("#quote-summary > div.D\(ib\).W\(1\/2\).Bxz\(bb\).Pend\(12px\).Va\(t\).ie-7_D\(i\).smartphone_D\(b\).smartphone_W\(100\%\).smartphone_Pend\(0px\).smartphone_BdY.smartphone_Bdc\(\$seperatorColor\) > table > tbody > tr.Bxz\(bb\).Bdbw\(1px\).Bdbs\(s\).Bdc\(\$seperatorColor\).H\(36px\).Bdbw\(0\)\! > td.Ta\(end\).Fw\(600\).Lh\(14px\)", element => element.textContent.trim());
    /*const volume = await page.evaluate(() => {
        const selector = "#quote-summary > div.D\(ib\).W\(1\/2\).Bxz\(bb\).Pend\(12px\).Va\(t\).ie-7_D\(i\).smartphone_D\(b\).smartphone_W\(100\%\).smartphone_Pend\(0px\).smartphone_BdY.smartphone_Bdc\(\$seperatorColor\) > table > tbody > tr.Bxz\(bb\).Bdbw\(1px\).Bdbs\(s\).Bdc\(\$seperatorColor\).H\(36px\).Bdbw\(0\)\! > td.Ta\(end\).Fw\(600\).Lh\(14px\) > fin-streamer > span";
        const element = document.querySelector(selector);
        return element ? element.textContent.trim() : "";
      });*/
        // Wait for the element to be present
  //await page.waitForSelector("/html/body/div[1]/div/div/div[1]/div/div[3]/div[1]/div/div[1]/div/div[2]/div[1]/table/tbody/tr[3]/td[2]/fin-streamer/span");

  /**XPath stands for "XML Path Language." It's a query language used to select elements and attributes from an XML (or HTML) document.
   *  XPath provides a way to navigate through the elements and structure of an XML/HTML document to locate specific elements or data.
In the context of web scraping, XPath is commonly used to identify and locate elements within an HTML document.
 It uses a path-like syntax to traverse the document's structure and select elements based on various conditions. */
 //Here we are getting the value by the xpath and not the css selector since the selector was giving us a bit of trouble.
      const volumeXPath = await page.$x("//*[@id='quote-summary']/div[1]/table/tbody/tr[3]/td[2]/fin-streamer");
      const volumeValues = [];
      
      for (const elementHandle of volumeXPath) {
        const volumeValue = await page.evaluate(element => element.textContent.trim(), elementHandle);
        volumeValues.push(volumeValue);
      }
      

    //const volume = await page.$x("//*[@id='quote-summary']/div[1]/table/tbody/tr[3]/td[2]/fin-streamer", element => element.textContent.trim());


    // Push to array
    stockData.push({
      previousClosing,
      openingPrice,
      volumeValues,
      daysRange,
      weekRange52,
      avgVolume,
      tickerSymbolValues,
      currentMarketPriceValues
    });


  } catch (error) {
    console.log(error);
  }

  
    await browser.close();
  }













// Function to write JSON file 
async function writeJson() {

  // Stringify scraped data
  const jsonData = JSON.stringify(stockData, null, 2);

  // Write JSON to file
  fs.writeFile("stocks.json", jsonData, (err) => {
    if (err) throw err;
    console.log("Data written to JSON");
  });

}


// Create an Express route for scraping and retrieving data
app.get("/scrape", async (req, res) => {
    try {
      await scrapePuppetData(); // Call your scraping function
      res.json(stockData); // Return the scraped data as JSON
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "An error occurred while scraping data." });
    }
  });

// Call functions
async function main() {
  //await scrapeData();
  await scrapePuppetData();
  await writeJson();
}

main();//Call main to test scraper

// Start the Express server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});