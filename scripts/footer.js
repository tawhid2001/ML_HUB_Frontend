// footer.js
// Injects a reusable footer into all footer sections

document.addEventListener('DOMContentLoaded', function() {
  const footerHTML = `
    <div>
      &copy; 2025 My ML HUB. All rights reserved.
    </div>
  `;
  document.querySelectorAll('footer').forEach(footer => {
    footer.innerHTML = footerHTML;
  });
});
