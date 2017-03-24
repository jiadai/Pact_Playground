/**
 * Created by jdai on 16/03/2017.
 */
const pact=require('pact');
const chai=require('chai');
const chaiAsPromised=require('chai-as-promised');
const request=require('superagent');

const expect=chai.expect;

chai.use(chaiAsPromised);
const MOCK_SERVER='http://localhost:1234';

describe('Pact', ()=>{
    const provider=pact({
        consumer:'CarRental Website',
        provider:'CarRental Service',
        dir:'data',
        spec:2
    });

    const like = pact.Matchers.somethingLike;
    const term          = pact.Matchers.term;
    const eachLike      = pact.Matchers.eachLike;

    const carItem={
        id: 1,
        brand: 'Jeep',
        model: 'Camry'
    };

    before(()=>{
        return provider.setup()
            .then(()=>{
                provider.addInteraction({
                    state:'Has some cars for rental',
                    uponReceiving: 'A list of cars',
                    withRequest: {
                        method: 'GET',
                        path: '/cars/available'
                    },
                    willRespondWith:{
                        status:200,
                        headers:{
                            'Content-Type':'application/json; charset=utf-8'
                        },
                        body: eachLike(carItem, {min:2})
                    }
                });
            })
            .then(()=>{
                provider.addInteraction({
                    state:'Has a car for ID 1',
                    uponReceiving: 'A car',
                    withRequest:{
                        method: 'GET',
                        path: '/car/1'
                    },
                    willRespondWith:{
                        status:200,
                        headers:{
                            'Content-Type':'application/json; charset=utf-8'
                        },
                        body: carItem
                    }
                });
            });
    });

    after(()=>{
        return provider.finalize();
    });


    describe('when a call made to retrieve all available cars could be rental', ()=>{
        it('should get a list of cars', done =>{
            expect(request
                .get(MOCK_SERVER+'/cars/available')
                .then(res=>{console.log(res.body);return res.body}, ()=>[]))
                // .eventually.has.deep.property('id').notify(done);
                .eventually.with.length.above(3).notify(done);

        });
    });

    describe('when a call made to retrieve a car with ID as 1', ()=>{
        it('should get a car', done=>{
            // let promise=request.get(MOCK_SERVER+'/car/1').then(res=>{console.log(res.body);return res.body}, ()=>{});
            // Promise.all(
            // [expect(promise).eventually.has.deep.property('id',1),
            // expect(promise).eventually.has.deep.property('brand','Toyota')]
            // ).then(()=>{done()}, ()=>{done()});

            // expect(request.get(MOCK_SERVER+'/car/1').then(res=>{console.log(res.body);return res.body}, ()=>{}))
            //     .eventually.has.deep.property('brand','Jeep').notify(done);

            request.get(MOCK_SERVER+'/car/1')
                .then(res=>res.body)
                .then(body=>{
                    expect(body).has.deep.property('id',1);
                    expect(body).has.deep.property('brand','Jeep');
                    done();
                })
                .catch(err=>{
                    return done(err);
                });
        });
    });

    describe('when interacting with car rental Service', () => {
        it('should validate the interactions and create a contract', () => {
            return provider.verify();
        });
    });


});