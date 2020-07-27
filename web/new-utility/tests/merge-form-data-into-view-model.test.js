const {mergeFormDataWithViewModel} = require('../merge-form-data-with-view-model.js');
describe('', () => {

  it('should merge viewModel values with those of form data to create structure that we can use to build a new viewModel', () => {

    const viewModel = {
      "id": "view-model-id",
      "x": 400,
      "y": 200,
      "width": 126.484375,
      "horizontalConnectors": [
        {
          "id": "connector-1",
          "nodeType": "outer1"
        }
      ],
      "properties": [
        {
          text: {
            visibility: 'private',
            name: 'view-model-property-2',
            type: 'view-model-boolean',
          },
          "y": 47
        },
        {
          text: {
            visibility: 'private',
            name: 'view-model-property-1',
            type: 'view-model-string',
          },
          "y": 67
        }
      ],
      "methods": [
        {
          text: {
            visibility: 'public',
            name: 'view-model-method-1',
            returnType: 'view-model-string',
            args: [
              {
                name: 'view-model-arg1',
                type: 'view-model-number',
              },
              {
                name: 'view-model-arg2',
                type: 'view-model-string',
              },
            ],
          },
          y: 34,
        }

      ],
      "separators": [
        32
      ],
      "name": {
        "y": 16,
        "text": "view-model-name"
      },
      "height": 82
    }

    let formData =  {
      name: 'form-data-name',
      mode: 'abstract-class',
      properties: [
        {
          visibility: 'private',
          name: 'form-data-property-1',
          type: 'form-data-string',

        },
        {
          visibility: 'private',
          name: 'form-data-property-2',
          type: 'form-data-number',
        }
      ],
      methods: [
        {
          visibility: 'public',
          name: 'form-data-method-1',
          args: [
            {
              name: 'form-data-arg-1',
              type: 'form-data-number',
            },
            {
              name: 'form-data-arg-2',
              type: 'form-data-string',
            }
          ],
          returnType: 'form-data-boolean',
        }
      ],
    };

    const result = mergeFormDataWithViewModel(viewModel, formData);

    expect(result).toEqual({
      id: 'view-model-id',

      x: 400,
      y: 200,

      mode: 'abstract-class',

      horizontalConnectors: [
        {
          id: 'connector-1',
          nodeType: 'outer1',
        }
      ],

      name: 'form-data-name',

      properties: [
        {
          visibility: 'private',
          name: 'form-data-property-1',
          type: 'form-data-string',

        },
        {
          visibility: 'private',
          name: 'form-data-property-2',
          type: 'form-data-number',
        }
      ],

      methods: [
        {
          visibility: 'public',
          name: 'form-data-method-1',
          args: [
            {
              name: 'form-data-arg-1',
              type: 'form-data-number',
            },
            {
              name: 'form-data-arg-2',
              type: 'form-data-string',
            }
          ],
          returnType: 'form-data-boolean',
        }
      ],
    });
  });
});
