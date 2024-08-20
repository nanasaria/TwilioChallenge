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
  const atributosTask = task?.attributes;
  console.log('atributos aqui ', atributosTask);

  let author;
  let timestamp;

  console.log('sid ', process.env.TWILIO_ACCOUNT_SID);
  console.log('auth ', process.env.TWILIO_AUTH_TOKEN);

  try {
    const response = await axios.get(`https://conversations.twilio.com/v1/Conversations/${conversationSID}/Messages`, {
      auth: {
        username: 'AC7fb66fe355c0478db15a89663514c807',
        password: '8662292da94380f1a35c374ea2a56d5c',
      },
    });

    const messages = response.data.messages;

    if (messages.length === 0) {
      console.log('Mensagens não encontradas');
      return;
    }

    const lastMessage = messages[messages.length - 1];
    author = lastMessage.author;
    timestamp = lastMessage.date_created;
  } catch (error) {
    console.error('Erro ao buscar mensagens:', error);
  }

  if (author.startsWith('whatsapp')) {
    console.log('Cliente enviou mensagem, COR VERDE');
    color.changeColor('#85C1A7');
    changeColorTaskItem(color.getColor());

    setTimeout(alertYellow, 240000);

    setTimeout(alertRed, 480000);
  } else {
    console.log('Atendente enviou mensagem e não teve retorno do cliente.');
    color.changeColor('#F4F4F6');
    changeColorTaskItem(color.getColor());
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
