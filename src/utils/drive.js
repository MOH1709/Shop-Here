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

export default drive;