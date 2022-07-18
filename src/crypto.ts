import * as bcrypt from 'bcrypt';
const SALT_OR_ROUNDS = 10;

export class BetProvider {
    async hashBet(betcript: string): Promise<string> {
      return bcrypt.hashSync(betcript, SALT_OR_ROUNDS);
    }
  
    async compareBet(betcript: string, hash: string): Promise<boolean> {
      return bcrypt.compareSync(betcript, hash);
    }
  }
//var salt = bcrypt.genSaltSync(10);
//var hash = bcrypt.hashSync(req.body.password, salt);