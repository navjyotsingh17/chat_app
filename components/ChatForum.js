"use client";
import React from "react";
import { useState, useEffect } from "react";
import {
  useCreateChatClient,
  Chat,
  Channel,
  ChannelHeader,
  MessageInput,
  MessageList,
  Thread,
  Window,
} from "stream-chat-react";
import "stream-chat-react/dist/css/v2/index.css";
import "ldrs/ring";
import BackButton from "@/app/components/backButton";

const ChatForum = ({ clerkUser, slug }) => {
  
  const [channel, setChannel] = useState();

  // console.log("slug: ",slug)

  const apiKey = "6cp8s777zute";
  const userId = clerkUser.id;
  const userName = clerkUser.name;
  const userToken = clerkUser.token;

  //  console.log(userToken)

  const user = {
    id: userId,
    name: userName,
    image: `https://getstream.io/random_png/?name=${userName}`,
  };

  const client = useCreateChatClient({
    apiKey,
    tokenOrProvider: userToken,
    userData: user,
  });

  const channelName = (slug) => {
    // Split the string into an array of words
    let words = slug.split(" ");

    // Capitalize the first letter of each word
    let capitalizedWords = words.map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    });

    // console.log(capitalizedWords.join(" ") + " Discussion");
    // Join the capitalized words and add "Discussion"
    return capitalizedWords.join(" ");
  };

  useEffect(() => {
    if (!client) return;

    const channel = client.channel("messaging", slug, {
      image: "https://getstream.io/random_png/?name=react",
      name: channelName(slug),
      //   members: [userId],
    });

    setChannel(channel);
  }, [client]);

  if (!client)
    return (
      <div>
        <l-ring
          size="40"
          stroke="5"
          bg-opacity="0"
          speed="2"
          color="black"
        ></l-ring>
      </div>
    );

  return (
    <>
    <Chat client={client}>
      <Channel channel={channel}>
        <Window>
          <ChannelHeader />
          <MessageList />
          <MessageInput />
        </Window>
        <Thread />
      </Channel>
    </Chat>
    <div className="ml-5 mt-5">
    <BackButton>Back</BackButton>
    </div>
    </>
  );
};

export default ChatForum;
