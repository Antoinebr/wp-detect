
const request = require('request');

const wp  = require('./detect-wp.js');

const a = require('await-to-js');


/**
 * Get theme slug by analysing URLS assets
 * @param {string} url 
 * @return {promise}
 */
const getThemeSlug = function(url){

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
const getInfos = function (url,theme){
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
  


/**
 * Return themes infos from a given URL
 * @param {*} url 
 * @param {*} callback 
 * @return {callback}
 */
const themeInfos = async function (url, callback){

    let slug = null;
    let infos = {};

    [ err, slug ] = await a.to( getThemeSlug(url) );

    if( !slug ) infos.error = true;


    [ err, infos ] = await a.to( getInfos(url,slug) );

    if( !infos ) infos.error = true;


    return callback(infos);
}


/**
 * 
 * List the front-end plugins by counting 
 * the number of unique plugins which include scripts or css file
 * @param {string} url 
 * @return {array} return an array in a promise
 */
const listFrontPlugins = function(url){
    return new Promise( (resolve, reject) => {  
      
        request( `http://${url}`, (error, response, body)  => {


            if( typeof response === "undefined" ||  error ) return reject(error);

            if( response.statusCode === 200 && body ){
                
                plugins = wp.getPlugins(body);

                return resolve(plugins);
            }

        } );
      
    })  
}



module.exports =  {
    getThemeSlug,
    getInfos,
    themeInfos,
    listFrontPlugins
}

