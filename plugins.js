
var request = require('request');

const wp  = require('./detect-wp.js');



/**
 * Get theme slug by analysing URLS assets
 * @param {string} url 
 * @return {promise}
 */
module.exports = function getPlugins(url){

    return new Promise( (resolve, reject) => {  
      
        request( `http://${url}`, (error, response, body)  => {


            if( typeof response === "undefined" ||  error ) return reject(error);

            if( response.statusCode === 200 && body ){
                
                let plugins = wp.getPlugins(body);
                
                if ( plugins ) return resolve(plugins);

            }
            

        });
    
    });

}

