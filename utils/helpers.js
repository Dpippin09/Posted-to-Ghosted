const { format } = require("mysql2");

module.exports = {
  format_date: () => {
    const currentDate = new Date();
    return `${currentDate.getMonth() + 1}/${currentDate.getDate()}/${currentDate.getFullYear()}`;
  }
  }




// function formatDate(date) {
//     return date.toISOString().split('T')[0];
//   }
  
//   // Capitalize the first letter of each word in a string
//   function capitalizeWords(str) {
//     return str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
//   }
  
//   // Check if an email is valid
//   function isValidEmail(email) {
//     const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\\.,;:\s@"]+\.)+[^<>()[\]\\.,;:\s@"]{2,})$/i;
//     return re.test(String(email).toLowerCase());
//   }
  
//   // Debounce function to limit the rate at which a function can fire
//   function debounce(func, wait, immediate) {
//     let timeout;
//     return function() {
//       const context = this, args = arguments;
//       const later = function() {
//         timeout = null;
//         if (!immediate) func.apply(context, args);
//       };
//       const callNow = immediate && !timeout;
//       clearTimeout(timeout);
//       timeout = setTimeout(later, wait);
//       if (callNow) func.apply(context, args);
//     };
//   }
  
//   module.exports = { formatDate, capitalizeWords, isValidEmail, debounce };