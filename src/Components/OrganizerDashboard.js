import { useState, useEffect, useCallback } from 'react';
import { Button } from "../Components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../Components/ui/card";
import { Input } from "../Components/ui/input";
import { Label } from "../Components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../Components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../Components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../Components/ui/tabs";
import axios from 'axios';
import { motion } from 'framer-motion';
import { IoCalendarNumberSharp } from "react-icons/io5";
import { FaTrophy } from "react-icons/fa6";
import { FaUsersLine } from "react-icons/fa6";
import { FaDollarSign } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';

const OrganizerSubscription = {
  id: '',
  status: '',  // 'active' or 'inactive'
  expiresAt: ''
};

export default function OrganizerDashboard() {
  const [events, setEvents] = useState([]);
  const [matches, setMatches] = useState([]);
  const [unverifiedUsers, setUnverifiedUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [subscription, setSubscription] = useState<OrganizerSubscription | null>(null);
  const navigate = useNavigate();


  const [newEvent, setNewEvent] = useState({
    name: '',
    date: '',
    sport: ''
  });

  const [newMatch, setNewMatch] = useState({
    eventId: '',
    player1: '',
    player2: '',
    date: ''
  });

  // Memoized fetchData function using useCallback
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const [eventsRes, matchesRes, usersRes, subscriptionRes] = await Promise.all([
        axios.get('/api/organizer/events'),
        axios.get('/api/organizer/matches'),
        axios.get('/api/organizer/unverified-users'),
        axios.get('/api/organizer/subscription')
      ]);
      setEvents(eventsRes.data);
      setMatches(matchesRes.data);
      setUnverifiedUsers(usersRes.data);
      setSubscription(subscriptionRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  }, []); // You can add dependencies here if needed

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const createEvent = async (e) => {
    e.preventDefault();
    if (!subscription || subscription.status !== 'active') {
      alert('Please subscribe to create events');
      return;
    }
    try {
      const res = await axios.post('/api/organizer/events', newEvent);
      setEvents([...events, res.data]);
      setNewEvent({ name: '', date: '', sport: '' });
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

  const createMatch = async (e) => {
    e.preventDefault();
    if (!subscription || subscription.status !== 'active') {
      alert('Please subscribe to create matches');
      return;
    }
    try {
      const res = await axios.post('/api/organizer/matches', newMatch);
      setMatches([...matches, res.data]);
      setNewMatch({ eventId: '', player1: '', player2: '', date: '' });
    } catch (error) {
      console.error('Error creating match:', error);
    }
  };

  const verifyUser = async (userId) => {
    try {
      await axios.post(`/api/organizer/verify-user/${userId}`);
      setUnverifiedUsers(prevUsers => 
        prevUsers.filter(user => user.id !== userId)
      );
    } catch (error) {
      console.error('Error verifying user:', error);
    }
  };

  const handleSubscribe = () => {
    navigate('/organizer/subscribe');
  };

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  // Add loading check here
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e6f7ff] via-white to-[#e6fffa] dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-8">
      <motion.div className="max-w-7xl mx-auto space-y-8" {...fadeIn}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img src="/MatchMaster.png" alt="Match Master Logo" width={60} height={60} />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-[#1e3a8a] to-[#40e0d0] text-transparent bg-clip-text">
              Organizer Dashboard
            </h1>
          </div>
          <Button className="bg-gradient-to-r from-[#1e3a8a] to-[#40e0d0] text-white hover:from-[#40e0d0] hover:to-[#1e3a8a] transition-all duration-300">
            Logout
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Total Events</CardTitle>
              <IoCalendarNumberSharp className="h-4 w-4 text-[#40e0d0]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{events.length}</div>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Total Matches</CardTitle>
              <FaTrophy className="h-4 w-4 text-[#40e0d0]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{matches.length}</div>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Unverified Users</CardTitle>
              <FaUsersLine className="h-4 w-4 text-[#40e0d0]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{unverifiedUsers.length}</div>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Subscription Status</CardTitle>
              <FaDollarSign className="h-4 w-4 text-[#40e0d0]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{subscription?.status || 'Inactive'}</div>
              {subscription?.status === 'active' && (
                <p className="text-sm text-gray-500">Expires: {new Date(subscription.expiresAt).toLocaleDateString()}</p>
              )}
              {(!subscription || subscription.status !== 'active') && (
                <Button onClick={handleSubscribe} className="mt-2 bg-gradient-to-r from-[#1e3a8a] to-[#40e0d0] text-white hover:from-[#40e0d0] hover:to-[#1e3a8a] transition-all duration-300">
                  Subscribe Now
                </Button>
              )}
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="events" className="space-y-6">
          <TabsList className="bg-white dark:bg-gray-800 p-1 rounded-lg shadow-md">
            <TabsTrigger value="events" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#1e3a8a] data-[state=active]:to-[#40e0d0] data-[state=active]:text-white transition-all duration-300">Events</TabsTrigger>
            <TabsTrigger value="matches" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#1e3a8a] data-[state=active]:to-[#40e0d0] data-[state=active]:text-white transition-all duration-300">Matches</TabsTrigger>
            <TabsTrigger value="users" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#1e3a8a] data-[state=active]:to-[#40e0d0] data-[state=active]:text-white transition-all duration-300">User Verification</TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#1e3a8a] data-[state=active]:to-[#40e0d0] data-[state=active]:text-white transition-all duration-300">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="events" className="space-y-6">
            <Card className="bg-white dark:bg-gray-800 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-[#1e3a8a]">Create New Event</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={createEvent} className="space-y-4">
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Event Name</Label>
                      <Input
                        id="name"
                        value={newEvent.name}
                        onChange={(e) => setNewEvent({...newEvent, name: e.target.value})}
                        required
                        className="border-[#40e0d0] focus:ring-[#1e3a8a]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="date">Date</Label>
                      <Input
                        id="date"
                        type="date"
                        value={newEvent.date}
                        onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
                        required
                        className="border-[#40e0d0] focus:ring-[#1e3a8a]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="sport">Sport</Label>
                      <Select
                        value={newEvent.sport}
                        onValueChange={(value) => setNewEvent({...newEvent, sport: value})}
                      >
                        <SelectTrigger id="sport" className="border-[#40e0d0] focus:ring-[#1e3a8a]">
                          <SelectValue placeholder="Select a sport" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="table-tennis">Table Tennis</SelectItem>
                          <SelectItem value="carom">Carom</SelectItem>
                          <SelectItem value="chess">Chess</SelectItem>
                          <SelectItem value="badminton">Badminton</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <Button type="submit" className="w-full bg-gradient-to-r from-[#1e3a8a] to-[#40e0d0] text-white hover:from-[#40e0d0] hover:to-[#1e3a8a] transition-all duration-300">
                    Create Event
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-800 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-[#1e3a8a]">Event List</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Sport</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {events.map((event) => (
                      <TableRow key={event.id}>
                                                <TableCell>{event.name}</TableCell>
                        <TableCell>{new Date(event.date).toLocaleDateString()}</TableCell>
                        <TableCell>{event.sport}</TableCell>
                        <TableCell>
                          <Button
                            onClick={() => {
                              // Add your delete or edit functionality here
                            }}
                            className="bg-red-500 hover:bg-red-600 text-white"
                          >
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="matches" className="space-y-6">
            <Card className="bg-white dark:bg-gray-800 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-[#1e3a8a]">Create New Match</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={createMatch} className="space-y-4">
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="eventId">Event</Label>
                      <Select
                        value={newMatch.eventId}
                        onValueChange={(value) => setNewMatch({...newMatch, eventId: value})}
                      >
                        <SelectTrigger id="eventId" className="border-[#40e0d0] focus:ring-[#1e3a8a]">
                          <SelectValue placeholder="Select an event" />
                        </SelectTrigger>
                        <SelectContent>
                          {events.map((event) => (
                            <SelectItem key={event.id} value={event.id}>
                              {event.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="player1">Player 1</Label>
                      <Input
                        id="player1"
                        value={newMatch.player1}
                        onChange={(e) => setNewMatch({...newMatch, player1: e.target.value})}
                        required
                        className="border-[#40e0d0] focus:ring-[#1e3a8a]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="player2">Player 2</Label>
                      <Input
                        id="player2"
                        value={newMatch.player2}
                        onChange={(e) => setNewMatch({...newMatch, player2: e.target.value})}
                        required
                        className="border-[#40e0d0] focus:ring-[#1e3a8a]"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="date">Match Date</Label>
                    <Input
                      id="date"
                      type="date"
                      value={newMatch.date}
                      onChange={(e) => setNewMatch({...newMatch, date: e.target.value})}
                      required
                      className="border-[#40e0d0] focus:ring-[#1e3a8a]"
                    />
                  </div>
                  <Button type="submit" className="w-full bg-gradient-to-r from-[#1e3a8a] to-[#40e0d0] text-white hover:from-[#40e0d0] hover:to-[#1e3a8a] transition-all duration-300">
                    Create Match
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-800 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-[#1e3a8a]">Match List</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Event</TableHead>
                      <TableHead>Player 1</TableHead>
                      <TableHead>Player 2</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {matches.map((match) => (
                      <TableRow key={match.id}>
                        <TableCell>{match.eventName}</TableCell>
                        <TableCell>{match.player1}</TableCell>
                        <TableCell>{match.player2}</TableCell>
                        <TableCell>{new Date(match.date).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <Button
                            onClick={() => {
                              // Add your delete or edit functionality here
                            }}
                            className="bg-red-500 hover:bg-red-600 text-white"
                          >
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <Card className="bg-white dark:bg-gray-800 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-[#1e3a8a]">Unverified Users</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {unverifiedUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <Button
                            onClick={() => verifyUser(user.id)}
                            className="bg-green-500 hover:bg-green-600 text-white"
                          >
                            Verify
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <Card className="bg-white dark:bg-gray-800 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-[#1e3a8a]">Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">Here you can add analytics data or visualizations.</p>
                {/* Add analytics charts or graphs here */}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  )
}
