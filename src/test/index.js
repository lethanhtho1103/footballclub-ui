import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LiveMatch = () => {
  const [match, setMatch] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [startTime, setStartTime] = useState(null);

  useEffect(() => {
    const fetchLiveMatch = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/match-live');
        setMatch(response.data.live_matches[0]);
        setStartTime(new Date(response.data.live_matches[0].game_date + ' ' + response.data.live_matches[0].game_time));
      } catch (error) {
        console.error('Error fetching live match:', error);
      }
    };

    fetchLiveMatch();

    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); // Update every second

    return () => clearInterval(intervalId);
  }, []);

  if (!match || !startTime) {
    return <div>Loading...</div>;
  }

  const elapsedTime = Math.floor((currentTime - startTime) / 1000); // Time elapsed in seconds
  const elapsedMinutes = Math.floor(elapsedTime / 60); // Convert seconds to minutes

  const minutesRemaining = Math.min(Math.max(0, elapsedMinutes), 90); // Limit minutes between 0 and 90

  return (
    <div>
      <h2>{match.club.name} vs ???</h2>
      <img src={match.club.image} alt={match.club.name} />
      <p>Stadium: {match.stadium.name}</p>
      <p>Game Time: {match.game_time}</p>
      <p>Elapsed Time: {minutesRemaining} minutes</p>
    </div>
  );
};

export default LiveMatch;
