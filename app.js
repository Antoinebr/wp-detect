const wp = require('./theme.js');

const pluginsInfos = require('./plugins.js');

let urls = [

    "europeanleathergallery.com","landhausdielenonline.de"

];

   

urls.forEach( url => {

    console.log(`----- ${url} ----- `);

    wp.themeInfos(url, (infos) => {

        if( infos.error ) console.log( infos.error );

        console.log(infos); 
        
    });


    wp.listFrontPlugins(url)
        .then( u => console.log(u) )
        .catch ( e => console.log('Error => ', e) );

        
});
  
