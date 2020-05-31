import { SubscribeToMoreOptions } from "apollo-client";
import React, { useContext, useEffect, useRef } from "react";
import { RouteComponentProps } from "react-router-dom";
import { USER_PROFILE } from "../../sharedQueries";

import ChatPresenter from "./ChatPresenter";
import { GET_CHAT, SEND_MESSAGE, SUBSCRIBE_TO_MESSAGES } from "./ChatQueries";
import { useQuery, useMutation } from "@apollo/react-hooks";
import useInput from "src/Hooks/useInput";
import { UserContext } from "src/Context/UserContext";

interface IProps extends RouteComponentProps<any> {}

const ChatContainer: React.FC<IProps> = ({ history, match }) => {
  const chatId = Number((match.params as any).chatId);
  console.log(chatId);
  if (!chatId) {
    // history.replace("/");
  }
  const { user } = useContext(UserContext);
  const chatRef = useRef<HTMLDivElement>();
  const message = useInput();
  const [sendMessageMutation] = useMutation(SEND_MESSAGE);
  const { subscribeToMore, data, loading } = useQuery(GET_CHAT, {
    variables: {
      chatId,
    },
  });
  const subscribeToMoreOptions: SubscribeToMoreOptions = {
    document: SUBSCRIBE_TO_MESSAGES,
    variables: {
      chatId,
    },
    updateQuery: (prev, { subscriptionData }) => {
      if (!subscriptionData) {
        return prev;
      } else {
        const newObject = Object.assign({}, prev, {
          GetChat: {
            ...prev.GetChat,
            chat: {
              ...prev.GetChat.chat,
              messages: [
                ...prev.GetChat.chat.messages,
                subscriptionData.data.MessageSubscription,
              ],
            },
          },
        });
        message.setValue("");
        return newObject;
      }
    },
  };

  useEffect(() => {
    subscribeToMore(subscribeToMoreOptions);
  }, []);

  useEffect(() => {
    if (chatRef && chatRef.current) {
      chatRef.current.scrollTo({ top: chatRef.current.clientHeight });
    }
  }, [data]);

  const onSubmitSendMessage = async () => {
    await sendMessageMutation({
      variables: {
        text: message.value,
        chatId,
      },
    });
  };

  return (
    <ChatPresenter
      chatRef={chatRef}
      data={data}
      user={user}
      loading={loading}
      message={message.value}
      onChangeMessage={message.onChange}
      onSubmitSendMessage={onSubmitSendMessage}
    />
  );
};

export default ChatContainer;
