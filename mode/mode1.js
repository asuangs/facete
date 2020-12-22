function handleMessage(sender_psid, received_message) {
    let response;
    
    // Checks if the message contains text
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
                "title":"Call 15263567",
                "payload":"+15105551234"
              }
            ]
          }
        }
      }
      callSendAPI(sender_psid, response);   
    } else if(received_message.text === 'quick') {
      response = {
        "text":"Please share your location:",
        "quick_replies":[
          {
            "content_type":"user_phone_number",
          },
          {
            "content_type":"user_email",
          },
          {
            "content_type":"text",
            "title": '按钮',
            "payload": 'sss'
          }
        ]
      }
      callSendAPI(sender_psid, response, true);
    } else if(received_message.text === 'location') {
      response = {
        "text":"Please share your location:",
        "quick_replies":[
          {
            "content_type":"location",
          },
        ]
      }
      callSendAPI(sender_psid, response, true);
    } else if (received_message.text === 'photo') {
      // Get the URL of the message attachment
      // let attachment_url = received_message.attachments[0].payload.url;
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
    } else if (received_message.text === 'mp4') {
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
      // Create the payload for a basic text message, which
      // will be added to the body of our request to the Send API
      response = {
        "text": `You sent the message: "${received_message.text}". 888!`
      }
      callSendAPI(sender_psid, response); 
    } 
    
  }

export default  handleMessage