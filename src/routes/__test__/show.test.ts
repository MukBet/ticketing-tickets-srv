import request from "supertest";
import { app } from '../../app';
import { Ticket } from "../../models/tickets";

it('It returns 404 if the ticket is not found', async () => {
  const response = await request(app)
    .get('/api/tickets/fake')
    .send();
  console.log('response.body')
  console.log(response.body)
});

it('It returns the ticket if the ticket is found', async () => {
  const title = 'title';
  const price = 11;

  const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({
      title,
      price
    })
    .expect(201);
  console.log("!!!!!!!!!response.body.id");
  console.log(response.body.id);
  const ticketResponse = await request(app)
    .get(`/api/tickets/${response.body.id}`)
    .send()
    .expect(200);

  expect(ticketResponse.body.title).toEqual(title);
  expect(ticketResponse.body.price).toEqual(price);
});