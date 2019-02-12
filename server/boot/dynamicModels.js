'use strict';
const app = require('../server');
const loopback = require('loopback');
const dsConfig = {
  dataSource: 'db',
};

module.exports = function createDynamicModels(server) {
  // creates models that were persisted as Entities
  app.models.DynamicModel.find(function(err, dynamicModels) {
    dynamicModels.forEach(dynamicModel => {
      const modelInstance = loopback.createModel(dynamicModel);
      app.model(modelInstance, dsConfig);
      app.models.DynamicModel.create(dynamicModel, {}, function(err, result) {
        console.log('created dynamic model', result.name);
      });
    });
  });
};
