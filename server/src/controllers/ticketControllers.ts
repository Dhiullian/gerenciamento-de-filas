import { Request, Response } from 'express';
import knex from '../database/connection';

class ticketController {
    async getTicket(request: Request, response: Response) {

        const {type} = request.body;
        try{
            const getTicket =  await knex('ticket').insert({type: type});
            return response.json({status: 200, senha:type + getTicket});
        }
        catch(Error){
            return response.json({status: 500, message: Error });
        }

    }
    
    async callTicket(request: Request, response: Response){

        const { attendant } = request.query;
        try{
            const IdClient = await knex('ticket')
                .where('called',null).limit(1);
                
            const id = IdClient[0].id;
            const type = IdClient[0].type;
            const callTicket = await knex('ticket').where('id',Number(IdClient[0].id))
                .update({called : 1, caledTime: knex.fn.now(), attendant: attendant});
                
            return response.json({status: 200, calledticket: type + id, attendant: attendant });
        }catch(Error){
            return response.json({status: 412, message: "Não há clientes na fila." });
        }

    }

    async lastCallTicket(request: Request, response: Response){

        try{
            const lastTicket = await knex('ticket')
            .whereNot('called',null)
            .orderBy('id','desc')
            .limit(1);
        return response.json({status: 200, lastTicket});   

        }catch(Error){
            return response.json({status: 500, message: Error });
        }
    }
}

export default ticketController;