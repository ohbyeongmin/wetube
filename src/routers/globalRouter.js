import express from "express";
import routes from "../routes";
import passport from "passport";
import { home, search } from "../controllers/videoControllers";
import {
  postJoin,
  getJoin,
  postLogin,
  getLogin,
  logout,
  githubLogin,
  postGithubLogIn,
  getMe,
  kakaoLogin,
  postKakaoLogIn,
} from "../controllers/userController";
import { onlyPublic, onlyPrivate } from "../middlewares";

const globalRouter = express.Router();

globalRouter.get(routes.join, onlyPublic, getJoin);
globalRouter.post(routes.join, onlyPublic, postJoin, postLogin);

globalRouter.get(routes.login, onlyPublic, getLogin);
globalRouter.post(routes.login, onlyPublic, postLogin);

globalRouter.get(routes.home, home);
globalRouter.get(routes.search, search);
globalRouter.get(routes.logout, onlyPrivate, logout);

globalRouter.get(routes.gitHub, githubLogin);
globalRouter.get(
  routes.githubCallback,
  passport.authenticate("github", { failureRedirect: "/login" }),
  postGithubLogIn
);

globalRouter.get(routes.kakao, kakaoLogin);
globalRouter.get(
  routes.kakaoCallback,
  passport.authenticate("kakao", { failureRedirect: "/login" }),
  postKakaoLogIn
);

globalRouter.get(routes.me, getMe);

export default globalRouter;
