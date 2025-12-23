import express, { Request, Response } from 'express'
import { NotFoundError } from '@motway_ticketing/common';
import { body } from 'express-validator';
import { Ticket } from '../models/tickets';


const router = express.Router();

router.get('/api/tickets/:id', async (req: Request, res: Response) => {
  console.log('r!!!!!!!!!!!!eq.params.id');
  console.log(req.params.id);
  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    throw new NotFoundError();
  }

  res.send(ticket);
});

export { router as showTicketRouter }