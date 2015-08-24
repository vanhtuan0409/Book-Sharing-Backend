var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

module.exports = {
	sendEmail: function(email, subject, text) {
		var generator = require('xoauth2').createXOAuth2Generator({
			user: 'booksharing.atware@gmail.com',
			clientId: '737929423632-sq11jmsdi4q3d91a8u7ej8st740ji7ee.apps.googleusercontent.com',
			clientSecret: 'gBl_Qx9fCzuqURmwlZTNLDzc',
			refreshToken: '1/fdiSKMbi9CkVitBVknmfL3laAfiLrS-ATQLEeU2E5Ik',
		});


		generator.on('token', function(token) {
			console.log('New token for %s: %s', token.user, token.accessToken);
		});

		var transporter = nodemailer.createTransport(smtpTransport({
			service: 'Gmail',
			auth: {
				xoauth2: generator
			}
		}));

		var mailOptions = {
			from: 'Book Sharing atWare<booksharing.atware@gmail.com>', // sender address
			to: email,
			subject: subject, // Subject line
			text: text
		};
		transporter.sendMail(mailOptions, function(error, info) {
			if (error) {
				console.log("Error: ", error);
			} else {
				console.log('Message sent: ' + info.response);
			}
		});
	}
}