import clientPromise from "@/lib/mongodb";
import { Result } from "postcss";

export async function GET() {
  const client = await clientPromise;
  const db = client.db("bubble_chat");
  const collection = db.collection("bubbles");

  const doc = await collection.find();
  const docs = await doc.toArray();
//   console.log(docs)

if (docs.length > 0) {
    return new Response(JSON.stringify({
        success: true,
        error: false,
        message: "Data found",
        result: docs
    }), {
        headers: { 'Content-Type': 'application/json' }
    });
} else {
    return new Response(JSON.stringify({
        success: false,
        error: true,
        message: "No data found",
    }), {
        headers: { 'Content-Type': 'application/json' }
    });
}
}