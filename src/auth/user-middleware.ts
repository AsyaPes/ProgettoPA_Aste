import * as ServiceU from '../services/user-services'
import * as ServiceA from '../services/auction-service'
import { resolveTripleslashReference } from 'typescript';

function checkUserExistence(req: any, res: any, next: any) {
    ServiceU.checkUser(req.body.user_id, res).then((check) => {
    (check ) ? next() : res.status(500).json({"error": "User not found"});
    });
};

function checkCreatorExistence(req: any, res: any, next: any) {
    ServiceU.checkCrator(req.body.fkcreator_id, res).then((check) => {
    (check ) ? next() : res.status(500).json({"error": "User not found"});
    });
};

function checkAuctionExistence(req: any, res: any, next: any) {
    (ServiceA.checkAuctionExistance(req.body.auction_id, res)).then((check) => {
    (check) ? next() : res.status(500).json({"error": "Auction not found"});
    });
};

function checkToken(req: any, res: any, next: any) : void {
    ServiceU.checkToken(req.body.user_id, req.body.bet, res).then((check) => {
    (check) ? next() : res.status(500).json({"error": "Tokens not enough"});
    });
};

function checkAdmin(req: any, res: any, next: any) : void {
    ServiceU.checkRole(req.body.user_id, res).then((role) => {
    (role == 2) ? next() : res.status(500).json({"error": "User not admin"});
    });
};

function checkBipCreator(req: any, res: any, next: any) : void {
    ServiceU.checkRole(req.body.user_id, res).then((role) => {
    (role == 1) ? next() : res.status(500).json({"error": "User not bip creator"});
    });
};

function checkBipCreator2(req: any, res: any, next: any) : void {
    ServiceU.checkRole2(req.body.fkcreator_id, res).then((role) => {
    (role == 1) ? next() : res.status(500).json({"error": "User not bip creator"});
    });
};

function checkBipPartecipant(req: any, res: any, next: any) : void {
    ServiceU.checkRole(req.body.user_id, res).then((role) => {
    (role == 0) ? next() : res.status(500).json({"error": "User not bip partecipant"});
    });
};

function checkEnglishAuction(req: any, res: any, next: any) : void {
    ServiceA.checkAuctionType(req.body.auction_id, res).then((type) => {
    (type == 1) ? next() : res.status(500).json({"error": "This is not an English Auction"});
    });
};

function checkBidAuction(req: any, res: any, next: any) : void {
    ServiceA.checkAuctionType(req.body.auction_id, res).then((type) => {
    (type == 2) ? next() : res.status(500).json({"error": "This is not a First Price Sealed Bid Auction"});
    });
};

function checkBidAuction2(req: any, res: any, next: any) : void {
    ServiceA.checkAuctionType(req.body.auction_id, res).then((type) => {
    (type == 3) ? next() : res.status(500).json({"error": "This is not a Second Price Sealed Bid Auction"});
    });
};

function checkAuctionFinish(req: any, res: any, next: any) : void {
    ServiceA.checkAuctionStatus(req.body.auction_id, res).then((status) => {
    (status == 1) ? next() : res.status(500).json({"error": "This is not a close auction"});
    });
};

function checkAuctionOpen(req: any, res: any, next: any) : void {
    ServiceA.checkAuctionStatus(req.body.auction_id, res).then((status) => {
    (status == 2) ? next() : res.status(500).json({"error": "This is not an open Auction"});
    });
};

function checkAuctionFuture(req: any, res: any, next: any) : void {
    ServiceA.checkAuctionStatus(req.body.auction_id, res).then((status) => {
    (status == 0) ? next() : res.status(500).json({"error": "This is not a future Auction"});
    });
};

export default {
    checkUserExistence,
    checkCreatorExistence,
    checkAuctionExistence,
    checkToken,
    checkAdmin,
    checkBipCreator,
    checkBipCreator2,
    checkBipPartecipant,
    checkEnglishAuction,
    checkBidAuction,
    checkBidAuction2,
    checkAuctionFinish,
    checkAuctionOpen,
    checkAuctionFuture
};