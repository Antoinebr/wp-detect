
var assert = require('assert');

const wp = require('../theme.js');



describe('listFrontPlugins() : count number of plugins ' , function() {


    it('should return "woocommerce" ', function(done) {
        
  
        wp.listFrontPlugins('monbraceletnato.fr')
         .then(res => {

            assert.equal(res[0], 'woocommerce');

            done();

         })
         .catch( e => console.log(e) );
      
     
    });


    it('should return "seo" ', function(done) {
        
        this.timeout(15000);
  
        wp.listFrontPlugins('www.antoinebrossault.com')
         .then(res => {

            assert.equal(res[0], 'seo');

            done();

         })
         .catch( e => console.log(e) );
      
     
    });

});


