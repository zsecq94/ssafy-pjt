const mysql = require("mysql2/promise");

const pool = mysql.createPool({
	// aws ip
	host: "k8c208.p.ssafy.io",
	// mysql username
	user: "moon",
	// mysql user password
	password: "moonmoon",
	// db name
	database: "Broomi",
	waitForConnections: true,
	connectionLimit: 10,
	queueLimit: 0,
});

module.exports = pool;
