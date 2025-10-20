// import jwt from "jsonwebtoken";

// const auth = async (request, response, next) => {
//   try {
//     const token =
//       request.cookies.accessToken ||
//       request?.headers?.authorization?.split(" ")[1];

//     if (!token) {
//       return response.status(401).json({
//         message: "Provide token",
//       });
//     }

//     const decode = await jwt.verify(token, process.env.SECRET_KEY_ACCESS_TOKEN);

//     if (!decode) {
//       return response.status(401).json({
//         message: "unauthorized access",
//         error: true,
//         success: false,
//       });
//     }

//     request.userId = decode.id;

//     next();
//   } catch (error) {
//     return response.status(500).json({
//       message: "You have not login", ///error.message || error,
//       error: true,
//       success: false,
//     });
//   }
// };

// export default auth;


import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  try {
    const token =
      req.cookies.accessToken || req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "Provide token",
        error: true,
      });
    }

    let userId = null;

    // Try verifying your own JWT first
    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY_ACCESS_TOKEN);
      userId = decoded.id;
    } catch (err) {
      // If JWT fails, try Clerk
      try {
        const clerkUser = await clerkClient.users.getUser(token);
        userId = clerkUser.id;
      } catch (clerkError) {
        return res.status(401).json({
          message: "Invalid or expired token",
          error: true,
        });
      }
    }

    req.userId = userId;
    next();
  } catch (error) {
    return res.status(500).json({
      message: "Authentication failed",
      error: true,
    });
  }
};

export default auth;
