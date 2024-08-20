import * as Flex from '@twilio/flex-ui';
import { Conversation } from '@twilio/conversations';

import ChangeColor from '../interface/Colors/ChangeColor';
import { FlexJsClient, ConversationEvent } from '../../../../types/feature-loader';

export const clientName = FlexJsClient.conversationsClient;
export const eventName = ConversationEvent.conversationJoined;
export const jsClientHook = async function messageClient(
  flex: typeof Flex,
  manager: Flex.Manager,
  conversation: Conversation,
) {
  const color = new ChangeColor();

  try {
    conversation.on('messageAdded', (message) => {
      const author = message.author;
      const timestamp = message.dateCreated;

      if (author === null || author.startsWith('whatsapp')) {
        console.log('Cor Verde!');
        color.changeColor('#85C1A7');
        changeColorTaskItem(color.getColor());

        setTimeout(alertYellow, 240000);

        setTimeout(alertRed, 480000);
      } else {
        console.log('Cor Default!');
        color.changeColor('#F4F4F6');
        changeColorTaskItem(color.getColor());
      }
    });
  } catch (error) {
    console.error('Erro ao configurar o listener de mensagens:', error);
  }

  function alertYellow() {
    console.log('Cor mudou para amarelo!');
    color.changeColor('#F0E74A');
    changeColorTaskItem(color.getColor());
  }

  function alertRed() {
    console.log('Cor mudou para vermelho!');
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
