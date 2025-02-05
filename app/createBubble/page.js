"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import BackButton from "../components/backButton";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

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

    // console.log(groupName, userList);

    try {

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_HOST}/api/createBubble`,
        {
          groupName,
          description,
          image,
          users: userList,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        toast.success("Your bubble has been created");
        setGroupName("");
        setUsers("");
        setDescription("");
        setImage("");
      } else if(response.data.error) {
        toast.error("This bubble already exists");
      }
    } catch (err) {
      // setError("Failed to update bubble config. Please try again.");
      toast.error("Error while creating bubble");
      console.log("error:- ",err)
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

          {/* {error && <div className="text-red-500 text-sm">{error}</div>} */}

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
      <div className="md:ml-10 md:top-10 ml-5 mt-3 py-2">
        <BackButton className="absolute bottom-0 left-52 mb-4 ml-4 w-fit" />
      </div>
      <ToastContainer />
    </>
  );
};

export default createBubble;
