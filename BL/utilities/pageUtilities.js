const jwt = require('../middleware/jwt');

const domainName = process.env.DOMAIN;
const port = process.env.PORT;

const mainPages = [
    { title: "Home",        href: `${domainName}:${port}/home`, active: false },
    { title: "API Helper",  href: `${domainName}:${port}/apiHelper`, active: false },
    { title: "Login",       href: `${domainName}:${port}/login`, active: false },
    { title: "Sign In",     href: `${domainName}:${port}/signin`, active: false },
    { title: "Portfolio",   href: "https://francescoct.github.io/portfolio/", active: false }
];

const apiPages = [ 
    { title: "Customers", href: `${domainName}:${port}/customerApi` },
    { title: "Orders",    href: `${domainName}:${port}/orderApi` },
    { title: "Products",  href: `${domainName}:${port}/productApi` },
];

const sampleImages = [
    "https://www.mixd.co.uk/wp-content/uploads/2023/10/leeds-town-hall.jpg",
    "https://www.mixd.co.uk/wp-content/uploads/2023/10/leeds-streets.jpg",
    "https://www.mixd.co.uk/wp-content/uploads/2023/10/leeds-skyscraper.jpg",
    "https://www.mixd.co.uk/wp-content/uploads/2023/10/leeds-dock.jpg"
];

const currentYear = new Date().getFullYear();
function getUsername(token){
    if(token != null){
        let payload = jwt.getPayload(token);
        return payload.username;
    }
    else{ return ''; }
}

module.exports = {domainName, port, mainPages, apiPages, sampleImages, currentYear, getUsername}