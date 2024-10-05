import { useState, useEffect } from 'react';
import * as tf from '@tensorflow/tfjs';
import { Button } from "../Components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../Components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../Components/ui/select";

export default function MatchPrediction() {
  const [players, setPlayers] = useState([]);
  const [player1, setPlayer1] = useState('');
  const [player2, setPlayer2] = useState('');
  const [prediction, setPrediction] = useState('');
  const [model, setModel] = useState(null);

  useEffect(() => {
    // Fetch players data
    // This is a mock implementation. In a real app, you'd fetch this from your API
    setPlayers([
      { id: '1', name: 'Player 1', wins: 10, losses: 5 },
      { id: '2', name: 'Player 2', wins: 8, losses: 7 },
      { id: '3', name: 'Player 3', wins: 12, losses: 3 },
    ]);

    // Create and train the model
    const createModel = async () => {
      const model = tf.sequential();
      model.add(tf.layers.dense({ units: 4, inputShape: [4], activation: 'relu' }));
      model.add(tf.layers.dense({ units: 1, activation: 'sigmoid' }));
      model.compile({ optimizer: 'adam', loss: 'binaryCrossentropy', metrics: ['accuracy'] });

      // Train the model (this is a very simplified example)
      const xs = tf.tensor2d([[10, 5, 8, 7], [8, 7, 12, 3], [12, 3, 10, 5]]);
      const ys = tf.tensor2d([[1], [0], [1]]);
      await model.fit(xs, ys, { epochs: 100 });

      setModel(model);
    };

    createModel();
  }, [setModel]); // Added setModel to dependency array

  const predictOutcome = async () => {
    if (!model || !player1 || !player2) return;

    const p1 = players.find(p => p.id === player1);
    const p2 = players.find(p => p.id === player2);

    if (!p1 || !p2) return;

    const input = tf.tensor2d([[p1.wins, p1.losses, p2.wins, p2.losses]]);
    const predictionTensor = await model.predict(input);
    const winProbability = predictionTensor.dataSync()[0];
    setPrediction(`${p1.name} has a ${(winProbability * 100).toFixed(2)}% chance of winning`);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-[#1e3a8a]">Match Outcome Prediction</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Select value={player1} onValueChange={setPlayer1}>
            <SelectTrigger>
              <SelectValue placeholder="Select Player 1" />
            </SelectTrigger>
            <SelectContent>
              {players.map(player => (
                <SelectItem key={player.id} value={player.id}>{player.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Select value={player2} onValueChange={setPlayer2}>
            <SelectTrigger>
              <SelectValue placeholder="Select Player 2" />
            </SelectTrigger>
            <SelectContent>
              {players.map(player => (
                <SelectItem key={player.id} value={player.id}>{player.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button onClick={predictOutcome} className="w-full bg-gradient-to-r from-[#1e3a8a] to-[#40e0d0] text-white hover:from-[#40e0d0] hover:to-[#1e3a8a] transition-all duration-300">
          Predict Outcome
        </Button>
        {prediction && (
          <p className="text-center font-medium">{prediction}</p>
        )}
      </CardContent>
    </Card>
  );
}
