const foo = {
  "horizontalConnectors": [
    {
      "id": "1o3d8db24akd53qpkr",
      "lineColor": "red",
      "nodes": {
        /*
         *  we can infer the coords of nodes from other nodes so 
         *  not every one needs an x and y
         */
        "outer1": {
          "x": 100,
          "y": 100,
          /*
           * this contains the connector Id and a label for this node
           * Is there a better way to do this?
           */
          "id": "1o3d8db24akd53qpkr_outer1"
        },
        "inner1": {
          "x": 200,
          // i don't think these are necessary
          "id": "1o3d8db24akd53qpkr_inner1"
        },
        "inner2": {
          "y": 237.41015625,
          "id": "1o3d8db24akd53qpkr_inner2"
        },
        "outer2": {
          "x": 530.5078125,
          "id": "1o3d8db24akd53qpkr_outer2",
          "typeBox": "1o3d8db24akd53ql6g",
          "y": 237.41015625
        }
      }
    }
  ],
  "typeBoxes": [
    {
      "id": "1o3d8db24akd53ql6g",
      "x": 530.5078125,
      "y": 198.87109375,
      "paddingLeft": 5,
      "borderWidth": 1,
      /*
       *  type box needs to know about connectors attached to it.
       *  It needs the id of the connector and which node it is
       */
      // todo: there may be a problem with connectors not being deleted
      "horizontalConnectors": [
        {
          "nodeType": "outer2",
          "id": "1o3d8db24akd53qpkr"
        },
      ],
      "backgroundColor": "#ffffce",
      "borderColor": "#666",
      "properties": [
        {
          "text": {
            "name": "prop1",
            "type": "String",
            "visibility": "private"
          },
          "fontSize": 14,
          "color": "#333",
          "x": 5,
          "y": 38.5
        }
      ],
      "methods": [
        {
          "text": {
            "name": "method1",
            "returnType": "Object",
            "visibility": "private",
            "args": [
              {
                "name": "arg1",
                "type": "boolean"
              }
            ]
          },
          "fontSize": 14,
          "color": "#333",
          "x": 5,
          "y": 63.5
        }
      ],
      "separators": [
        {
          "y": 26,
          "color": "#666",
          "thickness": 1,
          "currentY": 26,
          "width": 208.453125
        },
        {
          "y": 51,
          "color": "#666",
          "thickness": 1,
          "currentY": 51,
          "width": 208.453125
        }
      ],
      "name": {
        "text": "Hello",
        "color": "#333",
        "x": 5,
        "y": 13,
        "fontSize": 16
      },
      "height": 76,
      "width": 208.453125
    }
  ]
}
