"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import BackButton from "../components/backButton";

const createBubble = () => {
  const [groupName, setGroupName] = useState("");
  const [users, setUsers] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const userList = users.split(",").map((user) => user.trim());

    console.log(groupName, userList);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/api/createBubble`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            groupName,
            description,
            image,
            users: userList,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      // Handle successful response
      console.log("Bubble config updated:", data);
      // Optional: Reset form or show success message
      setGroupName("");
      setUsers("");
      setDescription("");
      setImage("");
    } catch (err) {
      setError("Failed to update bubble config. Please try again.");
      console.error("Bubble config update error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md md:mt-40 mt-10 relative">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="groupName" className="text-lg">
              Group Name
            </Label>
            <Input
              id="groupName"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              placeholder="Enter group name"
              required
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="users" className="text-lg">
              Users (comma-separated)
            </Label>
            <Textarea
              id="users"
              value={users}
              onChange={(e) => setUsers(e.target.value)}
              placeholder="john@example.com, jane@example.com"
              required
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="description" className="text-lg">
              Description
            </Label>
            <Input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Lorem ipsum dolor sit amet..."
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="image" className="text-lg">
              Public image URL
            </Label>
            <Input
              id="image"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="https://example.com/image.jpg"
              className="mt-1"
            />
          </div>

          {error && <div className="text-red-500 text-sm">{error}</div>}

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Creating..." : "Create Bubble"}
          </Button>
        </form>
        <Button
          className="w-full mt-3"
          onClick={() => {
            setGroupName("");
            setUsers("");
            setDescription("");
            setImage("");
          }}
        >
          Clear
        </Button>
      </div>
      <div className="mx-10 top-10">
        {/* <BackButton className="absolute bottom-0 left-52 mb-4 ml-4 w-fit" /> */}
      </div>
    </>
  );
};

export default createBubble;
