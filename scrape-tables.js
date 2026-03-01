const { chromium } = require('playwright');

async function scrapeSums() {
  const browser = await chromium.launch({ headless: true });
  let grandTotal = 0;

  const urls = [
    'https://sanand0.github.io/tdsdata/js_table/?seed=50',
    'https://sanand0.github.io/tdsdata/js_table/?seed=51',
    'https://sanand0.github.io/tdsdata/js_table/?seed=52',
    'https://sanand0.github.io/tdsdata/js_table/?seed=53',
    'https://sanand0.github.io/tdsdata/js_table/?seed=54',
    'https://sanand0.github.io/tdsdata/js_table/?seed=55',
    'https://sanand0.github.io/tdsdata/js_table/?seed=56',
    'https://sanand0.github.io/tdsdata/js_table/?seed=57',
    'https://sanand0.github.io/tdsdata/js_table/?seed=58',
    'https://sanand0.github.io/tdsdata/js_table/?seed=59'
  ];

  for (const url of urls) {
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle' });
    await page.waitForSelector('table', { timeout: 10000 });
    
    const numbers = await page.evaluate(() => {
      const nums = [];
      document.querySelectorAll('table td, table th').forEach(cell => {
        const text = cell.textContent.trim();
        const num = parseFloat(text);
        if (!isNaN(num)) nums.push(num);
      });
      return nums;
    });
    
    const pageSum = numbers.reduce((acc, n) => acc + n, 0);
    grandTotal += pageSum;
    console.log(`Seed page sum: ${pageSum.toFixed(2)} (URL: ${url})`);
    await page.close();
  }
  
  await browser.close();
  console.log(`GRAND TOTAL SUM OF ALL TABLES: ${grandTotal.toFixed(2)}`);
  return grandTotal;
}

scrapeSums();
