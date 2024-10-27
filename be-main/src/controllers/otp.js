const otpGenerator = require("otp-generator");

let cachedOTP = null;

const generateOTP = () => {
  // Check if an OTP has already been generated and cached
  if (cachedOTP) {
    return cachedOTP;
  }

  // Generate a new OTP
  const OTP = otpGenerator.generate(6, {
    upperCaseAlphabets: true,
    specialChars: false,
  });

  // Cache the generated OTP for future use
  cachedOTP = OTP;

  return OTP;
};

module.exports = { generateOTP };
