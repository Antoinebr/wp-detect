
const request = require('request');

const wp  = require('./detect-wp.js');

const a = require('await-to-js');


/**
 * Get theme slug by analysing URLS assets
 * @param {string} url 
 * @return {promise}
 */
const getThemeSlug = (url) => {

    return new Promise( (resolve, reject) => {  
      
        request( `http://${url}`, (error, response, body)  => {


            if( typeof response === "undefined" ||  error ) return reject(error);

            if( response.statusCode === 200 && body ){
                
                let theme = wp.getTheme(body);
                
                if ( theme ) return resolve(theme);

            }

            return reject(`Error with status code of : ${response.statusCode}`);
            
        });
    
    });

}
  


/**
 *  Get theme info by analysing style.css
 * @param {string} url domain of the site 
 * @param {string} theme theme slug to complete url
 * @return {promise} return an object in a promise with the theme's infos 
 */
const getInfos =  (url,theme) => {
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

            return reject(`Error with status code of : ${response.statusCode}`);

        } );
      
    })  
}
  


/**
 * Return themes infos from a given URL
 * @param {*} url 
 * @return {promise}
 */
const themeInfos = (url) => {


    return new Promise( (resolve, reject) => {  
         
        getThemeSlug(url)
            .then(slug => getInfos(url,slug))
            .then(infos => resolve(infos))
            .catch( error => reject(error));

    });
        
}


/**
 * 
 * List the front-end plugins by counting 
 * the number of unique plugins which include scripts or css file
 * @param {string} url 
 * @return {array} return an array in a promise
 */
const listFrontPlugins = (url) => {
    return new Promise( (resolve, reject) => {  
      
        request( `http://${url}`, (error, response, body)  => {


            if( typeof response === "undefined" ||  error ) return reject(error);

            if( response.statusCode === 200 && body ){
                
                plugins = wp.getPlugins(body);

                return resolve(plugins);
            }

            return reject(`Error with status code of : ${response.statusCode}`);

        } );
      
    })  
}




/**
 *  Give informations about if a plugin exists or not on a given WordPress domain
 * 
 * @param {string} domain 
 * @param {string} pluginSlug 
 * @param {strong} fileToFind a file like a readme.md to 
 */
const doesPluginExist = (domain, pluginSlug , fileToFind) =>{

    return new Promise( (resolve, reject) => {  
         
        request( `http://${domain}/wp-content/plugins/${pluginSlug}/${fileToFind}`, (error, response, body)  => {


            if( typeof response === "undefined" ||  error ) return reject(error);

            if( response.statusCode === 200 && body ) return resolve(true);

            if( response.statusCode === 404 ) return resolve(false);

        } );
      
    })  

}


module.exports =  {
    getThemeSlug,
    getInfos,
    themeInfos,
    listFrontPlugins,
    doesPluginExist
}

