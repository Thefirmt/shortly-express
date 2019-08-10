const parseCookies = (req, res, next) => {
  if (req.headers.cookie){
    var cookieString = req.headers.cookie;
    var allCookies = cookieString.split(' ');
    var cookiesValues = [];
    var cookieKeys = [];
    var cookieObj = {};
    for (var i = 0; i < allCookies.length; i++) {
      if(i === allCookies.length -1) {
        cookiesValues.push(allCookies[i].slice(allCookies[i].length-40));
        cookieKeys.push(allCookies[i].slice(0, allCookies[i].length-41));
        cookieObj[allCookies[i].slice(0, allCookies[i].length-41)] = allCookies[i].slice(allCookies[i].length-40);
      } else {
        cookiesValues.push(allCookies[i].slice(allCookies[i].length-41, allCookies[i].length-1));
        cookieKeys.push(allCookies[i].slice(0, allCookies[i].length-42));
        cookieObj[allCookies[i].slice(0, allCookies[i].length-42)] = allCookies[i].slice(allCookies[i].length-41, allCookies[i].length-1);
      }
    }
    req.cookies = cookieObj;
    next();
  }

};

module.exports = parseCookies;