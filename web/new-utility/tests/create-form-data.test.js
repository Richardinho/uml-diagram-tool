const {createFormData} = require('../create-form-data.js');

describe('createFormData()', () => {
  it('should return form data', () => {
    const viewModel = {
      "id": "beta-2",
      "x": 400,
      "y": 200,
      "width": 126.484375,
      "paddingLeft": 5,
      "titleFontSize": 16,
      "propertyFontSize": 14,
      "methodFontSize": 14,
      "backgroundColor": "#ffffce",
      "borderColor": "#777",
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
            name: 'foo',
            type: 'String',
          },
          "y": 47
        },
        {
          text: {
            visibility: 'private',
            name: 'bar',
            type: 'Number',
          },
          "y": 67
        }
      ],
      "methods": [
        {
          text: {
            visibility: 'public',
            name: 'blah',
            returnType: 'String',
            args: [
              {
                name: 'arg1',
                type: 'number',
              },
              {
                name: 'arg2',
                type: 'string',
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
        "text": "AbstractFactory"
      },
      "height": 82
    }

    const result = createFormData(viewModel);

    const expected = {
      name: 'AbstractFactory',
      mode: 'abstract-class',
      properties: [
        {
          visibility: 'private',
          name: 'foo',
          type: 'String',

        },
        {
          visibility: 'private',
          name: 'bar',
          type: 'Number',
        }
      ],
      methods: [
        {
          visibility: 'public',
          name: 'blah',
          args: [
            {
              name: 'arg1',
              type: 'number',
            },
            {
              name: 'arg2',

              type: 'string',
            }
          ],
          returnType: 'String',
        }
      ],
    };

    expect(result).toEqual(expected);
  });
});
