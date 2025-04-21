// script.js

// Use Frankfurter API for reliable CORS support
// and static currency list matching your top currencies

document.addEventListener('DOMContentLoaded', () => {
    const amountInput = document.getElementById('amount');
    const fromSelect = document.getElementById('from-currency');
    const toSelect = document.getElementById('to-currency');
    const resultEl = document.getElementById('result');
  
    // Top currencies and their names
    const currencies = {
      USD: 'US Dollar',
      EUR: 'Euro',
      JPY: 'Japanese Yen',
      GBP: 'British Pound',
      AUD: 'Australian Dollar',
      CAD: 'Canadian Dollar',
      CHF: 'Swiss Franc',
      CNY: 'Chinese Yuan',
      HKD: 'Hong Kong Dollar',
      NZD: 'New Zealand Dollar'
    };
  
    // Populate dropdowns from static list
    function populateDropdowns() {
      fromSelect.innerHTML = '';
      toSelect.innerHTML = '';
  
      const placeholderFrom = new Option('From Currency', '');
      const placeholderTo = new Option('To Currency', '');
      placeholderFrom.disabled = true;
      placeholderTo.disabled = true;
      placeholderFrom.selected = true;
      placeholderTo.selected = true;
      fromSelect.add(placeholderFrom);
      toSelect.add(placeholderTo);
  
      for (const [code, name] of Object.entries(currencies)) {
        fromSelect.add(new Option(`${code} – ${name}`, code));
        toSelect.add(new Option(`${code} – ${name}`, code));
      }
    }
  
    // Perform conversion via Frankfurter API
    async function convertCurrency() {
      const amount = parseFloat(amountInput.value);
      const from = fromSelect.value;
      const to = toSelect.value;
  
      if (!amount || !from || !to) {
        resultEl.textContent = '0.00';
        return;
      }
  
      resultEl.textContent = 'Loading...';
      try {
        const res = await fetch(
          `https://api.frankfurter.app/latest?amount=${amount}&from=${from}&to=${to}`
        );
        if (!res.ok) throw new Error(`API error: ${res.status}`);
        const data = await res.json();
        const converted = data.rates[to];
        resultEl.textContent = converted.toFixed(2);
      } catch (err) {
        console.error('Conversion failed:', err);
        resultEl.textContent = 'Error';
      }
    }
  
    // Bind events
    amountInput.addEventListener('input', convertCurrency);
    fromSelect.addEventListener('change', convertCurrency);
    toSelect.addEventListener('change', convertCurrency);
  
    // Initialize
    populateDropdowns();
  });
  