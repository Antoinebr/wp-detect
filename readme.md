# WP detect 

A node JS WordPress detection. 


## How to use 

```JavaScript 

const themeInfos = require('./theme.js');

const url = "https://wooCommerce.com";

themeInfos(url, (infos) => console.log(infos) );


``` 


## Return 

The function will return an object : 

```JavaScript 

{ 
  themeName: 'Opus - Wordpress Theme',
  themeAuthor: 'gljivec',
  themeURI: 'http://themeforest.net/',
  authorURI: 'http://premiumcoding.com/' 
}

```