import React, { useState } from 'react';
import { 
  Card, CardContent, CardHeader, 
  Button, Radio, RadioGroup, FormControlLabel, FormControl, 
  Typography, Box
} from '@mui/material';

const questions = [
  {
    id: 1,
    text: "I can easily remember a list of items I need to buy without writing them down.",
    domain: "Memory",
    key: "KEYLOWKEYLOWSHORTKEYNEUTRALKEYHIGHSHORTKEYHIGH"
  },
  {
    id: 2,
    text: "I often find myself losing focus during long meetings or lectures.",
    domain: "Attention",
    key: "KEYLOWKEYLOWSHORTKEYNEUTRALKEYHIGHSHORTKEYHIGH"
  },
  {
    id: 3,
    text: "I can quickly solve mathematical problems in my head.",
    domain: "Processing Speed",
    key: "KEYLOWKEYLOWSHORTKEYNEUTRALKEYHIGHSHORTKEYHIGH"
  },
  {
    id: 4,
    text: "I excel at finding creative solutions to complex problems.",
    domain: "Problem-Solving",
    key: "KEYLOWKEYLOWSHORTKEYNEUTRALKEYHIGHSHORTKEYHIGH"
  },
  {
    id: 5,
    text: "I often forget important dates or appointments.",
    domain: "Memory",
    key: "KEYLOWKEYLOWSHORTKEYNEUTRALKEYHIGHSHORTKEYHIGH"
  },
  {
    id: 6,
    text: "I can easily focus on a task even in a noisy environment.",
    domain: "Attention",
    key: "KEYLOWKEYLOWSHORTKEYNEUTRALKEYHIGHSHORTKEYHIGH"
  },
  {
    id: 7,
    text: "I take longer than others to complete tasks or assignments.",
    domain: "Processing Speed",
    key: "KEYLOWKEYLOWSHORTKEYNEUTRALKEYHIGHSHORTKEYHIGH"
  },
  {
    id: 8,
    text: "I struggle to see connections between different ideas or concepts.",
    domain: "Problem-Solving",
    key: "KEYLOWKEYLOWSHORTKEYNEUTRALKEYHIGHSHORTKEYHIGH"
  },
  {
    id: 9,
    text: "I can easily recall details from conversations I had days ago.",
    domain: "Memory",
    key: "KEYLOWKEYLOWSHORTKEYNEUTRALKEYHIGHSHORTKEYHIGH"
  },
  {
    id: 10,
    text: "I find it difficult to multitask effectively.",
    domain: "Attention",
    key: "KEYLOWKEYLOWSHORTKEYNEUTRALKEYHIGHSHORTKEYHIGH"
  },
  {
    id: 11,
    text: "I can quickly process and understand new information.",
    domain: "Processing Speed",
    key: "KEYLOWKEYLOWSHORTKEYNEUTRALKEYHIGHSHORTKEYHIGH"
  },
  {
    id: 12,
    text: "I enjoy tackling puzzles or brain teasers.",
    domain: "Problem-Solving",
    key: "KEYLOWKEYLOWSHORTKEYNEUTRALKEYHIGHSHORTKEYHIGH"
  },
  {
    id: 13,
    text: "I often need to re-read paragraphs to understand their meaning.",
    domain: "Memory",
    key: "KEYLOWKEYLOWSHORTKEYNEUTRALKEYHIGHSHORTKEYHIGH"
  },
  {
    id: 14,
    text: "I can maintain concentration on a task for long periods without breaks.",
    domain: "Attention",
    key: "KEYLOWKEYLOWSHORTKEYNEUTRALKEYHIGHSHORTKEYHIGH"
  },
  {
    id: 15,
    text: "I can quickly identify patterns in complex data or information.",
    domain: "Processing Speed",
    key: "KEYLOWKEYLOWSHORTKEYNEUTRALKEYHIGHSHORTKEYHIGH"
  },
  {
    id: 16,
    text: "I find it challenging to adapt my approach when faced with unexpected obstacles.",
    domain: "Problem-Solving",
    key: "KEYLOWKEYLOWSHORTKEYNEUTRALKEYHIGHSHORTKEYHIGH"
  },
  {
    id: 17,
    text: "I can easily remember and follow multi-step instructions.",
    domain: "Memory",
    key: "KEYLOWKEYLOWSHORTKEYNEUTRALKEYHIGHSHORTKEYHIGH"
  },
  {
    id: 18,
    text: "I often find my mind wandering during conversations.",
    domain: "Attention",
    key: "KEYLOWKEYLOWSHORTKEYNEUTRALKEYHIGHSHORTKEYHIGH"
  },
  {
    id: 19,
    text: "I can quickly organize my thoughts and express them clearly.",
    domain: "Processing Speed",
    key: "KEYLOWKEYLOWSHORTKEYNEUTRALKEYHIGHSHORTKEYHIGH"
  },
  {
    id: 20,
    text: "I'm good at breaking down complex problems into manageable steps.",
    domain: "Problem-Solving",
    key: "KEYLOWKEYLOWSHORTKEYNEUTRALKEYHIGHSHORTKEYHIGH"
  }
];

const options = [
  { value: 'strongly_disagree', label: 'Strongly Disagree', score: 1 },
  { value: 'disagree', label: 'Disagree', score: 2 },
  { value: 'neutral', label: 'Neutral', score: 3 },
  { value: 'agree', label: 'Agree', score: 4 },
  { value: 'strongly_agree', label: 'Strongly Agree', score: 5 }
];

const CognitiveAbilitiesAssessment = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (event) => {
    setAnswers({ ...answers, [currentQuestion]: event.target.value });
  };

  const goToNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateScores = () => {
    const domainScores = {
      Memory: 0,
      Attention: 0,
      'Processing Speed': 0,
      'Problem-Solving': 0
    };

    questions.forEach((question, index) => {
      const answer = answers[index];
      const score = options.find(option => option.value === answer)?.score || 0;
      const adjustedScore = question.id % 2 === 0 ? 6 - score : score; // Reverse score for even questions
      domainScores[question.domain] += adjustedScore;
    });

    // Convert raw scores to percentages
    Object.keys(domainScores).forEach(domain => {
      domainScores[domain] = (domainScores[domain] / 25) * 100; // 25 is the max score for each domain (5 questions * 5 max score)
    });

    return domainScores;
  };

  const getInterpretation = (scores) => {
    const interpretations = {};
    Object.entries(scores).forEach(([domain, score]) => {
      if (score >= 80) {
        interpretations[domain] = "Strong";
      } else if (score >= 60) {
        interpretations[domain] = "Average";
      } else {
        interpretations[domain] = "Needs Improvement";
      }
    });
    return interpretations;
  };

  const getDomainAdvice = (domain, level) => {
    const advice = {
      Memory: {
        Strong: "Your memory skills are excellent. Continue challenging yourself with memory games and learning new information to maintain this strength.",
        Average: "Your memory is functioning well. Consider using mnemonic devices and regular review of important information to further improve.",
        "Needs Improvement": "To enhance your memory, try techniques like chunking information, using visual aids, and practicing active recall."
      },
      Attention: {
        Strong: "You have a great ability to focus. Use this strength in tasks requiring sustained attention and help others develop their concentration skills.",
        Average: "Your attention skills are good. Try mindfulness exercises and minimize distractions in your environment to further improve focus.",
        "Needs Improvement": "Work on improving your attention by practicing mindfulness, breaking tasks into smaller chunks, and creating a distraction-free environment."
      },
      "Processing Speed": {
        Strong: "Your quick thinking is a valuable asset. Use this skill in time-sensitive tasks and decision-making processes.",
        Average: "Your processing speed is normal. Regular brain-training exercises and physical activity can help maintain and potentially improve this ability.",
        "Needs Improvement": "To increase your processing speed, try timed cognitive exercises, learn new skills, and ensure you're getting enough sleep and exercise."
      },
      "Problem-Solving": {
        Strong: "You excel at problem-solving. Seek out complex challenges and consider mentoring others in analytical thinking.",
        Average: "Your problem-solving skills are solid. Engage in puzzles, strategic games, and real-world problem-solving scenarios to further enhance this ability.",
        "Needs Improvement": "Improve your problem-solving skills by practicing brainstorming techniques, breaking down complex problems, and seeking diverse perspectives."
      }
    };
    return advice[domain][level];
  };

  const restartTest = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
  };

  if (showResults) {
    const scores = calculateScores();
    const interpretations = getInterpretation(scores);
    return (
      <Card>
        <CardHeader title="Cognitive Abilities Assessment Results" />
        <CardContent>
          {Object.entries(scores).map(([domain, score]) => (
            <Box key={domain} mb={2}>
              <Typography variant="h6">{domain}</Typography>
              <Typography>Score: {score.toFixed(2)}%</Typography>
              <Typography>Interpretation: {interpretations[domain]}</Typography>
              <Typography variant="body2">{getDomainAdvice(domain, interpretations[domain])}</Typography>
            </Box>
          ))}
          <Button onClick={restartTest} variant="contained" color="primary">
            Restart Test
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader 
        title="Cognitive Abilities Self-Assessment" 
        subheader={`Question ${currentQuestion + 1} of ${questions.length}`}
      />
      <CardContent>
        <Typography mb={2}>{questions[currentQuestion].text}</Typography>
        <FormControl component="fieldset">
          <RadioGroup value={answers[currentQuestion] || ''} onChange={handleAnswer}>
            {options.map((option) => (
              <FormControlLabel 
                key={option.value} 
                value={option.value} 
                control={<Radio />} 
                label={option.label} 
              />
            ))}
          </RadioGroup>
        </FormControl>
        <Box mt={2} display="flex" justifyContent="space-between">
          <Button onClick={goToPreviousQuestion} disabled={currentQuestion === 0}>
            Previous
          </Button>
          <Button 
            onClick={goToNextQuestion} 
            disabled={!answers[currentQuestion]}
            variant="contained" 
            color="primary"
          >
            {currentQuestion === questions.length - 1 ? 'Finish' : 'Next'}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CognitiveAbilitiesAssessment;
