const Name = "Hrithik";
const Description1 =
  "It actually started as a fun little experiment. I was curious about how games work, so I tried building one myself — a simple 2D space shooter using GameMaker Studio 🚀.";
const Description2 =
  "Destroy incoming meteorites before they hit your ship 💥🪐. Simple, fun, and the start of my dev journey! 🎮";

const about = {
  Conversation: [
    { side: "left", text: "Hey there! How’s it going? 😊" },
    { side: "right", text: "Hi! Who am I speaking to? 🤔" },
    {
      side: "left",
      text: `Oh right, forgot to introduce myself — I’m ${Name} 😄`,
    },
    { side: "right", text: "Ah, the Code Wizard! 🧙‍💻" },
    {
      side: "left",
      text: "Haha nope! just your friendly neighborhood developer 💻",
    },
    { side: "right", text: "Nice to meet you, Hrithik! 👋" },
    { side: "right", text: "So what got you into software development?" },
    { side: "left", text: Description1 },
    { side: "right", text: "That sounds awesome!" },
    { side: "right", text: "What was the game about?" },
    { side: "left", text: Description2 },
    { side: "right", text: "That’s actually really cool. 🚀" },
    { side: "left", text: "Thanks! Appreciate it 😊" },
  ],
};

export default about;
