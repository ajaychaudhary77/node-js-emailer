'use strict'
var sql = require('mssql');
var events = require('events');
var Promise = require('promise');
var emitter = new events.EventEmitter();
//var mongoose = require ('mongoose');
var email = require('./emailSender');
//var soap = require('easysoap');

exports.sendService = function (subject, message, file){
		console.log(subject + '\n'+ message + '\n' + file)
		var promise = new Promise(function (resolve, reject) {
			try{
				sql.connect("connection string").then(function() {
					// Query 
					console.log('connected');
					var emailQuery =`select sedeoperativaemail from clienti where aziendaid=1
									and sedeoperativaemail is not null and len(sedeoperativaemail)>0
									group by sedeoperativaemail
									order by sedeoperativaemail`;
					console.log(emailQuery);
					new sql.Request().query(emailQuery).then(function(recordsetPre) {
						var RegExEmail = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;

						var recordset = [];
						for (var index = 0; index < recordsetPre.length; index++) {
							if (recordsetPre[index].sedeoperativaemail.trim().match(RegExEmail)) {
								recordset.push(recordsetPre[index]);
							}			
						}

						//uncomment this line for testing
						recordset = [
							'bacin@newbiz.it', 'info@newbiz.it', 'assistenza@newbizservizi.it', 'alessio.bacin@gmail.com', 'ajaychaudharybkn@gmail.com'
						]
						
						var maxRecordset = recordset.length;
						//console.log(recordset.length);
						//console.log(recordset);
						
						var sentEmails =[];
						var errorList = [];
						var errorCause = '';
					
						
						for (var i = 0; i < maxRecordset; i++) {
							try {
								//send mail if not already send
								email.emailSend(subject, message, recordset[i],file);
								console.log(recordset[i]);
								//console.log(mailAddresses);
							} catch (error) {
								//console.log('error 1' + error);
								errorCause+=error+' ,' + '\n';
								errolist.push(mailAddresses);
								
							}
							
							//console.log("Slice number " + sliceNumber + " of " + numberOfSlices + " is complete");
							
							
							if(i == maxRecordset){
								
								setTimeout(function(){email.emailSend('Report email inviate', JSON.stringify(sentEmails),'bacin@newbiz.it; candida@newbizservizi.it', 'comunicazione.pdf')}, inc*10000);
								resolve(JSON.stringify(sentEmails), JSON.stringify(errorList), JSON.stringify(errorCause));
																
							}
								

						}
						

					});
				}).catch(function(err){
				//console.log('Error Sending mail '+ err);
				reject(err);	
			});
		}
		catch(err){
			//console.log('Error Sending mail '+ err);
			reject(err);	
		}
	
	});
	return promise;
}