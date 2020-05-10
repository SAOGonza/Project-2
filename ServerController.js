const chpConnection = require ('.../database/CHPConnection');

class ServerController{
    constructor(){
	console.log('Sever Controller Initialized!');
    }

    async servers(ctx){
	console.log('Controller HITT: ServerController::servers');
	return new Promise((resolve, reject) =>{
	    const query = 'Select * From L6_Server';

	    chpConnection.query(query, (err, res) => {
		if(err) {
		    reject ('Error calling L6: ${err}');
		}
		ctx.body = res;
		ctx.status = 200;

		resolve();
	    });
	}};
	    .catch(err => {
		ctx.status = 500;
		ctx.body = err;
	    });
    }

    async soloServer(ctx){
    console.log('Controller HIT: ServerController::soloServer');
    return new Promise((resolve, reject) => {
	const query = 'Select * From L6_ServerController WHERE hostName = ?;';

	chpConnection.query({
	    sql: query,
	    values: [ctx.params.soloServer]}, (err, res) => {
			    if(err){
				reject(err);
			    }
			    ctx.body = res;
			    ctx.status = 200;
			    resolve();
	    });
    });
    }
			    
async addServerController(ctx, next){
    console.log('Controller HTT: ServerController::addServer');
    return new Promise((resolve, reject) => {
	const newServer = ctx.request.body;
	chpConnection.quert({
	    sql: 'Insert Into L6_Server (hostName, L6_DataCenter, installedOn, powerOnAt) VALUES (?, ?, ?, ?);',
	    values: [newServer.hostName, newServer.L6_DataCenter, newServer.installedOn, newServer.powerOnAt]}, (err, res) => {
		if(err){
		    reject(err);
		}
		resolve();
	    });
    });
	.then(await next)
	.catch(err => {
	    ctx.status = 500;
	    ctx.body = {
		error: 'Internal Server Error:  ${err}',
		status: 500
	    };
	});
}
    async updateServerController(ctx, next){
    console.log('Controller HIT: ServerController::updateServerController');
    return new Promise((resolve, reject) => {
	const dc = ctx.request.body;
	chpConnection.query({
	    sql: '
                  UPDATE L6_ServerController
                  SET
                      hostName = ?,
                      L6_DataCenter = ?,
                      installedOn = ?,
                      powerOnAt = ?
                  WHERE id = ?
                  ',
	    values: [server.hostName, server.L6_DataCenter, server.installedOn, server.powerOnAt, ctx.paramas.soloServer]},
            (err, res) => {
		if(err){
		    reject(err);
		}
		resolve();
	    });
    })
	.then(await next)
	.catch(err => {
	    ctx.status = 500;
	    ctx.body = {
		error: 'Internal Server Erro: ${err}',
		status:500
	    };
	});
    }
    async deleteServerController(ctx, next){
    console.log('Controller HIT: ServerController::deleteServerController');
    return new Promise((resolve, reject) => {
	chpConnection.query({
	    sql: 'DELETE FROM L6_ServerController WHERE hostName = ?;',
	    values: [ctx.params.soloServer]}, (err, res) => {
		if(err){
		    reject(err);
		}
		resolve();
	    });
    })
	.then(await next)
	.catch(err => {
	    ctx.status = 500;
	    ctx.body = {
		error: 'Internal Server Error: ${error}',
		status: 500
	    };
	});
    }
}



module.exports = ServerController;
