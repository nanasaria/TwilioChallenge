import * as Flex from '@twilio/flex-ui';
import { Conversation } from '@twilio/conversations';

import ChangeColor from '../interface/Colors/ChangeColor';
import { FlexJsClient, ConversationEvent } from '../../../../types/feature-loader';

export const clientName = FlexJsClient.conversationsClient;
export const eventName = ConversationEvent.conversationJoined;
export const jsClientHook = async function VerifyMessages(
  flex: typeof Flex,
  manager: Flex.Manager,
  conversation: Conversation,
  task: Flex.ITask,
) {
  const color = new ChangeColor();
  const taskStatus = task?.taskStatus;

  try {
    conversation.on('messageAdded', (message) => {
      const author = message.author;

      if (taskStatus === 'assigned') {
        if (author === null || author.startsWith('whatsapp')) {
          color.changeColor('#85C1A7');
          changeColorTaskItem(color.getColor());

          setTimeout(alertYellow, 240000);

          setTimeout(alertRed, 480000);
        } else {
          color.changeColor('#F4F4F6');
          changeColorTaskItem(color.getColor());
        }
      }
    });
  } catch (error) {
    console.error('Erro ao configurar o listener de mensagens:', error);
  }

  function alertYellow() {
    color.changeColor('#F0E74A');
    changeColorTaskItem(color.getColor());
  }

  function alertRed() {
    color.changeColor('#D63335');
    changeColorTaskItem(color.getColor());
  }

  function changeColorTaskItem(color: string) {
    const configuration = {
      theme: {
        componentThemeOverrides: {
          TaskList: {
            Item: {
              Container: {
                '.Twilio-TaskListBaseItem-UpperArea': {
                  background: color,
                },
              },
            },
          },
        },
      },
    };

    manager.updateConfig(configuration);
  }
};
