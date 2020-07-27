const {get} = require('lodash');

/*
 *  create form data from view model
 */

function createFormData(viewModel) {

  return  {
    name: get(viewModel, 'name.text', ''),
    mode: 'abstract-class',
    properties: get(viewModel, 'properties', []).map(property => {
      return {
        visibility: get(property, 'text.visibility', ''),
        name: get(property, 'text.name', ''),
        type: get(property, 'text.type', ''),
      };
    }),
    methods: get(viewModel, 'methods', []).map(method => {
      return {
        visibility: get(method, 'text.visibility', ''),
        name: get(method, 'text.name', ''),
        returnType: get(method, 'text.returnType', ''),
        args: get(method, 'text.args', []),
      };
    }),
  };
}

module.exports.createFormData = createFormData;
