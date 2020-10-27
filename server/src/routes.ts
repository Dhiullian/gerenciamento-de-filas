import express from 'express';

import TicketController from './controllers/ticketControllers';


const routes = express.Router();
const ticketControllers = new TicketController();

//Pegar o ticket
routes.post('/getTicket',ticketControllers.getTicket);
//chamar o ticket
routes.get('/callTicket', ticketControllers.callTicket);
//ultimo ticket chamado
routes.get('/lastCallTicket', ticketControllers.lastCallTicket);

export default routes;