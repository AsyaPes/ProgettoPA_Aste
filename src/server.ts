import * as express from 'express';

import StatusCodes from 'http-status-codes';
//import 'express-async-errors';
import { CustomError } from './shared/errors';
import { NextFunction, Request, Response } from 'express';
import logger from 'jet-logger';

import apiRouterUser from './routes/apiUser';
import apiRouterAuction from './routes/apiAuction';
import apiRouterEnter from './routes/apiEnter';

const app = express();

app.use(express.json());
app.use((err: Error | CustomError, _: Request, res: Response, __: NextFunction) => {
    logger.err(err, true);
    const status = (err instanceof CustomError ? err.HttpStatus : StatusCodes.BAD_REQUEST);
    return res.status(status).json({
        error: err.message,
    });
});

app.use('/api-user', apiRouterUser);
app.use('/api-auction', apiRouterAuction);
app.use('/api-enter',apiRouterEnter);

//server.listen(8080 ,()=> console.log("Listening on port 8080"))

app.listen(8080);
//export default app;
