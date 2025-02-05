import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb"; // Import ObjectId

export async function DELETE(request) {
  const client = await clientPromise;
  const db = client.db("bubble_chat");
  const collection = db.collection("bubbles");

  try {
    // Extract the document ID from the request query/body
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    // Validate ID
    if (!id) {
      return new Response(JSON.stringify({
        success: false,
        error: true,
        message: "Missing document ID",
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Validate if ID is a valid MongoDB ObjectId
    if (!ObjectId.isValid(id)) {
      return new Response(JSON.stringify({
        success: false,
        error: true,
        message: "Invalid document ID format",
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Delete the document
    const result = await collection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 1) {
      return new Response(JSON.stringify({
        success: true,
        error: false,
        message: "Document deleted successfully",
      }), {
        headers: { 'Content-Type': 'application/json' }
      });
    } else {
      return new Response(JSON.stringify({
        success: false,
        error: true,
        message: "Document not found",
      }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

  } catch (error) {
    console.error("Delete error:", error);
    return new Response(JSON.stringify({
      success: false,
      error: true,
      message: "Internal server error",
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}