export const isValidJwtToken = (jwt: string) => {
  if (!jwt) return false;

  const parts = jwt?.split(' ');
  if (parts?.length !== 2) return false;

  return !!parts?.[1];
};

const OTP_HARD_CODE = '123123';

export const isValidOTP = (otp: string) => {
  if (!otp) return false;
  return otp === OTP_HARD_CODE;
};

export default isValidJwtToken;
