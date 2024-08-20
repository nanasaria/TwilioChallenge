import * as Flex from '@twilio/flex-ui';

import { FlexEvent } from '../../../../types/feature-loader';

export const eventName = FlexEvent.taskReceived;
export const eventHook = function taskReceivedList(flex: typeof Flex, manager: Flex.Manager, task: Flex.ITask) {
  const configuration = {
    theme: {
      componentThemeOverrides: {
        TaskList: {
          Item: {
            Container: {
              '.Twilio-TaskListBaseItem-UpperArea': {
                background: '#F4F4F6',
              },
            },
          },
        },
      },
    },
  };

  manager.updateConfig(configuration);
};
