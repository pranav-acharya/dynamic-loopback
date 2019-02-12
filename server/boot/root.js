'use strict';
const app = require('../server');
const loopback = require('loopback');
const dsConfig = {
  dataSource: 'db',
};

module.exports = function(server) {
  // Install a `/` route that returns server status
  const router = server.loopback.Router();
  router.get('/', server.loopback.status());
  router.post('/models',  createModel);
  server.use(router);
};

function createModel(req, res) {
  try {
    var {
      name,
      plural,
      base,
      idInjection,
      properties,
      validations,
      relations,
      acls,
      options,
    } = req.body;

    var model = {
      'name': name,
      'plural': plural || name,
      'base': base || 'PersistedModel',
      'idInjection': idInjection,
      'properties': properties,
      'validations': validations,
      'relations': relations,
      'acls': acls,
      'options': options,
    };

    var modelInstance = loopback.createModel(model);
    app.model(modelInstance, dsConfig);
    app.models.DynamicModel.create(model, {}, function(err, result) {
      console.log('created dynamic model', result.name);
    });

    res.status(201).send({'success': model.name});
  } catch (ex) {
    res.status(500).send({'error': JSON.stringify(ex)});
  }
};
