const wp = require('./theme.js');

const pluginsInfos = require('./plugins.js');


const urls = [

    "europeanleathergallery.com","landhausdielenonline.de"

];



urls.forEach( url => {


    wp.themeInfos(url)
        .then( infos => console.log(infos))
        .catch( error => console.log(infos))


    wp.listFrontPlugins(url)
        .then( u => console.log(u) )
        .catch ( e => console.log('Error => ', e) );


    wp.doesPluginExist(url,'jetpack','CODE-OF-CONDUCT.md')
        .then( res  => console.log(`${url} Jetpack testing : ${res}`) )
        .catch( e => console.log(e) );

        
});
  
