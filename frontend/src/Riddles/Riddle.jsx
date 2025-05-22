import RiddleCard from './RiddleCard'
import "./style.css";

const riddles = [
  {
    title: "Riddle #1",
    riddle: "What has to be broken before you can use it?",
    hint: "It's something you eat for breakfast...",
    answer: "An egg",
  },
  {
    title: "Riddle #2",
    riddle: "I’m tall when I’m young, and I’m short when I’m old. What am I?",
    hint: "It provides light...",
    answer: "A candle",
  },
  {
    title: "Riddle #3",
    riddle: "What gets wet while drying?",
    hint: "Found in bathrooms...",
    answer: "A towel",
  },
  {
    title: "Riddle #4",
    riddle: "What can you catch, but not throw?",
    hint: "It's related to health...",
    answer: "A cold",
  },
  {
    title: "Riddle #5",
    riddle: "What has a head, a tail, is brown, and has no legs?",
    hint: "It’s money...",
    answer: "A penny",
  },
  {
    title: "Riddle #6",
    riddle: "What has many keys but can’t open a single lock?",
    hint: "A musical instrument...",
    answer: "A piano",
  },
  {
    title: "Riddle #7",
    riddle: "What has hands but can’t clap?",
    hint: "It tells time...",
    answer: "A clock",
  },
  {
    title: "Riddle #8",
    riddle: "What can travel around the world while staying in the same corner?",
    hint: "It’s used on envelopes...",
    answer: "A stamp",
  },
  {
    title: "Riddle #9",
    riddle: "What has an eye but cannot see?",
    hint: "Often found in nature...",
    answer: "A needle",
  },
  {
    title: "Riddle #10",
    riddle: "What invention lets you look right through a wall?",
    hint: "Used in every house...",
    answer: "A window",
  }
];

function Riddle() {
  return (
    <div className="app">
      <header>
        <h1>Riddles Game Hub</h1>
        <p className="subtitle">Click any card to flip and reveal the answer!</p>
      </header>

      <div className="riddles-container">
        {riddles.map((riddle, idx) => (
          <RiddleCard key={idx} {...riddle} />
        ))}
      </div>
    </div>
  );
}

export default Riddle;
