import * as express from 'express';
import * as ServiceU from './services/user-services'

const app = express();

app.use(express.json());

app.get('/showALLUser', function(req: any, res: any) {    
    ServiceU.showALLUser( req, res);
});

app.listen(8080);