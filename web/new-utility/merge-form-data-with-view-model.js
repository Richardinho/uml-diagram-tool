const {get} = require('lodash');

function mergeFormDataWithViewModel(viewModel, formData) {
  return {
    ...formData,
    id: viewModel.id,
    x: viewModel.x,
    y: viewModel.y,
    horizontalConnectors: viewModel.horizontalConnectors,
  };
}

module.exports.mergeFormDataWithViewModel = mergeFormDataWithViewModel;
