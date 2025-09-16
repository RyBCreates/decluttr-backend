module.exports = [
  {
    _id: "hot-garbage",
    name: "Hot Garbage",
    type: "streak",
    task: "Log in 7 days in a row",
    goal: 7,
    reward: { gems: 20 },
  },
  {
    _id: "clean-sweep",
    name: "Clean Sweep",
    type: "task_count",
    task: "Finish 5 tasks in 1 day",
    goal: 5,
    reward: { badge: "Clean Sweep Badge" },
  },
  {
    _id: "new-you",
    name: "New You",
    type: "task_count",
    task: "Finish 3 tasks",
    goal: 3,
    reward: { gems: 5 },
  },
  {
    _id: "master-cleaner",
    name: "Master Cleaner",
    type: "task_count",
    task: "Finish 100 tasks",
    goal: 100,
    reward: { badge: "Master Cleaner Badge" },
  },
];
