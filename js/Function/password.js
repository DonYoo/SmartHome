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

		user.findOne({ 'local.email': email })

		.then(users => {
			if (users.length == 0) {

				reject({ status: 404, message: 'User Not Found !' });
				// throw would make go to catch
				throw ('User Not Found !');

			} else {
				let user = users[0];
				
				const salt = bcrypt.genSaltSync(10);
				const hash = bcrypt.hashSync(random, salt);

				user.local.temp_password = hash;
				// save the current time at the DB for limit 2 min for user change password time
				user.local.temp_password_time = new Date();
				return user.save();
			}
		})

		.then(user => {
			const transporter = nodemailer.createTransport(`smtps://${config.email}:${config.password}@smtp.gmail.com`);

			const mailOptions = {

    			from: `"${config.name}" <${config.email}>`,
    			to: email,  
    			subject: 'Reset Password Request ', 
    			html: `Hello ${user.local.name},<br><br>
    			&nbsp;&nbsp;&nbsp;&nbsp; Your reset password token is <b>${random}</b>. 
    			If you are viewing this mail from a Android Device click this <a href = "http://learn2crack/${random}">link</a>. 
    			The token is valid for only 2 minutes.<br><br>
    			Thanks,<br>
    			SmartHome.`
    		
			};
			return transporter.sendMail(mailOptions);

		})

		.then(info => {
			
			console.log(info);
			resolve({ status: 200, message: 'Check mail for instructions' })
		})

		.catch(err => {
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

		user.findOne({ 'local.email': email })

		.then(users => {
			let user = users[0];

			// Calculate time and check if its less than 2 min.
			const diff = new Date() - new Date(user.local.temp_password_time); 
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

			if (bcrypt.compareSync(token, user.local.temp_password)) {

				const salt = bcrypt.genSaltSync(10);
				const hash = bcrypt.hashSync(password, salt);
				// reset the password
				user.local.password = hash;

				// buffer clear
				user.local.temp_password = undefined;
				user.local.temp_password_time = undefined;

				return user.save();

			} else {

				reject({ status: 401, message: 'Invalid Token !' });
				throw ('Invalid Token !');
			}
		})

		.then(user => resolve({ status: 200, message: 'Password Changed Sucessfully !' }))

		.catch(err => reject({ status: 500, message: 'Internal Server Error !' }));

	});


	
exports.changePassword = (email, password, newPassword) => 

	new Promise((resolve, reject) => {

		user.findOne({ 'local.email': email })

		.then(users => {
			let user = users;
			const hashed_password = user.local.password;

			if (bcrypt.compareSync(password, hashed_password)) {

				const salt = bcrypt.genSaltSync(10);
				const hash = bcrypt.hashSync(newPassword, salt);
				user.local.password = hash;
				return user.save();		// have to save the whole user schema.

			} else {
				reject({ status: 401, message: 'Invalid Old Password !' });
			}
		})

		.then(user => {
			resolve({ status: 200, message: 'Password Updated Sucessfully !' })
		})

		.catch(err => {
			reject({ status: 500, message: 'Internal Server Error !!' })
		}
		);

	}
);