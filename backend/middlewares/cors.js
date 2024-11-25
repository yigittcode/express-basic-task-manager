// middlewares/cors.js
const cors = (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*"); 
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH");

    if (req.method === "OPTIONS") {
        return res.status(200).end();
    }

    next();  
};

export default cors;
