import dotenv from 'dotenv';
dotenv.config();

export default {
    port: process.env.PORT || 3000,
    db: {
        username: "postgres",
        password: "1234",
        database: "hometusk60",
        host: "localhost",
        dialect: 'postgres',
    },
    jwtSecret: process.env.JWT_SECRET,
    otpSecret: process.env.OTP_SECRET,
};
