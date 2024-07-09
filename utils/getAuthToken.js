import jwt from 'jsonwebtoken';

const getAuthToken = (_id, email) => {
  return jwt.sign({ _id, email }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
};

export default getAuthToken;
