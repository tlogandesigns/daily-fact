// // contentScript.js

// // A helper function to get the currently highlighted text on the page
// function getSelectedText() {
//     return window.getSelection().toString();
//   }
  
//   // Listen for messages from the extension (popup or background)
//   chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//     if (request.action === "GET_HIGHLIGHTED_TEXT") {
//       const highlighted = getSelectedText();
//       sendResponse({ text: highlighted });
//     }
//     // We can return "true" if we plan to send a response asynchronously,
//     // but here we send the response immediately, so it's not needed.
//   });