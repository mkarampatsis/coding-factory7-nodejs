const jwt = require("jsonwebtoken");
const { OAuth2Client } = require('google-auth-library');

function generateAccessToken(user) {
    const payload = {
      username: user.username,
      email: user.email,
      roles: user.roles
    };
    
    const secret = process.env.JWT_SECRET;
    const options = { expiresIn: '1h' };
  
    return jwt.sign(payload, secret, options);
}
 
function verifyAccessToken(token) {
    const secret = process.env.JWT_SECRET;
    console.log("Secret",secret);
  
    try {
      const decoded = jwt.verify(token, secret);
      return { success: true, data: decoded };
    } catch (error) {
      console.log("Problem in Verify Token", error)
      return { success: false, error: error.message };
    }
}

async function googleAuth(code) {
  console.log("Google login")
  const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
  const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
  const REDIRECT_URI = process.env.REDIRECT_URI;

  const oauth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
  
  try {
    // Exchange code for tokens
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    // Fetch user info using the ID token
    const ticket = await oauth2Client.verifyIdToken({
        idToken: tokens.id_token,
        audience: CLIENT_ID,
    });

    // εδω αρχικά να το δούμε χωρίς await να δουν το promise που επιστρέφει στο controller
    const userInfo = await ticket.getPayload();  // User info from Google

    console.log('Google User:', userInfo);

    // res.json({ user: userInfo, tokens });
    const user = {
      username: userInfo.given_name,
      email: userInfo.email,
      roles: ["EDITOR", "READER"]
    }
    const token = this.generateAccessToken(user);
    return token
    // return { user: userInfo, tokens };
  } catch (error) {
      console.error('Error during Google authentication:', error);
      // res.status(500).json({ error: 'Failed to authenticate with Google' });
      return { error: 'Failed to authenticate with Google' };
  }

}
module.exports =  { generateAccessToken, verifyAccessToken, googleAuth };