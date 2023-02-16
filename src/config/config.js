import dotenv from 'dotenv';
dotenv.config();

export default {
    mongo : {
        URL : process.env.MONGO_URL
    },
    jwt : {
        COOKIE : process.env.JWT_COOKIE,
        SECRET : process.env.JWT_SECRET
    },
    nodemailer : {
        USER : process.env.USER,
        PASS : process.env.PASS
    }
}