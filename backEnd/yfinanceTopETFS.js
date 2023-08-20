const fs = require('fs');
const puppeteer = require('puppeteer');

async function scrapeData() {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    await page.goto('https://finance.yahoo.com/etfs?offset=0&count=100'); // Replace with the actual URL
    
    const trData = await page.evaluate(() => {
      const trElements = Array.from(document.querySelectorAll('#scr-res-table > div.Ovx\\(a\\).Ovx\\(h\\)--print.Ovy\\(h\\).W\\(100\\%\\) > table > tbody > tr'));
      
      return trElements.map(tr => {
        const tdElements = Array.from(tr.querySelectorAll('td'));
        const [symbol, name, price, change, percentChange, volume, , , range] = tdElements.map(td => td.textContent.trim());
        
        return {
          symbol,
          name,
          price,
          change,
          percentChange,
          volume,
          range
        };
      });
    });
      
    await browser.close();

    fs.writeFileSync('yfinanceTopEtfs.json', JSON.stringify(trData, null, 2));
    console.log('Data has been scraped and organized into yfinanceTopEtfs.json');
  } catch (error) {
    console.error('Error:', error);
  }
}

scrapeData();
