import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Column from "../Column/Column";
import { addColumn, editBoardName } from "../../slices/BoardSlice";
import css from "./Board.module.css";
import { useParams } from "react-router-dom";
import { FaTrello, FaStream } from "react-icons/fa";
import "./Listview.css";
import ListPage from "./ListPage";

const Board = ({ handleOpenModal, toggleCollapse, asideIsCollapsed }) => {
  const { boardId } = useParams();
  const focusBoardNameEdit = useRef(null);
  const boards = useSelector((state) => state.boards);

  // Find the board using the parsed boardId as a string
  const board = boards.find((board) => board.id === boardId);
  const [input, setInput] = useState("");
  const [isListview, setIsListview] = useState(false);
  const [isEditingBoardName, setIsEditingBoardName] = useState(false);
  const dispatch = useDispatch();

  const handleListviewClick = (e) => {
    e.preventDefault();
    setIsListview(!isListview);
    console.log(isListview);
  };

  const handleAddColumn = (e) => {
    e.preventDefault();
    dispatch(addColumn({ title: input, boardId: board.id }));
    setInput("");
  };

  function handleBoardNameChange(e) {
    dispatch(editBoardName({ boardName: e.target.value, boardId: board.id }));
  }

  function handleToggleBoardNameEdit() {
    setIsEditingBoardName((prev) => !prev);
    if (focusBoardNameEdit.current) {
      focusBoardNameEdit.current.focus();
    }
  }

  function handleKeyPress(e) {
    if (e.key === "Enter") handleToggleBoardNameEdit();
  }

  useEffect(() => {
    if (focusBoardNameEdit.current) {
      focusBoardNameEdit.current.focus();
    }
  }, [isEditingBoardName]);

  if (!board) {
    // Handle case when board is not found
    return <div style={{ padding: "10px 20px 20px 20px" }}>Loading...</div>;
  }

  return (
    <main className={css.board}>
      {/* <div className={css.board_header}> */}
      <div
        className={`${css.board_header} ${
          asideIsCollapsed ? "full_width" : ""
        }`}
      >
        <div className={css.left_side}>
          <button
            className="collapse_button no_margin"
            onClick={toggleCollapse}
          >
            {asideIsCollapsed ? ">" : "<"}
          </button>
          {isEditingBoardName ? (
            <input
              type="text"
              className={css.boardname_edit_input}
              onChange={handleBoardNameChange}
              onKeyDown={handleKeyPress}
              value={board.title}
              ref={focusBoardNameEdit}
            />
          ) : (
            <h2 onClick={handleToggleBoardNameEdit}>{board.title}</h2>
          )}
        </div>
        <form onSubmit={handleAddColumn}>
          <input
            type="text"
            id="columnTitle"
            placeholder="Add a Column..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit" disabled={input.length < 5}>
            {" "}
            +{" "}
          </button>
        </form>
        <button
          className="listBtn"
          onClick={handleListviewClick}
          style={{ color: "blue", marginLeft: "2rem" }}
        >
          {!isListview ? (
            <FaTrello style={{ color: "blue" }} />
          ) : (
            <FaStream style={{ color: "blue" }} />
          )}
        </button>
      </div>

      {!isListview ? (
        <div className={css.column_container}>
          {board.columns.map((column) => (
            <Column
              handleOpenModal={handleOpenModal}
              key={column.id}
              stories={column.stories}
              board={board}
              columns={board.columns}
              column={column}
            />
          ))}
        </div>
      ) : (
        <ListPage board={board} handleOpenModal={handleOpenModal} />
      )}
      {/* <div className={css.column_container}>
        {board.columns.map((column) => (
          <Column
            handleOpenModal={handleOpenModal}
            key={column.id}
            stories={column.stories}
            board={board}
            column={column}
          />
        ))}
      </div> */}
    </main>
  );
};

export default Board;
