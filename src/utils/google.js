import { google } from "googleapis";
import nodemailer from "nodemailer";

const clientId = process.env.CID;
const clientSecret = process.env.CSK;
const redirectUri = process.env.RUI;
const refreshToken = process.env.RTK;

const oauth2Client = new google.auth.OAuth2(
  clientId,
  clientSecret,
  redirectUri
);

const drive = google.drive({
  version: "v3",
  auth: oauth2Client,
});

oauth2Client.setCredentials({
  refresh_token: refreshToken,
});

//-----------------------------------------------> sending mail using gmail
async function sendMail(mailContent = {}) {
  try {
    const accessToken = await oauth2Client.getAccessToken();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "cleancity1507@gmail.com",
        clientId,
        clientSecret,
        refreshToken,
        accessToken: accessToken.token,
      },
    });

    const mailOptions = {
      from: "Shop Here 📫",
      ...mailContent,
      text: mailContent.text.toString(),
    };

    return await transporter.sendMail(mailOptions);
  } catch (e) {
    console.log(e);
  }
}

//-----------------------------------------------> save image on google drive
async function uploadImage(file, mimeType) {
  try {
    const response = await drive.files.create({
      requestBody: {
        name: "shop here", // name to which you want to save on drive
        mimeType, // type of image i.e. image/png
      },
      media: {
        mimeType,
        body: file, // file
      },
    });

    await drive.permissions.create({
      fileId: response.data.id,
      requestBody: {
        role: "reader",
        type: "anyone",
      },
    });

    return response.data.id;
  } catch (e) {
    console.log(e.message);
  }
}

// console.log(await uploadImage());

async function deleteImage(fileId) {
  try {
    const response = await drive.files.delete({
      fileId,
    });

    return response.status;
  } catch (e) {
    console.log(e);
  }
}

export { uploadImage, deleteImage, sendMail };