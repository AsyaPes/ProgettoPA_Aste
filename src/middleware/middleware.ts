import * as UserM from './user-middleware'

export const show_user = [
    UserM.checkUserExistence
];

export const show_wallet = [
    UserM.checkUserExistence,
];

export const role = [
    UserM.checkUserExistence,
];

export const win = [
    UserM.checkUserExistence,
];