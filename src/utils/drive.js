import { google } from "googleapis";

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

//-----------------------------------------------> return data of saved image on google drive
async function uploadImage(file, mimeType) {
  try {
    const response = await drive.files.create({
      requestBody: {
        name: "cards", // name to which you want to save on drive
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

export { uploadImage, deleteImage };