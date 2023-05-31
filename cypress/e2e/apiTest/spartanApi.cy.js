
describe('Spartan API tests', {baseUrl:'http://35.173.247.169:8000/'},()=>{
it('Get a single spartan',()=>{
cy.request('GET','api/spartans/5').then((response)=>{
   expect(response.status).to.equal(200);
   expect(response.body.name).to.equal("Blythe");
})
})
it('Post spartan',()=>{
cy.request({
    method:'POST',
    url:'api/spartans',
    body:{
    "gender": "Female",
    "name": "Olly",
    "phone": 4567382639
}
}
).then((response)=>{
    expect(response.status).to.equal(201);
    expect(response.body.success).to.equal('A Spartan is Born!');
    expect(response.body.data.name).to.equal('Olly');
})
  })
})
