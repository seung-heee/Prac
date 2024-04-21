// Get the client
const mysql = require('mysql2');

// Create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'seunghee0987^^',
  database: 'youtube',
  dateStrings: true
});

// Using placeholders
// connection.query(
//   'SELECT * FROM `policy`',
//   ['Page', 45],
//   function (err, results) {
//     console.log(results);
//     results.map((item)=>{
//       console.log('key : ', item.key)
//       console.log('title : ', item.title)
//       console.log('sub_title : ', item.sub_title)
//       console.log('img : ', item.img)
//     })
//   }
// );

module.exports = connection;