const {domainName, port, mainPages, apiPages, sampleImages, currentYear, getUsername} = require("../utilities/pageUtilities");


//Main Pages
exports.homePage = (req, res) => {
    const itemsCards = [
        {title: "Login",    href: `${domainName}:${port}/login`, src: sampleImages[0]},
        {title: "Sign in",  href: `${domainName}:${port}/signin`, src: sampleImages[1]}
    ];
    const sampleSections = [
        { title: "Vision", img: "", href: `${domainName}:${port}/home`, lines: "La nostra vision è fornire un servizio api di qualità ad utenti autenticati, sfruttando il meccanismo dei JWT." },
        { title: "Instructions", img: "", href: `${domainName}:${port}/home`, lines: "Istruzioni generali per la valutazione: effettuare il login per prendere il token, le credenziali corrette sono nel file env dell'applicativo. Il token viene impostato in un cookie che verrà applicato per navigare all'interno dell'applicazione e usare le api. Il cookie scade ogni ora. Per qualsiasi chiarimento contattatemi per mail" },
    ]
    //Setting active mainPages
    mainPages.forEach(page => {
        page.title == "Home" ? page.active = true : page.active = false;
    });

    res.render("home",
        { 
            //These parameters are standard and should be used in every page
            motto: "Welcome to my homepage!",
            linksNavbar: mainPages.slice(1), //I take every page but not the home page, required from header and footer
            home: mainPages[0], 
            current: mainPages[0],
            currentYear: currentYear,
            username: getUsername(req.cookies.jwtToken) ?? '',
            //These parameters on the other hand, are some extra and depend on the components you want to add to the page
            itemsCards: itemsCards,
            itemsSections: sampleSections,
            
        }
    );
};

exports.apiHelperPage = (req, res) => {
    //Setting active mainPages
    mainPages.forEach(page => {
        page.title == "API Helper" ? page.active = true : page.active = false;
    });

    res.render("apiHelper",
        //These parameters are standard and should be used in every page
        { 
            motto: "I display a brief description of my apis here",
            linksNavbar: mainPages.slice(1), //I take every page but not the home page, required from header and footer
            home: mainPages[0], 
            current: mainPages[1],
            currentYear: currentYear,
            username: getUsername(req.cookies.jwtToken) ?? '',
            //These parameters on the other hand, are some extra and depend on the components you want to add to the page
            itemsAPIPages: apiPages,
        }
    );
};

//SubPages
exports.customerAPIPage = (req, res) => {
    const customerTitle = apiPages[0].title;
    const apiForms = [
        {
            showGet: true,
            id : "1", 
            title: customerTitle,
            type: "Create",
            method: "POST",
            url: `${domainName}:${port}/api/customers`,
            okMessage: "Customer created.",
            fields: [
                { id: "a", name: "First name", type: "text", placeholder: "John", formValue: "firstName" },
                { id: "b", name: "Lastname", type: "text", placeholder: "Smith", formValue: "lastName" },
                { id: "c", name: "Email", type: "text", placeholder: "test@gmail.com", formValue: "email" },
            ]
        },
        {
            id : "2", 
            title: customerTitle,
            type: "Update",
            method: "PUT",
            url: `${domainName}:${port}/api/customers`,
            okMessage: "Customer updated.",
            fields: [
                { id: "a", name: "Id", type: "text", placeholder: "1", formValue: "id" },
                { id: "b", name: "First name", type: "text", placeholder: "John", formValue: "firstName" },
                { id: "c", name: "Lastname", type: "text", placeholder: "Smith", formValue: "lastName" },
                { id: "d", name: "Email", type: "text", placeholder: "test@gmail.com", formValue: "email" },
            ]
        },
        {
            id : "3", 
            title: customerTitle,
            type: "Delete",
            method: "DELETE", 
            okMessage: "Customer deleted.",
            url: `${domainName}:${port}/api/customers`,
            fields: [
                {id: "a", name: "Id", type: "text", placeholder: "1", formValue: "id"}
            ]
        },
    ]

    res.render("customersApi",
        //These parameters are standard and should be used in every page
        { 
            motto: "Customers API",
            linksNavbar: mainPages.slice(1), //I take every page but not the home page, required from header and footer
            home: mainPages[0], 
            current: mainPages[1],
            currentYear: currentYear,
            username: getUsername(req.cookies.jwtToken) ?? '',
            //These parameters on the other hand, are some extra and depend on the components you want to add to the page
            itemsAPIForms: apiForms,
        }
    );
};

exports.productAPIPage = (req, res) => {
    const productTitle = apiPages[2].title;
    const apiForms = [
        {
            showGet: true,
            id : "1", 
            title: productTitle,
            type: "Create",
            method: "POST",
            url: `${domainName}:${port}/api/products`,
            okMessage: "Product created.",
            fields: [
                { id: "a", name: "Name", type: "text", placeholder: "Travel to Paris", formValue: "name" },
            ]
        },
        {
            id : "2", 
            title: productTitle,
            type: "Update",
            method: "PUT",
            url: `${domainName}:${port}/api/products`,
            okMessage: "Product updated.",
            fields: [
                { id: "a", name: "Id", type: "text", placeholder: "1", formValue: "id" },
                { id: "b", name: "Name", type: "text", placeholder: "Travel to Paris", formValue: "name" },
            ]
        },
        {
            id : "3", 
            title: productTitle,
            type: "Delete",
            method: "DELETE", 
            okMessage: "Product deleted.",
            url: `${domainName}:${port}/api/products`,
            fields: [
                {id: "a", name: "Id", type: "text", placeholder: "1", formValue: "id"}
            ]
        },
    ]

    res.render("productsApi",
        //These parameters are standard and should be used in every page
        { 
            motto: "Products API",
            linksNavbar: mainPages.slice(1), //I take every page but not the home page, required from header and footer
            home: mainPages[0], 
            current: mainPages[1],
            currentYear: currentYear,
            username: getUsername(req.cookies.jwtToken) ?? '',
            //These parameters on the other hand, are some extra and depend on the components you want to add to the page
            itemsAPIForms: apiForms,
        }
    );
};

exports.orderAPIPage = (req, res) => {
    //Setting active mainPages
    mainPages.forEach(page => {
        page.title == "Orders" ? page.active = true : page.active = false;
    });
    res.render("ordersApi", { 
        //These parameters are standard and should be used in every page
        motto: "OrdersApi",
        linksNavbar: mainPages.slice(2), //I take every page but not the home page, required from header and footer
        home: mainPages[0], 
        current: mainPages[1],
        currentYear: currentYear,
        username: getUsername(req.cookies.jwtToken) ?? '',
    });
};

//Authorization

