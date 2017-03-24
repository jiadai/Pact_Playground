/**
 * Created by jdai on 17/03/2017.
 */
const verifier=require('pact').Verifier;
const path=require('path');

const app=require('../../providerStateServer');

app.listen(8081, ()=>{
    console.log('State Server listening on 8081.');
});

describe('Pact Verifier', ()=>{
    it('should validate the expectations of Car Rental.', function () {
        this.timeout(10000);

        let opts={
            providerBaseUrl: 'http://localhost:8080',
            providerStatesUrl: 'http://localhost:8081/states',
            providerStatesSetupUrl: 'http://localhost:8081/setup',
            pactUrls: [path.resolve(process.cwd(), './data/carrental_website-carrental_service.json')]
        };

        return verifier.verifyProvider(opts)
            .then(output=>{
                console.log('Pact verification completed.');
                console.log(output);
            });
    });
});
