import { useState, useEffect } from 'react'
import { Button } from "../Components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../Components/ui/card"
import { Input } from "../Components/ui/input"
import { Label } from "../Components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../Components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../Components/ui/tabs"
import axios from 'axios'
import "../CSS/UserProfile.css";

export default function UserProfile() {
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(false)
  const [editedProfile, setEditedProfile] = useState({})

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    try {
      setLoading(true)
      const response = await axios.get('https://pro-backend-yaj1.vercel.app/api/user-profile/profile')
      setProfile(response.data)
      setEditedProfile(response.data)
    } catch (error) {
      console.error('Error fetching profile:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = () => {
    setEditing(true)
  }

  const handleSave = async () => {
    try {
      await axios.put('https://pro-backend-yaj1.vercel.app/api/user-profile/profile', editedProfile)
      setProfile(prevProfile => ({ ...prevProfile, ...editedProfile }))
      setEditing(false)
    } catch (error) {
      console.error('Error updating profile:', error)
    }
  }

  const handleCancel = () => {
    setEditedProfile(profile)
    setEditing(false)
  }

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>
  }

  if (!profile) {
    return <div className="flex justify-center items-center h-screen">Error loading profile</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e6f7ff] via-white to-[#e6fffa] dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img src="/MatchMaster.png" alt="Match Master Logo" width={60} height={60} />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-[#1e3a8a] to-[#40e0d0] text-transparent bg-clip-text">
              User Profile
            </h1>
          </div>
          {!editing && (
            <Button onClick={handleEdit} className="bg-gradient-to-r from-[#1e3a8a] to-[#40e0d0] text-white hover:from-[#40e0d0] hover:to-[#1e3a8a] transition-all duration-300">
              ✏️ Edit Profile
            </Button>
          )}
        </div>

        <Card className="bg-white dark:bg-gray-800 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-[#1e3a8a]">Personal Information</CardTitle>
          </CardHeader>
          <CardContent>Admin Dashboard
￼Logout
Total Users
0
Pending Verifications
0
            <div className="grid grid-cols-2 gap-4">
              <div>
              Admin Dashboard
￼Logout
Total Users
0
Pending Verifications
0 <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={editing ? editedProfile.name : profile.name}
                  onChange={(e) => setEditedProfile({ ...editedProfile, name: e.target.value })}
                  disabled={!editing}
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  value={editing ? editedProfile.email : profile.email}
                  onChange={(e) => setEditedProfile({ ...editedProfile, email: e.target.value })}
                  disabled={!editing}
                />
              </div>
              <div>
                <Label htmlFor="role">Role</Label>
                <Input id="role" value={profile.role} disabled />
              </div>
              <div>
                <Label htmlFor="sport">Primary Sport</Label>
                {editing ? (
                  <Select
                    value={editedProfile.sport}
                    onValueChange={(value) => setEditedProfile({ ...editedProfile, sport: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a sport" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="table-tennis">Table Tennis</SelectItem>
                      <SelectItem value="carom">Carom</SelectItem>
                      <SelectItem value="chess">Chess</SelectItem>
                      <SelectItem value="badminton">Badminton</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <Input id="sport" value={profile.sport} disabled />
                )}
              </div>
              <div>
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  type="number"
                  value={editing ? editedProfile.age : profile.age}
                  onChange={(e) => setEditedProfile({ ...editedProfile, age: parseInt(e.target.value) })}
                  disabled={!editing}
                />
              </div>
            </div>
            {editing && (
              <div className="mt-4 space-x-2">
                <Button onClick={handleSave} className="bg-green-500 hover:bg-green-600 text-white">Save</Button>
                <Button onClick={handleCancel} variant="outline">Cancel</Button>
              </div>
            )}
          </CardContent>
        </Card>

        <Tabs defaultValue="stats" className="space-y-6">
          <TabsList className="bg-white dark:bg-gray-800 p-1 rounded-lg shadow-md">
            <TabsTrigger value="stats" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#1e3a8a] data-[state=active]:to-[#40e0d0] data-[state=active]:text-white transition-all duration-300">Stats</TabsTrigger>
            <TabsTrigger value="achievements" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#1e3a8a] data-[state=active]:to-[#40e0d0] data-[state=active]:text-white transition-all duration-300">Achievements</TabsTrigger>
          </TabsList>

          <TabsContent value="stats">
            <Card className="bg-white dark:bg-gray-800 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-[#1e3a8a]">Player Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    🏆 <span>Matches Played: {profile.matchesPlayed}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    🥇 <span>Matches Won: {profile.matchesWon}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    ⭐ <span>Win Rate: {((profile.matchesWon / profile.matchesPlayed) * 100).toFixed(2)}%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="achievements">
            <Card className="bg-white dark:bg-gray-800 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-[#1e3a8a]">Achievements</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2">
                  {profile.achievements.map((achievement, index) => (
                    <li key={index} className="text-[#1e3a8a]">{achievement}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
