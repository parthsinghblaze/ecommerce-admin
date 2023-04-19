let API_URL = process.env.REACT_APP_DEV_API_DOMAIN;
let DOMAIN = '';

if (process.env.NODE_ENV === 'development') {
	DOMAIN = process.env.REACT_APP_DEV;
}else if(process.env.NODE_ENV === 'production'){
	DOMAIN = process.env.REACT_APP_PROD;
}

// } else if (process.env.REACT_APP_STAGE === 'staging') {
// 	DOMAIN = process.env.REACT_APP_STAGING_API_DOMAIN;

// } else if (process.env.REACT_APP_STAGE === 'prod') {
// 	DOMAIN = process.env.REACT_APP_PROD_API_DOMAIN;

// }

// API_URL = `${DOMAIN}api`;

const ROLES = {
	USER: "USER",
	ADMIN: "ADMIN"
};

const INVOICE_STATUS = {
	DRAFT: 'DRAFT',
	POSTED: 'POSTED',
	PAID: 'PAID'
}


const constants = {
	DOMAIN,
	API_URL,
	ROLES,
	INVOICE_STATUS
};


export default constants;
