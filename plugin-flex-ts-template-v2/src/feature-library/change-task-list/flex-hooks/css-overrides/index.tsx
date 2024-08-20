import * as Flex from '@twilio/flex-ui';

export const cssOverrideHook = (flex: typeof Flex, manager: Flex.Manager) => {
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
