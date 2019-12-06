import wrapper from '../../util/http/httpWrapper';

export const handler = wrapper(async (event, context) => {
  return "Hello World";
});

