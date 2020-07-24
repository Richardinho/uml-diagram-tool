const TYPE_BOX_BACKGROUND_COLOR = '#ffffce';
const LINE_COLOR = '#777';

const diagram = {
  horizontalConnectors: [
    {
      id: 'connector-1',
      lineColor: 'blue',
      nodes: {
        outer1: { x: 400, y: 220, type: 'headless', typeBox: 'beta-2' },
        inner1: { x: 100 },
        inner2: { y: 420 },
        outer2: { x: 200, type: 'white-arrow', typeBox: 'beta' },
      },
    },
  ],
  typeBoxes: [
    {
      id: 'beta-2',
      x: 400,
      y: 200,
      padding: 5,
      borderwidth: 1,
      horizontalConnectors: [
        {
          id: 'connector-1',
          nodeType: 'outer1',
        },
      ],
      titleFontSize: 16,
      propertyFontSize: 14,
      methodFontSize: 14,

      titleLineHeight: 22,
      propertyLineHeight: 20,
      methodLineHeight: 20,

      backgroundColor: TYPE_BOX_BACKGROUND_COLOR,
      borderColor: LINE_COLOR,

      title: 'Abstract Factory',
      properties: [
        '+fddddd sdsds sdsd sds sdsdsdsddsdsoo:string',
        '+bar:number',
      ],
      methods: [
      ],
    },
    {
      id: 'beta',
      x: 200,
      y: 400,
      padding: 5,
      borderwidth: 1,
      horizontalConnectors: [
        {
          id: 'connector-1',
          nodeType: 'outer2',
        }
      ],

      titleFontSize: 16,
      propertyFontSize: 14,
      methodFontSize: 14,

      titleLineHeight: 22,
      propertyLineHeight: 20,
      methodLineHeight: 20,

      backgroundColor: TYPE_BOX_BACKGROUND_COLOR,
      borderColor: LINE_COLOR,

      title: 'Command Pattern really long blah lalal alall hello lwllwwlwl ',
      properties: [
        '+foo:string',
        '+bar:number',
      ],
      methods: [
        '+blah():string',
        '+miz():number',
      ],
    }
  ],
};

module.exports = diagram;
