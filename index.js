const express = require('express')
const axios = require('axios')
const bodyParser = require('body-parser');
const puppeteer = require('puppeteer-core');
const nodeHtmlToImage = require('node-html-to-image');
const app = express()

const url = 'https://api.telegram.org/bot';
const apiToken = '5223743612:AAGgTZqngNqlYYvA7eDaxvRJMWyVKC23980';

/*
app.all('/', (req, res) => {
    console.log("Just got a request!")
    res.send('Yo!')
})
*/
app.use(bodyParser.json());

app.get('/', (req,res) => {
	nodeHtmlToImage({
		output: './image.png',
		html: '<html><body>Hello world!</body></html>'
	})
	.then(() => console.log('The image was created successfully!'))
})

app.post('/', (req,res) => {
    const chatId = req.body.message.chat.id;
    const sentMessage = req.body.message.text;
    if (sentMessage.match(/hello/gi)) {
        axios.post(`${url}${apiToken}/sendMessage`,
               {
                    chat_id: '120611120',
                    text: 'hello back 👋'
               })
               .then((response) => { 
                    res.status(200).send(response);
               }).catch((error) => {
                    res.send(error);
               });
    }else{
          // if no hello present, just respond with 200 
          res.status(200).send({});
     }
})
app.listen(process.env.PORT || 3000)
