import { Auction } from "../models/auction-model";

interface  Execute {
    getObj(): { status : number,  msg : string };
}

class CreatedAuction implements Execute {
    getObj(): { status : number,  msg : string } {
        return {
            status: 200,
            msg: "Great! Auction created."
        }
    }
}

class chargingAdmin implements Execute {
    getObj(): { status : number,  msg : string } {
        return {
            status: 200,
            msg: "Great! Recharge made."
        }
    }
}

export enum SuccessEnum {
    CreatedAuction,
    chargingAdmin
}


export function getObj(type: SuccessEnum): Execute{
    let retval: Execute = null;
    switch (type){
        case SuccessEnum.CreatedAuction:
            retval = new CreatedAuction();
            break;
        case SuccessEnum.chargingAdmin:
            retval = new chargingAdmin();
            break;
    }
    return retval;
}