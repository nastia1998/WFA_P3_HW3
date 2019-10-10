const Datastore = require('nedb');
const ODataServer = require('simple-odata-server');
const Adapter = require('simple-odata-server-nedb');

const express = require('express');
const cors = require('cors');
const app = express();

const computers = new Datastore({ filename: 'computers.db', autoload: true });

const model = {
    namespace: "jsreport",
    entityTypes: {
        "ComputerType": {
            "_id": {
                "type": "Edm.String",
                key: true
            },
            "_manufacturer": {
                "type": "Edm.String"
            },
            "_processor": {
                "type": "Edm.String"
            }
        }
    },
    entitySets: {
        "computers": {
            entityType: "jsreport.ComputerType"
        }
    }
};

const odataServer = ODataServer("http://localhost:3000").model(model)
    .adapter(Adapter(function (es, cb) { cb(null, computers) }));

app.listen(3000, (req, res) => {
    console.log("Server is working on port 3000");
});

app.use(cors());

app.use("/", function (req, res) {
    odataServer.handle(req, res);
});

let comp1 = {
    "_id": "1",
    "_manufacturer": "LG",
    "_processor": "Intel"
};
let comp2 = {
    "_id": "2",
    "_manufacturer": "HP",
    "_processor": "AMD"
};

computers.insert(comp1);
computers.insert(comp2);
