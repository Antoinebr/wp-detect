const themeInfos = require('./theme.js');


let urls = [

    "europeanleathergallery.com","landhausdielenonline.de"

];



urls.forEach( url => {

    themeInfos(url, (infos) =>{
        console.log(infos);
    });

});
  


