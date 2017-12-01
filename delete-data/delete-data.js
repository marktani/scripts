import { parse } from 'graphql/language';
import {request} from 'graphql-request';

var fs = require("fs");
var pluralize = require('pluralize');

var serverUrl = process.argv[2];
var schema = process.argv[3];

if(serverUrl == null || schema == null) {
    console.log("Usage : deleteData.js <server-url> <schema-file>");
} else {
    schema = fs.readFileSync(schema).toString('utf-8');
    var document = parse(schema);
    var readline = require('readline');
    var rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    function graphqlQuery(query, params) {
        return request(serverUrl,
                       query,
                       params)
        return someRequest
    };

    rl.question(`Do you really want to delete all data for Graphcool server running at : ${serverUrl} (y/n)? `, function(answer) {
        if(answer == "y" || answer == "Y") {
            document.definitions.forEach(function(definition) {
                if(definition.kind == 'ObjectTypeDefinition') {
                    const type = `${definition.name.value}`;
                    const types = pluralize(type);
                    const getAllTypesQuery = `{all${types} {id}}`;

                    graphqlQuery(getAllTypesQuery)
                        .then((response) => {
                            response[`all${types}`].forEach(function(element) {
                                const deleteObjectQuery = `
                              mutation DeleteUser($id:ID!) {
                                deleteUser(id: $id){
                                  id
                                }
                              }
                            `;
                                graphqlQuery(deleteObjectQuery, {"id" : element.id})
                                    .then((response) => {
                                        console.log("Deleted object", response)
                                    })
                            })
                        })
                        .catch(err => {
                            console.log("ERROR !", err);
                        });
                }
            });
        } else {
            console.log("okay, see you around !");
        }
        rl.close();
    });
}
