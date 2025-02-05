import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import clientPromise from "@/lib/mongodb";


export async function POST(request) {
  // try {
    // const { groupName, users, description, image } = await request.json();
  //   console.log('Request data:', groupName, users, description, image);

  //   // Validate input
  //   if (!groupName || !users || !Array.isArray(users)) {
  //     return NextResponse.json(
  //       { error: 'Invalid input data. Ensure all fields are provided.' },
  //       { status: 400 }
  //     );
  //   }

  //   const filePath = path.join(process.cwd(), process.env.NEXT_JSON_CONFIG_FILE);
  //   let existingData;

  //   // Read or initialize JSON file
  //   try {
  //     const fileContent = await fs.readFile(filePath, 'utf8');
  //     existingData = JSON.parse(fileContent);
  //   } catch (error) {
  //     existingData = { bubbles: [] };

  //     // Create the file with an empty structure
  //     await fs.writeFile(
  //       filePath,
  //       JSON.stringify(existingData, null, 2),
  //       'utf8'
  //     );
  //   }

  //   // Create new bubble entry
  //   const newBubble = {
  //     title: groupName,
  //     description: description,
  //     img: image,
  //     slug: groupName.toLowerCase().replace(/\s+/g, '-'),
  //     users: users
  //   };

  //   // Check for and replace placeholder or add new entry
  //   if (
  //     existingData.bubbles.length === 1 &&
  //     existingData.bubbles[0].title === '' &&
  //     existingData.bubbles[0].description === ''
  //   ) {
  //     existingData.bubbles = [newBubble];
  //   } else {
  //     existingData.bubbles.push(newBubble);
  //   }

  //   // Write updated data to file
  //   await fs.writeFile(
  //     filePath,
  //     JSON.stringify(existingData, null, 2),
  //     'utf8'
  //   );

  //   return NextResponse.json(
  //     { message: 'Bubble config updated successfully', data: newBubble },
  //     { status: 200 }
  //   );
  // } catch (error) {
  //   console.error('Error updating bubble config:', error);
  //   return NextResponse.json(
  //     { error: 'Failed to update bubble config' },
  //     { status: 500 }
  //   );
  // }

  const body = await request.json();
  const client = await clientPromise;
  const db = client.db("bubble_chat");
  const collection = db.collection("bubbles");

  const doc = await collection.findOne({ groupName: body.groupName });

  if (doc) {
    return NextResponse.json({
      success: false,
      error: true,
      message: "This bubble already exists",
    });
  } else {
    const result = await collection.insertOne(body);

    return NextResponse.json({
      success: true,
      error: false,
      message: "Your bubble has been created",
      result: result,
    });
  }
}
