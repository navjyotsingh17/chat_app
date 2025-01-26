import { StreamChat } from "stream-chat";

const api_key = "6cp8s777zute";
const api_secret = "sy5rmkx4sdfcx4zn2zdudb6d4rsv32d7dd6dmwjuh9n9jhecqjm8ctney4k63f8g";

export async function POST(request) {
  try {
    // Parse the incoming JSON request
    const { groupName, users } = await request.json();

    if (!groupName || !Array.isArray(users) || users.length === 0) {
      return Response.json({ error: "Invalid input data." }, { status: 400 });
    }

    // Initialize a Server Client
    const serverClient = StreamChat.getInstance(api_key, api_secret);

    // Capitalize the first letter of each word in groupName
    const formattedGroupName = groupName
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    // Create the channel with the given groupName
    const channel = serverClient.channel("messaging", groupName.toLowerCase(), {
      image: "https://getstream.io/random_png/?name=group",
      name: formattedGroupName,
      created_by_id: "admin", // Replace with the ID of the user creating the channel if required
    });

    // Create the channel
    await channel.create();

    // Add users to the channel
    await channel.addMembers(users);

    return Response.json({
      message: `Channel '${formattedGroupName}' created successfully!`,
      groupName: formattedGroupName,
      usersAdded: users,
    });
  } catch (error) {
    console.error("Error creating channel:", error);
    return Response.json({ error: "Failed to create channel." }, { status: 500 });
  }
}
