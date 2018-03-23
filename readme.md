# WP detect 

A node JS WordPress detection. 


## How to use 

```bash

npm install 

```

```JavaScript 

const wp = require('./theme.js');


  wp.themeInfos(url, (infos) => {

      if( infos.error ) console.log( infos.error );

      console.log(infos); 
      
  });


  wp.listFrontPlugins(url)
      .then( u => console.log(u) )
      .catch ( e => console.log('Error => ', e) );

``` 

