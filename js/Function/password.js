'use strict';

const user = require('../config/models/user');
const bcrypt = require('bcrypt-nodejs');
const nodemailer = require('nodemailer');
const randomstring = require("randomstring");
const config = require('../config/email.json');


	/*
	resetPasswordInit is when user put their email address that 
	server be able to send a toekn through email.
	*/
exports.resetPasswordInit = email =>

	new Promise((resolve, reject) => {

		const random = randomstring.generate(8);

		user.find({ 'local.email': email })

		.then(users => {

			if (users.length == 0) {

				reject({ status: 404, message: 'User Not Found !' });
				// throw would make not go to next .then
				throw ('User Not Found !');

			} else {
				let user = users[0];
				console.log("coming here 2");
				const salt = bcrypt.genSaltSync(10);
				const hash = bcrypt.hashSync(random, salt);

				user.temp_password = hash;
				user.temp_password_time = new Date();

				return user.save();
			}
		})

		.then(user => {
			console.log("coming here 3");
			const transporter = nodemailer.createTransport(`smtps://${config.email}:${config.password}@smtp.gmail.com`);

			const mailOptions = {

    			from: `"${config.name}" <${config.email}>`,
    			to: email,  
    			subject: 'Reset Password Request ', 
    			html: `Hello ${user.name},<br><br>
    			&nbsp;&nbsp;&nbsp;&nbsp; Your reset password token is <b>${random}</b>. 
    			If you are viewing this mail from a Android Device click this <a href = "http://learn2crack/${random}">link</a>. 
    			The token is valid for only 2 minutes.<br><br>
    			Thanks,<br>
    			SmartHome.`
    		
			};
			console.log("before the sendmail.");

			return transporter.sendMail(mailOptions);

		})

		.then(info => {

			console.log("before error");
			console.log(info);
			resolve({ status: 200, message: 'Check mail for instructions' })
		})

		.catch(err => {

			console.log("at the end here.");
			console.log(err);
			reject({ status: 500, message: 'Internal Server Error !' });
		});
	});

	/*
	resetPasswordFinish is after getting the token from the email
	you have to put token and new password to go on.
	*/

exports.resetPasswordFinish = (email, token, password) => 

	new Promise((resolve, reject) => {

		user.find({ email: email })

		.then(users => {

			let user = users[0];

			const diff = new Date() - new Date(user.temp_password_time); 
			const seconds = Math.floor(diff / 1000);
			console.log(`Seconds : ${seconds}`);

			if (seconds < 120) {

				return user;

			} else {

				reject({ status: 401, message: 'Time Out ! Try again' });
				throw ('Time Out ! Try again');
			}
		})

		.then(user => {

			if (bcrypt.compareSync(token, user.temp_password)) {

				const salt = bcrypt.genSaltSync(10);
				const hash = bcrypt.hashSync(password, salt);
				user.hashed_password = hash;
				user.temp_password = undefined;
				user.temp_password_time = undefined;

				return user.save();

			} else {

				reject({ status: 401, message: 'Invalid Token !' });
				throw ('Invalid Token !');
			}
		})

		.then(user => resolve({ status: 200, message: 'Password Changed Sucessfully !' }))

		.catch(err => reject({ status: 500, message: 'Internal Server Error !' }));

	});