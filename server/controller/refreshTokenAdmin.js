const User = require("../models/admin");
const jwt = require("jsonwebtoken");
const cookieParser= require('cookie-parser')

const handleRefreshToken = async (req, res) => {

    // var incoming_cookies = cookieHeader.parse(req.headers.cookie);
    const reqCookie=req.cookies['refreshTokenVal']
    console.log(req.cookies['refreshTokenVal'])

   //check if cookie exist
  if (!reqCookie) return res.status(401).send('no reqCookie');
  const refreshToken =reqCookie;

  res.clearCookie("refreshTokenVal", { httpOnly: true, sameSite: "None" });

  const foundUser = await User.findOne({refreshToken}).exec();
  if(!foundUser){
    return res.status(404).send('no found admin')
  }

  jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET,async(err,decoded)=>{
    if(err){
      foundUser.refreshToken=['']
       console.log('403 expired')
       return res.status(403).send('expierd')
    }

  const newrefreshTokenn = jwt.sign({ _id: foundUser._id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "60s" });
  const token = jwt.sign(
          { _id: foundUser._id, isLogged: true },
          process.env.logingtoken,
          { expiresIn: "50s" }
        );

                  
        (async ()=>{
          console.log('ya function')
          foundUser.refreshToken=[newrefreshTokenn]
          const result=await foundUser.save()
          console.log('new user',result)
        })()
        
        res.cookie("refreshTokenVal", newrefreshTokenn, {
        httpOnly: true,
        sameSite: "None",
        maxAge: 24 * 60 * 60 * 1000,
          });


          res.status(200).json({
            message: "refreshed suceess",
            token,
            foundUser,
            allowedRole: "admin",
          });

  })


  
           
  // res.status(200).send('refreshed sccess')
  // Detected refresh token reuse!
//   if (!foundUser) {
//     console.log(foundUser)

//     jwt.verify(
//       refreshToken,
//       process.env.REFRESH_TOKEN_SECRET,
//       async (err, decoded) => {
//         if (err) return res.status(403); //Forbidden
//         console.log("attempted refresh token reuse!");
//         const hackedUser = await User.findOne({
//           username: decoded.name,
//         }).exec();
//         hackedUser.refreshToken = [];
//         const result = await hackedUser.save();
//         console.log('result',result);
//       }
//     );
//     return res.status(403); //Forbidden
//   }

//   const newRefreshTokenArray = foundUser.refreshToken.filter(
//     (rt) => rt !== refreshToken
//   );

//   // evaluate jwt
//   jwt.verify(
//     refreshToken,
//     process.env.REFRESH_TOKEN_SECRET,
//     async (err, decoded) => {
//       if (err) {
//         console.log("expired refresh token");
//         foundUser.refreshToken = [...newRefreshTokenArray];
//         const result = await foundUser.save();
//         console.log(result);
//       }
//       if (err || foundUser.username !== decoded.username)
//         return res.status(403);

//       // Refresh token was still valid
//       const roles = Object.values(foundUser.roles);

//       const token = jwt.sign({ _id: foundUser._id }, process.env.logingtoken, {
//         expiresIn: "1h",
//       });

//       const newRefreshToken = jwt.sign(
//         { username: foundUser._id },
//         process.env.REFRESH_TOKEN_SECRET,
//         { expiresIn: "12h" }
//       );

//       foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];
//       // refreshTokens.push(refreshToken);
//       const result = await foundUser.save();
//       console.log(result);
//       // Saving refreshToken with current user
//       foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];

//       // Creates Secure Cookie with refresh token
//       res.cookie("jwt", newRefreshToken, {
//         httpOnly: true,
//         sameSite: "None",
//         maxAge: 24 * 60 * 60 * 1000,
//       });

//       res.json({ roles, accessToken });
//     }
//   );
};

module.exports = { handleRefreshToken };