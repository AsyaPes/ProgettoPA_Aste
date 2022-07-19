import mid from './user-middleware';
import authJwt from './auth-jwt';

export const authjwt = [
    authJwt.checkHeader,
    authJwt.checkPayloadHeader,
    authJwt.checkToken,
    authJwt.verifyKey,
    authJwt.logErrors,
    authJwt.errorHandler
];

export const UserExistance = [
    mid.checkUserExistence
];

export const AuctionExistance = [
    mid.checkAuctionExistence
];

export const Existance = [
    mid.checkUserExistence,
    mid.checkAuctionExistence
];



export const check = [
    mid.checkAuctionOpen,
    mid.checkEnglishAuction,
    mid.checkToken
];

export const partecipant = [
    mid.checkBipPartecipant
];

export const creator = [
    mid.checkCreatorExistence,
    mid.checkBipCreator2
];

export const admin = [
    mid.checkAdmin
];
