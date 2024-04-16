import Header from "./components/Header";
import Board from "./components/Board";
import "./css/draft-style.css";

function App() {
const boards = [
  {
    id: 1,
    title: "Bajs board 1",
    dateCreated: "",
    columns: [
      {
        id: 1,
        title: "todo",
        stories: [
          {
            id: 1,
            title: "story 1",
            content: "",
            deadLine: "",
            dueDate: "",
            isUrgent: false,
            userOwnership: [],
            tasks: [
              {
                id: 1,
                title: "task 1",
                content: "",
                category: "",
                deadLine: "",
                dueDate: "",
                isUrgent: false,
                isCompleted: false,
                userOwnership: [],
              },
              {
                id: 4,
                title: "task 1",
                content: "",
                category: "",
                deadLine: "",
                dueDate: "",
                isUrgent: false,
                isCompleted: false,
                userOwnership: [],
              },
              {
                id: 5,
                title: "task 1",
                content: "",
                category: "",
                deadLine: "",
                dueDate: "",
                isUrgent: false,
                isCompleted: false,
                userOwnership: [],
              },
            ],
          },
        ],
      },
      {
        id: 2,
        title: "doing",
        stories: [
          {
            id: 2,
            title: "story 2",
            content: "",
            deadLine: "",
            dueDate: "",
            isUrgent: false,
            userOwnership: [],
            tasks: [
              {
                id: 2,
                title: "task 2",
                content: "",
                category: "",
                deadLine: "",
                dueDate: "",
                isUrgent: false,
                isCompleted: false,
                userOwnership: [],
              },
            ],
          },
        ],
      },
      {
        id: 3,
        title: "done",
        stories: [
          {
            id: 3,
            title: "story 3",
            content: "",
            deadLine: "",
            dueDate: "",
            isUrgent: false,
            userOwnership: [],
            tasks: [
              {
                id: 3,
                title: "task 3",
                content: "",
                category: "",
                deadLine: "",
                dueDate: "",
                isUrgent: false,
                isCompleted: false,
                userOwnership: [],
              },
            ],
          },
        ],
      },
    ],
  },
];

const handleSubmit = () => {

};

  return (
    <>
      <Header />
      <form action="submit" onSubmit={handleSubmit} >
        <label htmlFor="boardTitle">Add Title</label>
        <input type="text" id="boardTitle"/>
        <button onClick={handleSubmit} >Add Board</button>
      </form>
      {boards.length !== 0 && <Board columns={boards[0].columns} board={boards[0]} />}
      
    </>
  )
}

export default App
