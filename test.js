var mailer = require('./scripts/sendEmails.js');

console.log('start sending the mail');

mailer.sendService('test', "This is a test message", 'test-attach.txt').then(function(sentEmails,errorList,errorCause){
    conaole.log('mails send');
    console.log('sendEmails : ' + sentEmails);
    console.log('errorList : ' + errorList);
    console.log('errorCause : ' + errorCause);
}, function (err) {
    console.log(err);
})
.catch(function (err) {
    console.log(err);
});