
function updateState(state, detail) {
  switch(detail.type) {
    case 'name':
      return {
        ...state,
        name: detail.value,
      };
    case 'property-name':
      return {
        ...state,
        properties: state.properties.map((property, index) => {
          if (index === detail.index) {
            return {
              ...property,
              name: detail.value,
            };
          }

          return property;
        }),
      };
    case 'add-property':
      return {
        ...state, 
        properties: [
          ...state.properties,
          {
            name: '',
            type: '',
            visibility: 'private',
          }
        ]
      };

    case 'delete-property':
      return {
        ...state,
        properties: state.properties.filter((property, index) => {
          return index !== detail.index;
        }),
      };

    case 'property-type':
      return {
        ...state,
        properties: state.properties.map((property, index) => {
          if (index === detail.index) {
            return {
              ...property,
              type: detail.value,
            };
          }

          return property;
        }),
      };

    case 'method-name':
      return {
        ...state,
        methods: state.methods.map((method, index) => {
          if (index === detail.index) {
            return {
              ...method,
              name: detail.value,
            };
          }

          return method;
        }),
      };

    case 'method-return-type':
      return {
        ...state,
        methods: state.methods.map((method, index) => {
          if (index === detail.index) {
            return {
              ...method,
              returnType: detail.value,
            };
          }

          return method;
        }),
      };

    case 'add-method':
      return {
        ...state, 
        methods: [
          ...state.methods,
          {
            name: '',
            returnType: '',
            visibility: 'private',
            args: [],
          }
        ]
      };

    case 'delete-method':
      return {
        ...state,
        methods: state.methods.filter((method, index) => {
          return index !== detail.index;
        }),
      };
    case 'arg-name':
      return {
        ...state,
        methods: state.methods.map((method, index) => {
          if (index === detail.methodIndex) {
            return {
              ...method,
              args: method.args.map((arg, argIndex) => {
                if (argIndex === detail.argIndex) {

                  return {
                    ...arg,
                    name: detail.value,
                  };
                }

                return arg;
              }),
            };

            return method;
          }

          return method;
        }),

      };

    case 'arg-type':
      return {
        ...state,
        methods: state.methods.map((method, index) => {
          if (index === detail.methodIndex) {
            return {
              ...method,
              args: method.args.map((arg, argIndex) => {
                if (argIndex === detail.argIndex) {

                  return {
                    ...arg,
                    type: detail.value,
                  };
                }

                return arg;
              }),
            };

            return method;
          }

          return method;
        }),
      };

    case 'delete-arg':

      return {
        ...state,
        methods: state.methods.map((method, index) => {
          if (index === detail.methodIndex) {
            return {
              ...method,
              args: method.args.filter((arg, index) => {
                return index !== detail.argIndex;
              })
            };
          }

          return method;
        }),
      };

    case 'add-arg':
      return {
        ...state,
        methods: state.methods.map((method, index) => {
          if (index === detail.index) {
            return {
              ...method,
              args: [...method.args, { name: '', type: '' }],
            };

            return method;
          }

          return method;
        }),

      };

    case 'select-mode':
      return {
        ...state,
        mode: detail.value,
      }
    case 'property-visibility':
      return {
        ...state,
        properties: state.properties.map((property, index) => {
          if (index === detail.index) {
            return {
              ...property,
              visibility: detail.value,
            }
          }

          return property;
        }),
      };

    case 'method-visibility':
      return {
        ...state,
        methods: state.methods.map((method, index) => {
          if (index === detail.index) {
            return {
              ...method,
              visibility: detail.value,
            }
          }

          return method;
        }),
      };

    case 'method-visibility':
      return state;


    default:
      return state;
  }

  return state;
}
module.exports.updateState = updateState;
