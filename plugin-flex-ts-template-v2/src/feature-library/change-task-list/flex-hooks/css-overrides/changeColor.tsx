import * as Flex from '@twilio/flex-ui';

export const cssOverrideHook = (_flex: typeof Flex, _manager: Flex.Manager) => {
  return {
    TaskList: {
      Item: {
        Container: {
          '.Twilio-TaskListBaseItem-UpperArea': {
            background: '',
          },
        },
      },
    },
  };
};
