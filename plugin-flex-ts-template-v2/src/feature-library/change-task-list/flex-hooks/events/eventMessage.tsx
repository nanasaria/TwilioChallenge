import * as Flex from '@twilio/flex-ui';
import axios from 'axios';

import { FlexEvent } from '../../../../types/feature-loader';
import ChangeColor from '../interface/Colors/ChangeColor';

export const eventName = FlexEvent.taskAccepted;
export const eventHook = async function verifyAuthorMessage(
  flex: typeof Flex,
  manager: Flex.Manager,
  task: Flex.ITask,
) {
  const conversationSID = task?.attributes?.conversationSid;
  const color = new ChangeColor();
  const taskStatus = task?.taskStatus;

  let author;

  try {
    const response = await axios.get(`https://conversations.twilio.com/v1/Conversations/${conversationSID}/Messages`, {
      auth: {
        username: '<Your Account ID>',
        password: '<Your Auth Token>',
      },
    });

    const messages = response.data.messages;

    if (messages.length === 0) {
      console.log('Mensagens não encontradas');
      return;
    }

    const lastMessage = messages[messages.length - 1];
    author = lastMessage.author;
  } catch (error) {
    console.error('Erro ao buscar mensagens:', error);
  }

  if (taskStatus === 'assigned') {
    if (author.startsWith('whatsapp')) {
      color.changeColor('#85C1A7');
      changeColorTaskItem(color.getColor());

      setTimeout(alertYellow, 240000);

      setTimeout(alertRed, 480000);
    } else {
      console.log('Atendente enviou mensagem e não teve retorno do cliente.');
      color.changeColor('#F4F4F6');
      changeColorTaskItem(color.getColor());
    }
  } else {
    console.log('Task não foi aceita.');
    color.changeColor('#F4F4F6');
    changeColorTaskItem(color.getColor());
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
