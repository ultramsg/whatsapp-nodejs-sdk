# [Ultramsg.com](https://ultramsg.com/?utm_source=github&utm_medium=nodejs&utm_campaign=api) WhatsApp API nodejs SDK

 Lightweight library for WhatsApp API to send the whatsappp messages in nodejs provided by  [Ultramsg.com](https://ultramsg.com/?utm_source=github&utm_medium=nodejs&utm_campaign=api)

# Installation
 
```
npm i ultramsg-whatsapp-api
```


# Example usage

```js
const ultramsg = require('ultramsg-whatsapp-api');
const instance_id= "instance1150" // Ultramsg.com instance id
const ultramsg_token= "tof7lsdJasdloaa57e"  // Ultramsg.com token
const api = new ultramsg(instance_id,ultramsg_token);
(async function () {
    var to = "put_your_mobile_number_here"
    var body = "Hello world" 
    const response = await api.sendChatMessage(to,body);
   console.log(response)
})(); 
```
 > **NOTE:**  you need replace instance_id and token with yours in [ultramsg.com](https://ultramsg.com/?utm_source=github&utm_medium=nodejs&utm_campaign=api) account if you don't have account create one from [here](https://ultramsg.com/?utm_source=github&utm_medium=nodejs&utm_campaign=api)



## Send Message
* **to** :  your number for testing with international format e.g. +14155552671 or chatID for contact or group e.g 14155552671@c.us or 14155552671-441234567890@g.us
* **body** : Message text, UTF-8 or UTF-16 string with emoji .
* **priority** : This parameter is optional,

You can use it to create a professional queue for messages, The Messages with less priority value are sent first.

example of usage :

priority = 0: for High priority like OTP messages.

priority = 5: used with general messages.

priority =10: Non-urgent promotional offers and notifications to your customers.

**Default value** : 10
* **referenceId** : Your custom reference ID for this message.
```js
var to="put_your_mobile_number_here"; 
var body="Hello world";
var priority=10;
var referenceId="SDK";
const response = await api.sendChatMessage(to,body,priority,referenceId);
console.log(response)
```

## Send Image 
* **caption** : image Caption, UTF-8 or UTF-16 string with emoji .
* **image** : HTTP link image or base64-encoded file

Supported extensions ( jpg , jpeg , gif , png , svg , webp , bmp ) .

Max file size : 16MB .

Max Base64 length : 2,000,000

* **nocache** : default false

false : use a previously uploaded file instead of uploading it with each request

true : uploading it each request

```js
var to="put_your_mobile_number_here"; 
var caption="image Caption"; 
var image="https://file-example.s3-accelerate.amazonaws.com/images/test.jpg"; 
var priority=10;
var referenceId="SDK"
var nocache=false; 
const response = await api.sendImageMessage(to,caption,image,priority,referenceId,nocache);
console.log(response)
```
## Send Document 
* **filename** : File name, for example 1.jpg or Hello.pdf
* **document** : HTTP link file or base64-encoded file

Supported most extensions like ( zip , xlsx , csv , txt , pptx , docx ....etc ) .

Max file size : 100MB .

Max Base64 length : 2,000,000

```js
var to="put_your_mobile_number_here"; 
var filename="cv.pdf"; 
var document="https://file-example.s3-accelerate.amazonaws.com/documents/cv.pdf"; 
const response = await api.sendDocumentMessage(to,filename,document);
console.log(response)
```

## Send Audio 
* **audio** : HTTP link audio or base64-encoded audio 

Supported extensions ( mp3 , aac , ogg ) .

Max file size : 16MB .

Max Base64 length : 2,000,000

```js 
var to="put_your_mobile_number_here"; 
var audio="https://file-example.s3-accelerate.amazonaws.com/audio/2.mp3"; 
const response = await api.sendAudioMessage(to,audio);
console.log(response)
```
## Send Voice 
* **audio** : HTTP link audio ogg-file with opus codec or base64 ogg-file in opus codec

Max file size : 16MB .

Max Base64 length : 2,000,000

```js 
var to="put_your_mobile_number_here"; 
var audio="https://file-example.s3-accelerate.amazonaws.com/voice/oog_example.ogg"; 
const response = await api.sendVoiceMessage(to,audio);
console.log(response)
```

## Send Video 
* **video** : HTTP link video or base64-encoded video  

Supported extensions ( mp4 , 3gp , mov ) .

Max file size : 16MB .

Max Base64 length : 2,000,000

```js 
var to="put_your_mobile_number_here"; 
var caption="video Caption"; 
var video="https://file-example.s3-accelerate.amazonaws.com/video/test.mp4"; 
const response = await api.sendVideoMessage(to,caption,video);
console.log(response)
```
## Send Link 
* **link** : HTTP or HTTPS link

```js 
var to="put_your_mobile_number_here"; 
var link="https://ultramsg.com"; 
const response = await api.sendLinkMessage(to,link);
console.log(response)
```
## Send Contact 
* **contact** :Contact ID or Contact IDs array example :

Example

14000000001@c.us

or

14000000001@c.us,14000000002@c.us,14000000003@c.us

Max length : 300 char, almost 15 contacts
```js 
var to="put_your_mobile_number_here"; 
var contact="14000000001@c.us"; 
const response = await api.sendContactMessage(to,contact);
console.log(response)
```
## Send Location 
* **address** : Text under the location.

Supports two lines. To use two lines, use the \n symbol.

Max length : 300 char .
* **lat** : Latitude
* **lng** : longitude
```js 
var to="put_your_mobile_number_here"; 
var address="ABC company \n Sixth floor , office 38"; 
var lat="25.197197"; 
var lng="55.2721877"; 
const response = await api.sendLocationMessage(to,address,lat,lng);
console.log(response)
```
## Send Vcard 
* **vcard** : Text value vcard 3.0

Max length : 4096 char

```js 
var to="put_your_mobile_number_here"; 
var vcard=`BEGIN:VCARD
VERSION:3.0
N:lastname;firstname
FN:firstname lastname
TEL;TYPE=CELL;waid=14000000001:14000000002
NICKNAME:nickname
BDAY:01.01.1987
X-GENDER:M
NOTE:note
ADR;TYPE=home
ADR;TYPE=work
END:VCARD`; 
const response = await api.sendVcardMessage(to,vcard);
console.log(response)
```
## Resend messages by status 
* **status** : unsent or expired

```js  
var status="expired"; 
const response = await api.resendByStatus(status);
console.log(response)
```
## Resend message by ID 
* **id** : message id

```js  
var id="123"; 
const response = await api.resendById(id);
console.log(response)
```


## Get Messages
get the messages that sent by api

* **page** : pagination page number
* **limit** : number of messages per request . max value : 100 .
* **status** : Messages status [sent , queue , unsent]
  - sent : get sent messages .
  - queue : get queue messages .
  - unsent : get unsent messages .
  - invalid : get invalid messages .
  - all : get all messages .
* **sort** :  
  - asc : sorted messages by ID from smallest to largest .
  - desc : sorted messages by ID from largest to smallest .
* **id** : filter messages by message ID .
* **referenceId** : filter messages by your custom reference ID .
* **from** : filter messages by WhatsApp sender number e.g 14155552671@c.us .
* **to** : filter messages by recipient number  e.g 14155552671@c.us or 14155552671-441234567890@g.us .
* **ack** : filter messages by message ack status [ pending , server , device , read , played ] .


```js 
var page=1;
var limit=100;
var status="all";
var sort="asc";
var id="";
var referenceId="";
var from="";
var to="";
var ack="";
const response = await api.getMessages(page,limit,status,sort,id,referenceId,from,to,ack);
console.log(response)
```

## Get Messages Statistics 

```js 
const response = await api.getMessageStatistics();
console.log(response)
```

## Get Instance Status 

```js 
const response = await api.getInstanceStatus();
console.log(response)
```

## Get Instance QR Image

```js 
const response = await api.getInstanceQr();
console.log(response)
```
## Get Instance QR Code 

```js  
const response = await api.getInstanceQrCode();
console.log(response)
```
## Get Instance Screenshot 
 
```js  
const response = await api.getInstanceScreenshot();
console.log(response)
```
or base64
```js
const response = await api.getInstanceScreenshot("base64");
console.log(response)
```
## Get Instance Info
Get connected phone informations : number , name , image etc..
```js
const response = await api.getInstanceMe();
console.log(response)
```
## Get Instance Settings
sendDelay : Delay in seconds between sending message, Default 1 second

webhook_url : Http or https URL for receiving notifications .

webhook_message_ack : on/off ack (message delivered and message viewed) notifications in webhooks.

webhook_message_received : on/off notifications in webhooks when message received .

webhook_message_create : on/off notifications in webhooks when message create .

webhook_message_download_media  :  on/off to get received document / media files.
```js
const response = await api.getInstanceSettings();
console.log(response)
```

## Instance Takeover
Returns the active session if the device has connected to another instance of Web WhatsApp

```js  
const response = await api.sendInstanceTakeover();
console.log(response)
```
## Instance Logout
Logout from WhatsApp Web to get new QR code.

```js  
const response = await api.sendInstanceLogout();
console.log(response)
```
## Instance Restart
Restart your instance.

```js  
const response = await api.sendInstanceRestart();
console.log(response)
```
## Instance Settings Update
* **sendDelay** : Delay in seconds between sending message .

* **webhook_url** : Http or https URL for receiving notifications .

* **webhook_message_received** : true/false notifications in webhooks when message received .

* **webhook_message_create** : true/false notifications in webhooks when message create .

* **webhook_message_ack** : true/false ack (message delivered and message viewed) notifications in webhooks.

```js  
var sendDelay=1;
var webhook_url="";
var webhook_message_received=false;
var webhook_message_create=false;
var webhook_message_ack=false;
var webhook_message_download_media=false;

const response = await api.sendInstanceSettings(sendDelay,webhook_url,webhook_message_received,webhook_message_create,webhook_message_ack,webhook_message_download_media);
console.log(response)
```

## Get the chats list

```js  
const response = await api.getChats();
console.log(response)
```

## get last message from chat conversation

* **chatId** : chatID for contact or group e.g 14155552671@c.us or 14155552671-441234567890@g.us
* **limit** : number of messages per request .

max value : 1000 .

```js  
var chatId="14155552671@c.us";
var limit=100;
const response = await api.getChatsMessages(chatId,limit);
console.log(response)
```


## Get the contacts list

```js  
const response = await api.getContacts();
console.log(response)
```

## Get contact info

* **chatId** : chatID for contact e.g 14155552671@c.us 

```js  
var chatId="14155552671@c.us"; 
const response = await api.getContact(chatId);
console.log(response)
```


## Gets all blocked contacts

```js  
const response = await api.getBlockedContacts();
console.log(response)
```

## block contact from WhatsApp

* **chatId** : chatID for contact e.g 14155552671@c.us 

```js  
var chatId="14155552671@c.us"; 
const response = await api.blockContact(chatId);
console.log(response)
```

## Unblock contact from WhatsApp

* **chatId** : chatID for contact e.g 14155552671@c.us 

```js  
var chatId="14155552671@c.us"; 
const response = await api.unblockContact(chatId);
console.log(response)
```

## Check if number is WhatsApp user

* **chatId** : chatID for contact e.g 14155552671@c.us 

```js  
var chatId="14155552671@c.us"; 
const response = await api.checkContact(chatId);
console.log(response)
```



# Support
Use **Issues** to contact me