var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

var emailSend = function(subject, message, receiverEmail, file){
	// create reusable transporter object using the default SMTP transport
	//var transporter = nodemailer.createTransport('smtp://assistenza%40newbizservizi.it:Pwdinewbiz@62.149.128.202');
	var transporter = nodemailer.createTransport(smtpTransport ({
		  host: 'email-smtp.us-west-2.amazonaws.com',
		  secureConnection: true,
		  port: 465,
		  auth: {
		        user: 'AKIAJAAY6CODO7GQ54WQ',
		        pass: 'AjqhUTXA/9/bU2jn9ZCXKqGSy5Jqbgnk39QU5K5dV9EE'
		  },
		  tls: {
		        rejectUnauthorized:false
		    }
		}));

	// setup e-mail data with unicode symbols
	var mailOptions = {
	    from: '"Nulabs server" <info@newbiz.it>', // sender address
	    to: receiverEmail, // list of receivers
	    subject: subject, // Subject line
	    text: message, // plaintext body
	    html: '<b>Messaggio da Newbiz:</b>\n<p>' + message + '</p>' // html body
	};

	if(file){
		if(file instanceof Array){
			mailOptions.attachments = [];
			for(var i=0; i<file.length; i++){
				mailOptions.attachments.push({'path':'uploads/'+file[i]});
			}
			
		}
		else{
			mailOptions.attachments = [{'path':'uploads/'+file}];
		}
	}

	// send mail with defined transport object
	transporter.sendMail(mailOptions, function(error, info){
	    if(error){
	        return console.log('error sending mail' +error);
	    }
	    console.log('Message sent: ' + info.response);
	});
}

var bulkEmailSend = function(subject, message, receiversArray, fileName){
var dateTime  = new Date();
var msg = dateTime + ' : mail not send';
	// create reusable transporter object using the default SMTP transport
	//var transporter = nodemailer.createTransport('smtp://assistenza%40newbizservizi.it:Pwdinewbiz@62.149.128.202');
	var transporter = nodemailer.createTransport(smtpTransport ({
		  host: 'email-smtp.us-west-2.amazonaws.com',
		  secureConnection: true,
		  port: 465,
		  auth: {
		        user: 'AKIAJAAY6CODO7GQ54WQ',
		        pass: 'AjqhUTXA/9/bU2jn9ZCXKqGSy5Jqbgnk39QU5K5dV9EE'
		  },
		  tls: {
		        rejectUnauthorized:false
		    }
		}));

	// setup e-mail data with unicode symbols
	var mailOptions = {
	    from: '"Nulabs server" <info@newbiz.it>', // sender address
	    bcc: receiversArray, // list of receivers
	    subject: subject, // Subject line
	    text: message, // plaintext body
	    html: '<b>Messaggio da Newbiz:</b>\n<p>' + message + '</p>', // html body
		attachments: [
        { 
            path: '../uploads/'+fileName
        }]
	};

	// send mail with defined transport object
	transporter.sendMail(mailOptions, function(error, info){

	    if(error){
			msg += '\t\nCause' + error;
	    }
		else{
			msg = 'Message sent: ' + info.response;
		}
	    	

		console.log(msg);
		var fs = require('fs');
		try{
			fs.appendFile("sendmail.log", msg + '\n', function(err) {
				if(err) {
					return console.log(err);
				}

				console.log("The file was saved!");
			})
		}
		catch(err){
			fs.writeFile("sendmail.log", msg + '\n', function(err) {
				if(err) {
					return console.log(err);
				}

				console.log("The file was saved!");
			})
		}
		return console.log(error);
	});
}

exports.emailSend = emailSend;

exports.bulkEmailSend = bulkEmailSend;