"use client";
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

const createBubble = () => {
  const [groupName, setGroupName] = useState('');
  const [users, setUsers] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const userList = users.split(',').map(user => user.trim());

    console.log(groupName, userList);

    try {
      const response = await fetch('http://localhost:3000/api/createBubble', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          groupName,
          users: userList
        })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      // Handle successful response
      console.log('Bubble created:', data);
      // Optional: Reset form or show success message
      setGroupName('');
      setUsers('');
    } catch (err) {
      setError('Failed to create group. Please try again.');
      console.error('Group creation error:', err);
    } finally {
      setLoading(false);
    }
  };

return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-48" >
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <Label htmlFor="groupName" className="text-lg">Group Name</Label>
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
                <Label htmlFor="users" className="text-lg">Users (comma-separated)</Label>
                <Textarea
                    id="users"
                    value={users}
                    onChange={(e) => setUsers(e.target.value)}
                    placeholder="john@example.com, jane@example.com"
                    required
                    className="mt-1"
                />
            </div>

            {error && (
                <div className="text-red-500 text-sm">
                    {error}
                </div>
            )}

            <Button 
                type="submit" 
                disabled={loading}
                className="w-full"
            >
                {loading ? 'Creating...' : 'Create Group'}
            </Button>
        </form>
    </div>
);
};

export default createBubble