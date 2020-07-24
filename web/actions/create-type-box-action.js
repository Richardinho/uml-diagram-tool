const {buildTypeBox} = require('../new-utility/build-diagram.js');
const TYPE_BOX_BACKGROUND_COLOR = '#ffffce';
const LINE_COLOR = '#777';

const basicTypeBox = {
  x: 0,
  y: 0,
  padding: 5,
  borderwidth: 1,
  horizontalConnectors: [
  ],
  titleFontSize: 16,
  propertyFontSize: 14,
  methodFontSize: 14,

  titleLineHeight: 22,
  propertyLineHeight: 20,
  methodLineHeight: 20,

  backgroundColor: TYPE_BOX_BACKGROUND_COLOR,
  borderColor: LINE_COLOR,
};

module.exports = function(id, configData) {
  const svgEl = document.getElementById('diagram');

  return {
    type: 'CREATE_TYPE_BOX',

    typeBox: buildTypeBox({
      ...basicTypeBox,
      id,
      title: configData.name,
      properties: [
        '+fddddd sdsds sdsd sds sdsdsdsddsdsoo:string',
        '+bar:number',
      ],
      methods: [
        '+doTheStrand():number'
      ],
    }, svgEl)
  }
}

  /*
   * form representation of type box
{
  "name": "AbstractFactory",
  "mode": "abstract-class",
  "properties": [
    {
      "visibility": "private",
      "name": "foo",
      "type": "String"
    },
    {
      "visibility": "private",
      "name": "bar",
      "type": "Number"
    }
  ],
  "methods": [
    {
      "visibility": "public",
      "name": "blah",
      "args": [
        {
          "name": "arg1",
          "type": "number"
        },
        {
          "name": "arg2",
          "type": "string"
        }
      ],
      "returnValue": "String"
    }
  ]
}
*/
