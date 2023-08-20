const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const url = 'https://finance.yahoo.com/trending-tickers'; // Replace with the actual URL
  await page.goto(url);

  // Wait for the table to be available
  await page.waitForSelector('#list-res-table > div.Ovx\\(a\\).Ovx\\(h\\)--print.Ovy\\(h\\).W\\(100\\%\\) > table > tbody');

  // Get all the <tr> elements within the specified selector
  const trElements = await page.$$('#list-res-table > div.Ovx\\(a\\).Ovx\\(h\\)--print.Ovy\\(h\\).W\\(100\\%\\) > table > tbody tr');

  // Initialize an array to store the extracted data
  const extractedData = [];

  // Loop through each <tr> element and extract its content
  for (const trElement of trElements) {
    const trTextContent = await page.evaluate(element => element.textContent.trim(), trElement);
    extractedData.push(trTextContent);
  }

  // Get the column headers from the thead
  const thElements = await page.$$('#list-res-table > div.Ovx\\(a\\).Ovx\\(h\\)--print.Ovy\\(h\\).W\\(100\\%\\) > table > thead th');
  const columnHeaders = await Promise.all(thElements.map(element => page.evaluate(el => el.textContent.trim(), element)));

  // Define a custom comparison function for sorting based on column headers
  function compareByColumn(header) {
    const columnIndex = columnHeaders.indexOf(header);
    return (a, b) => {
      const aFields = a.split(/(?=\d)|:/).map(field => field.trim());
      const bFields = b.split(/(?=\d)|:/).map(field => field.trim());
      const aValue = aFields[columnIndex];
      const bValue = bFields[columnIndex];
      
      if (!isNaN(parseFloat(aValue)) && !isNaN(parseFloat(bValue))) {
        return parseFloat(aValue) - parseFloat(bValue);
      } else if (aValue !== undefined && bValue !== undefined) {
        return aValue.localeCompare(bValue);
      }
      
      // Handle undefined values by placing them at the end of the list
      if (aValue === undefined) return 1;
      if (bValue === undefined) return -1;
      return 0;
    };
  }

  // Sort the data using the custom comparison function based on the desired column header
  const sortedData = extractedData.sort(compareByColumn('Change'));

  // Write the extracted and sorted data to a JSON file
  fs.writeFileSync('yfinTrendingTickers.json', JSON.stringify(sortedData, null, 2));

  await browser.close();
})();
