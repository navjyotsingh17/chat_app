import { StreamChat } from "stream-chat";
import { clerkClient } from "@clerk/nextjs/server";
import fs from 'fs';
import path from 'path';

const api_key = "6cp8s777zute";
const api_secret =
  "sy5rmkx4sdfcx4zn2zdudb6d4rsv32d7dd6dmwjuh9n9jhecqjm8ctney4k63f8g";
// const user_id = "user_2rqTUs3PgQTxaflVqFaOZqOViK1";

export async function POST(request) {
  const channelName = (slug) => {
    // Split the string into an array of words
    let words = slug.split(" ");

    // Capitalize the first letter of each word
    let capitalizedWords = words.map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    });

    // console.log(capitalizedWords.join(" ") + " Discussion");
    
    // Join the capitalized words
    return capitalizedWords.join(" ");
  };

  // Initialize a Server Client
  const serverClient = StreamChat.getInstance(api_key, api_secret);
  const user = await request.json();
  console.log("A NEW USER HAS BEEN CREATED:- ", user.data.id);
  //   Create User Token
  const token = serverClient.createToken(user.data.id);
  console.log(token);

  const client = await clerkClient();
  await serverClient.upsertUser({id: user.data.id})

  await client.users.updateUserMetadata(user.data.id, {
    privateMetadata: {
      token: token,
    },
  });

  // const slugs = ['python-new','react-new','javascript-new','nextjs-new','cpp-new','ruby-new','java-new']

  const bubblesConfigPath = path.resolve(process.cwd(), 'bubblesconfig.json');
  const bubblesConfig = JSON.parse(fs.readFileSync(bubblesConfigPath, 'utf-8'));
  const slugs = bubblesConfig.slug;
  slugs.forEach(async(item)=>{
    const channel = serverClient.channel("messaging", item, {
      image: item.img,
      name: channelName(item),
      created_by_id: user.data.id,
    });
    await channel.create();
    channel.addMembers([user.data.id]);
  })

  return Response.json({ message: "HELLO WORLD" });
}
