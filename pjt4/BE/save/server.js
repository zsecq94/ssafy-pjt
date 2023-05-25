const https = require("https");
const express = require("express");
const cors = require("cors");
var morgan = require('morgan');
var logger = require('./utility/winston.js');
const credentials = require("./utility/credentials.js")
const app = express();
const PORT = 8080;

//k8c208.p.ssafy.io
app.use(cors());
app.use(express.json());
app.use(morgan('combined', {
    stream: logger.stream
})); 

// moonisgoodman=RURANFCLWL123TJDDMLWJDTLA345TNTLSWPRK567CLRNRVUDCJSGK789
app.get("/", async (req, res) => {
	let target = "exit.html";
	
	logger.info(req.query);
	
	if(req.query.moonisgoodman === "RURANFCLWL123TJDDMLWJDTLA345TNTLSWPRK567CLRNRVUDCJSGK789") {
		target = "index.html";
	}
	return res.sendFile(target, {
		root : "./views"
	});
});



app.post('/api/version', async(req, res) => {
	let state = false;
	let msg = "version >> error";
	console.log(req.body);

	if(req.body.version == version){
		state = true;
		msg = "okisbacon";
	}

	console.log(msg);
	logger.info(msg);

	return res.json({
		success : state, message : msg
	});
})


https.createServer(credentials, app).listen(PORT, () => console.log(`this server listening on ${PORT}`));
