const http = require('http');
const Datastore = require('nedb');
const ODataServer = require('simple-odata-server');
const Adapter = require('simple-odata-server-nedb');

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

var odataServer = ODataServer("http://localhost:3000")
    .model(model)
    .adapter(Adapter((es, cb) => {
        cb(null, db)
    }));


http.createServer(odataServer.handle.bind(odataServer)).listen(3000);