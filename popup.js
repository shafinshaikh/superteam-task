document.addEventListener('DOMContentLoaded', () => {
    chrome.storage.local.get(['greeting'], (result) => {
      document.getElementById('greeting').textContent = result.greeting;
    });
  });
  