/**
 * Created by jdai on 17/03/2017.
 */
describe('consumer test helper', ()=>{
    before(()=>{
        console.log('this runs before all test');
    });

    it('test test', ()=>{
        console.log('test=test');
    });

    after(()=>{
        console.log('this runs after all test');
    });

});