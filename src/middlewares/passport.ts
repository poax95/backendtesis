import User from "../models/user";
import { Strategy, ExtractJwt, StrategyOptions } from "passport-jwt";
import config from "../config/config";
import { ObjectId } from "bson";

//le dara acceso a ciertas rutas dependiendo del token
const opts: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jwtSecret
};

export default new Strategy(opts, async (payload, done) => {
  try {
    const user = await User.findById(payload.id);
    
    if (user) {
      console.log(user)
      return done(null, user);
    }
    return done(null, false);
  } catch (error) {
    console.log(error);
  }
});