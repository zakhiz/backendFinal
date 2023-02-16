import  Jwt  from "jsonwebtoken";
import config from "../config/config.js";
import { userService } from "../services/repositories/services.js";
export const viewAdmin = async (req, res, next) => {
    let token = req.headers['cookie']
    if(!token){
        return res.render('notlogin')
    }
    let tokenized = req.cookies[config.jwt.COOKIE]
    const decoded = Jwt.verify(tokenized,config.jwt.SECRET)
    const isadmin = await userService.getAll({role : decoded.role})
    if(isadmin[0].role === "admin"){
        next()
    }else{
        res.render('accessdenegate')
    }
    
};
