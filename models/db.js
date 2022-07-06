import mongoose from 'mongoose';

//const { dbURL } = require('../config');
import { dbURL } from "../config.js";

const database = {

    connect: function () {
        mongoose.connect(dbURL, {useNewUrlParser: true, useUnifiedTopology: true}, function(error) {
            if(error) throw error;
            console.log('Connected to: ' + dbURL);
        });
    },

    insertOne: function(model, doc, callback) {
        model.create(doc, function(error, result) {
            if(error) {
                console.log(error);
                return callback(false);
            }
            console.log('Added ' + result);
            return callback(result);
        });
    },

    insertMany: function(model, docs, callback) {
        model.insertMany(docs, function(error, result) {
            if(error) return callback(false);
            console.log('Added ' + result);
            return callback(true);
        });
    },

    findOne: function(model, query, projection, callback) {
        model.findOne(query, projection, function(error, result) {
            if(error) return callback(false);
            return callback(result);
        });
    },
 
    findMany: function(model, query, projection, callback) {
        model.find(query, projection, function(error, result) {
            if(error) return callback(false);
            return callback(result);
        });
    },

    findManyToJSON: function(model, query, projection, callback) {
        model.find(query, projection).lean().exec(function (error, result) {
            if(error) return callback(false);
            return callback(result);
        })
    },

    updateOne: function(model, filter, update, callback) {
        model.updateOne(filter, update, function(error, result) {
            if(error) return callback(false);
            //console.log('Document modified: ' + result.nModified);
            return callback(true);
        });
    },

    updateMany: function(model, filter, update, callback) {
        model.updateMany(filter, update, function(error, result) {
            if(error) return callback(false);
            console.log('Documents modified: ' + result.nModified);
            return callback(true);
        });
    },

    deleteOne: function(model, conditions, callback) {
        model.deleteOne(conditions, function (error, result) {
            if(error) return callback(false);
            console.log('Document deleted: ' + result.deletedCount);
            return callback(true);
        });
    },

    deleteMany: function(model, conditions, callback) {
        model.deleteMany(conditions, function (error, result) {
            if(error) return callback(false);
            console.log('Document deleted: ' + result.deletedCount);
            return callback(true);
        });
    },
    
    findOneAndDelete(model, conditions, options, callback){
        model.findOneAndDelete(conditions, options, function (error, result) {
            if(error) return callback(false);
            console.log('Document deleted: ' + result.deletedCount);
            return callback(result);
        });
    }
    
}

export default database;
