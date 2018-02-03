
var request = require('request');

const wp  = require('./detect-wp.js');


/**
 * Get theme slug by analysing URLS assets
 * @param {string} url 
 * @return {promise}
 */
function getThemeSlug(url){

    return new Promise( (resolve, reject) => {  
      
        request( `http://${url}`, (error, response, body)  => {


            if( typeof response === "undefined" ||  error ) return reject(error);

            if( response.statusCode === 200 && body ){
                
                let theme = wp.getTheme(body);
                
                if ( theme ) return resolve(theme);

            }
            

        });
    
    });

}
  


/**
 *  Get theme info by analysing style.css
 * @param {string} url domain of the site 
 * @param {string} theme theme slug to complete url
 * @return {promise} return an object in a promise with the theme's infos 
 */
function getInfos(url,theme){
    return new Promise( (resolve, reject) => {  
      
        request( `http://${url}/wp-content/themes/${theme}/style.css`, (error, response, body)  => {


            if( typeof response === "undefined" ||  error ) return reject(error);

            if( response.statusCode === 200 && body ){
                
                let themeInfo = {};

                themeInfo.themeSlug  = theme;
                
                themeInfo.themeName = wp.getThemeInfo(body,'Theme Name');

                themeInfo.themeAuthor = wp.getThemeInfo(body,'Author');

                themeInfo.themeURI = wp.getThemeInfo(body,'Theme URI');

                themeInfo.authorURI = wp.getThemeInfo(body,'Author URI');
                
                return resolve(themeInfo);
            }

        } );
      
    })  
}
  
  

module.exports =  async function (url, callback){

    let slug = null;
    let infos = {};

    try{
        slug  = await getThemeSlug(url); 
    } catch(e){
        return callback( error = true ,infos );
    } 

    try{
        infos = await getInfos(url,slug);
    } catch(e){
        return callback( error = true  ,infos );
    }

    return callback( error = false ,infos );

}



