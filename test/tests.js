
var assert = require('assert');

const wp = require('../theme.js');





describe('Theme Infos response  ' , function() {

    it('should return themes infos from europeanleathergallery.com', function(done) {
        
        this.timeout(15000);

        wp.themeInfos("europeanleathergallery.com")
            .then(infos => {

                assert.deepEqual( infos , { 
                    themeSlug: 'opus',
                    themeName: 'Opus - Wordpress Theme',
                    themeAuthor: 'gljivec',
                    themeURI: 'http://themeforest.net/',
                    authorURI: 'http://premiumcoding.com/' 
                });

            })
            .then(done, done)
            .catch( e => console.log(e) );

                   
    });

});






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






describe('Jetpack testing ' , function() {


    it('should find jetpack on wwww.antoinebrossault.com ', function(done) {

        this.timeout(15000);

        wp.doesPluginExist('www.antoinebrossault.com','jetpack','CODE-OF-CONDUCT.md')
        .then( res  => {

            assert.equal(res, true);

            done();

        })
        .catch( e => console.log(e) );


    });


    it('should NOT find jetpack on monbraceletnato.fr ', function(done) {

        this.timeout(15000);

        wp.doesPluginExist('monbraceletnato.fr','jetpack','CODE-OF-CONDUCT.md')
        .then( res  => {

            assert.equal(res, false);

            done();

        })
        .catch( e => console.log(e) );


    });

});