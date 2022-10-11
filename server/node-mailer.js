const nodemailer=require("nodemailer");
require("dotenv").config();

const {emailServerUser,emailServerPass}=process.env;

const sendEmailToAdmin=(messageProp)=>{

    console.log("messageProp: ", messageProp);

    const emailTransport = {
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: emailServerUser,
          pass: emailServerPass
        }
      };
    
    const content={
        from: messageProp.email,
        to: "d496dc3ee7-dd5b0c@inbox.mailtrap.io",
        subject: "User Feedback",
        text: messageProp.feedback
    }

    const send=async(data)=>{
        nodemailer.createTransport(emailTransport)
        .sendMail(data, (error, info)=>{
            if (error)
            {
                console.log("Error: ", error);
            }
            else
            {
                console.log("Info: ", info);
                return info.response;
            }
        });
    }

    send(content);    

}

module.exports={
    sendEmailToAdmin
}