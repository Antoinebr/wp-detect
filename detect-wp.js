var _ = require('lodash');


module.exports = class detectWP {
      
    
    static getTheme(body) {

        let theme = /\/themes\/[a-z-0-9]+\//.exec(body);

        if ( theme !== null && theme[0] )  return  theme[0].replace('/themes/','').replace('/','');

        return null; 

    }


    static getThemeInfo(body,param){

        let regex = new RegExp(param+ ":(.*?)+", "g");

        let themeName = regex.exec(body);

        if ( themeName !== null && themeName[0] ){

            // If the declaration is misformed e.g : everything on one line
            if ( themeName[0].length > 800 ) return false; 

            return  _.trim( themeName[0].replace(`${param}:`,'') );
            
        } 

        return null;

    }


}


  
