const express = require("express")
const nodeMailer = require("nodemailer")

const transporter = nodeMailer.createTransport({
    host: "127.0.0.1",
    port: "1025",
    secure: false,
})

const app = express();

app.get("/send",(req,res)=>{
   const mailOption = {
    from: "tarunsharma@gmail.com",
    to: "do-not-reply@testmail.com",
    subject: "Form",
    html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Contact Form</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    margin: 50px;
                }
                form {
                    max-width: 500px;
                    margin: 0 auto;
                    padding: 20px;
                    border: 1px solid #ccc;
                    border-radius: 5px;
                }
                input, textarea, button {
                    width: 100%;
                    padding: 10px;
                    margin: 5px 0;
                }
                button {
                    background-color: #4CAF50;
                    color: white;
                    border: none;
                }
            </style>
        </head>
        <body>
            <form id="contact-form" action="/send" method="post">
                <h2>Contact Us</h2>
                <input type="text" id="name" name="name" placeholder="Your Name" required>
                <input type="email" id="email" name="email" placeholder="Your Email" required>
                <textarea id="message" name="message" rows="4" placeholder="Your Message" required></textarea>
                <button type="submit">Send</button>
            </form>
        </body>
        </html>
    `,
   }


transporter.sendMail(mailOption,(err,info)=>{
    if(err){
        console.log(err)
        res.status(500).json({ success: false, message: "Error sending mail" });
    }else{
        console.log(info)
        res.status(200).json({ success: true, message: "Mail sent successfully" });
    }
})
})

app.listen("6000",()=>{
    console.log("Server is running on port 6000")
})