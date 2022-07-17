import * as express from 'express';
import * as ServiceU from './services/user-services'

const app = express();

app.use(express.json());
//USER
app.get('/showALLUser', function(req: any, res: any) {    
    ServiceU.showALLUser( req, res);
});

app.get('/showONEUser', function(req: any, res: any) {    
    ServiceU.showONEUser( req.body.user_id, res);
})

app.listen(8080);
//export default app;
