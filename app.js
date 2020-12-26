/**
 * Copyright 2017-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * Messenger Platform Quick Start Tutorial
 *
 * This is the completed code for the Messenger Platform quick start tutorial
 *
 * https://developers.facebook.com/docs/messenger-platform/getting-started/quick-start/
 *
 * To run this code, you must do the following:
 *
 * 1. Deploy this code to a server running Node.js
 * 2. Run `npm install`
 * 3. Update the VERIFY_TOKEN
 * 4. Add your PAGE_ACCESS_TOKEN to your environment vars
 *
 */

'use strict';
process.env.PAGE_ACCESS_TOKEN = "EAAFeGS7P3ycBAJWJ7cN3QTF06IFtqH0wooLTqkYo9l6oSg6as2pBOvcZAIPN9zWDMiBqPva778WI55QeeX3tjCIDAxXkiWtL8hNIkVG8UqMdYZCrKA3M6LNEcaPFIwPI8h6yjLrBx8QnxqhZCYAa05ZCZC7LVoOR0FtWmJjqZABEZCUbuCURDVO"
let PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;
// Imports dependencies and set up http server

// https://w.dyxiu.cn/webhook.php?corpid=1034604370061806
const 
  request = require('request'),
  express = require('express'),
  body_parser = require('body-parser'),
  app = express().use(body_parser.json()); // creates express http server
  let modeVar = 'txt'

  let pageList = {}

// Sets server port and logs message on success
app.listen(process.env.PORT || 1337, () => console.log('webhook is listening'));

app.use(express.static('public'));
app.get('/main.html', function (req, res) { res.sendFile( __dirname + "/main.html" ); })
app.get('/', function (req, res) { res.sendFile( __dirname + "/public/index.html" ); })
// Accepts POST requests at /webhook endpoint
app.post('/webhook', (req, res) => {  

  // Parse the request body from the POST
  let body = req.body;

  // Check the webhook event is from a Page subscription
  if (body.object === 'page') {

    body.entry.forEach(function(entry) {

      // Gets the body of the webhook event
      let webhook_event = entry.messaging[0];
      console.log(webhook_event);


      // Get the sender PSID
      let sender_psid = webhook_event.sender.id;
      console.log('Sender ID: ' + sender_psid);

      // Check if the event is a message or postback and
      // pass the event to the appropriate handler function
      if (webhook_event.message) {
        handleMessage(sender_psid, webhook_event.message);     
      } else if (webhook_event.postback) {
        
        handlePostback(sender_psid, webhook_event.postback);
      }
      
    });
    // Return a '200 OK' response to all events
    res.status(200).send('EVENT_RECEIVED');

  } else {
    // Return a '404 Not Found' if event is not from a page subscription
    res.sendStatus(404);
  }

});

// Accepts GET requests at the /webhook endpoint
app.get('/webhook', (req, res) => {
  
  /** UPDATE YOUR VERIFY TOKEN **/
  const VERIFY_TOKEN = PAGE_ACCESS_TOKEN;
  
  // Parse params from the webhook verification request
  let mode = req.query['hub.mode'];
  let token = req.query['hub.verify_token'];
  let challenge = req.query['hub.challenge'];
    
  // Check if a token and mode were sent
  if (mode && token) {
  
    // Check the mode and token sent are correct
    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      
      // Respond with 200 OK and challenge token from the request
      console.log('WEBHOOK_VERIFIED');
      res.status(200).send(challenge);
    
    } else {
      // Responds with '403 Forbidden' if verify tokens do not match
      res.sendStatus(403);
    }
  }
});
app.get('/public', (req, res) => {
  
  let type = req.query['type'];
    
  console.log(type)
  if (type) {
    modeVar = type
    
    res.status(200).send('200');
    
  } else {
    res.sendStatus(403);      
  }
})
app.get('/saveInfo', (req, res) => {
  
  let userid = req.query['userid'];
  let page_token = req.query['page_token'];

  if (userid) {
    
    pageList[userid] = page_token

    res.status(200).send('200');
    
  } else {
    res.sendStatus(403);      
  }
})

function handleMessage(sender_psid, received_message) {
  let response;
  // if(received_message.text === 'quick') {
  //   response = {
  //     "text":"Please share your location:",
  //     "quick_replies":[
  //       {
  //         "content_type":"user_phone_number",
  //       },
  //       {
  //         "content_type":"user_email",
  //       },
  //       {
  //         "content_type":"text",
  //         "title": '按钮',
  //         "payload": 'sss'
  //       }
  //     ]
  //   }
  //   callSendAPI(sender_psid, response, true);
  // }

  // Checks if the message contains text
  if(modeVar == 'phone'){
    if (received_message.text === 'phone') {
      response = {
        "attachment":{
          "type":"template",
          "payload":{
            "template_type":"button",
            "text":"Need further assistance? Talk to a representative",
            "buttons":[
              {
                "type":"phone_number",
                "title":"请拨打电话",
                "payload":"+15105551234"
              }
            ]
          }
        }
      }
      callSendAPI(sender_psid, response);
    } else if (received_message.text) { 
      response = {
        "text": `"${received_message.text}". 打电话按钮模板!`+ sender_psid
      }
      callSendAPI(sender_psid, response); 
    }
  }

  if(modeVar == 'photo'){
    if (received_message.text === 'photo') {
    
      response = {
        "attachment": {
          "type": "template",
          "payload": {
            "template_type": "generic",
            "elements": [{
              "title": "1",
              "image_url": 'https://facete.herokuapp.com/logo.png',
              "buttons": [
                {
                  "type":"web_url",
                  "url":"https://facete.herokuapp.com",
                  "title":"View Website"
                },
                {
                  "type": "postback",
                  "title": "No!",
                  "payload": "no",
                }
              ],
            },{
              "title": "Is this the right picture?",
              "subtitle": "Tap a button to answer.",
              "image_url": 'https://facete.herokuapp.com/styles/female-work.jpg',
              "buttons": [
                {
                  "type":"web_url",
                  "url":"https://facete.herokuapp.com",
                  "title":"View Website"
                },
                {
                  "type": "postback",
                  "title": "No!",
                  "payload": "no",
                }
              ],
            }]
          }
        }
      } 
      callSendAPI(sender_psid, response); 
    } else if (received_message.text) { 
      response = {
        "text": `"${received_message.text}". 图片模板!+`+ sender_psid
      }
      callSendAPI(sender_psid, response); 
    }
  }
  if(modeVar == 'mp4'){
    if (received_message.text === 'mp4') {
      attachmentsSendAPI(sender_psid, {
        "attachment":{
          "type":"video",
          "payload":{
            "is_reusable": true,
            "url":"https://facete.herokuapp.com/448.mp4"
          }
        }
      })
    } else if (received_message.text) { 
      response = {
        "text": `"${received_message.text}". MP4视频模板!`+ sender_psid
      }
      callSendAPI(sender_psid, response); 
    }
  }
  if(modeVar == 'txt'){
    if(received_message.text == 'map'){
      
      // messageData = {
      //   "attachment": {
      //     "type": "template",
      //     "payload": {
      //       "template_type": "generic",
      //       "elements": [{
      //         "title": 'Location Shared By Bot',
      //         "subtitle": "Location Subtitle",
      //         "image_url": "https://maps.googleapis.com/maps/api/staticmap?key=YOUR_GMAPS_TOKEN&markers=color:red|label:B|YOUR_LATITUDE,YOUR_LONGITUDE&size=360x360&zoom=13",
      //         "default_action": {
      //             "type": "web_url",
      //             "url": "https://maps.googleapis.com/maps/api/staticmap?key=YOUR_GMAPS_TOKEN&markers=color:red%7Clabel:A%7YOUR_LATITUDE,YOUR_LONGITUDE&size=360x360&zoom=13",
      //             "messenger_extensions": true,
      //             "webview_height_ratio": "tall"
      //           }
      //       }]
      //     }
      //   }
      // https://maps.googleapis.com/maps/api/staticmap?center=Williamsburg,Brooklyn,NY&zoom=13&size=400x400&markers=color:blue%7Clabel:S%7C11211%7C11206%7C11222&key=AIzaSyDd_Ch_qilgKUgZft4Y4VQYQPaHRrmXaak
      response = {
        "attachment": {
        "type": "template",
        "payload": {
            "template_type": "generic",
            "elements": [
              {
                "title": "Williamsburg location",
                "image_url": "https://maps.googleapis.com/maps/api/staticmap?center=Williamsburg&zoom=13&size=400x400&key=AIzaSyDd_Ch_qilgKUgZft4Y4VQYQPaHRrmXaak",
                "item_url": "https://www.google.com/maps/search/?api=1&query=Williamsburg",
                "buttons": [
                  {
                    "type":"web_url",
                    "url":"https://www.google.com/maps/search/?api=1&query=Williamsburg",
                    "title":"get to place"
                  }
                ],
              }
            ]
          }
        }
      }
      callSendAPI(sender_psid, response); 
    }else{
      
      response = {
        "text": `"${received_message.text}". 90文本对话模板!`+ sender_psid
      }
      callSendAPI(sender_psid, response); 
    }
  }
}

function handlePostback(sender_psid, received_postback) {
  console.log('ok')
   let response;
  // Get the payload for the postback
  let payload = received_postback.payload;

  // Set the response based on the postback payload
  if (payload === 'yes') {
    response = { "text": "Thanks!" }
  } else if (payload === 'no') {
    response = { "text": "Oops, try sending another image." }
  }
  // Send the message to acknowledge the postback
  callSendAPI(sender_psid, response);
}

function callSendAPI(sender_psid, response, bool) {
  // Construct the message body
  let request_body = {
    "recipient": {
      "id": sender_psid
    },
    "message": response
  }
if(bool){
  request_body.messaging_type = "RESPONSE"
}
  // Send the HTTP request to the Messenger Platform
  request({
    "uri": "https://graph.facebook.com/v9.0/me/messages",
    "qs": { "access_token": pageList[sender_psid] },
    "method": "POST",
    "json": request_body
  }, (err, res, body) => {
    if (!err) {
      console.log('message sent!')
    } else {
      console.error("Unable to send message:" + err);
    }
  }); 
}

// 附件上传api
function attachmentsSendAPI(sender_psid, response) {
  // Construct the message body
  let request_body = {
    "message": response
  }
  callSendAPI(sender_psid, {
    text: '开始请求'
  })
  // Send the HTTP request to the Messenger Platform
  request({
    "uri": "https://graph.facebook.com/v9.0/me/message_attachments",
    "qs": { "access_token": pageList[sender_psid] },
    "method": "POST",
    "json": request_body
  }, (err, res, body) => {
    callSendAPI(sender_psid, {
      text: '完成请求' + JSON.stringify(body)
    })
    if (!err) {
      console.log('message sent!')
      callSendAPI(sender_psid, {
        "attachment": {
          "type": "template",
          "payload": {
            "template_type": "media",
            "elements": [
              {
                "media_type": "video",
                "attachment_id": body.attachment_id,
                "buttons": [
                  {
                    "type": "web_url",
                    "url": "https://facete.herokuapp.com",
                    "title": "View Website",
                  },
                  {
                    "type": "web_url",
                    "url": "https://facete.herokuapp.com",
                    "title": "View Website",
                  }
                ]
              }
            ]
          }
        }
      })
    } else {
      console.error("Unable to send message:" + err);
    }
  }); 
}