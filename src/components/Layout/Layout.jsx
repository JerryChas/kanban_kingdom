import { useState, useEffect } from "react";
import { Route, Routes, Link } from "react-router-dom";
import Board from "../Board/Board";
import Welcome from "../Welcome/Welcome";
import UserPage from "../UserPage/UserPage";
import SettingsPage from "../SettingsPage/SettingsPage";
import { useSelector, useDispatch } from "react-redux";
import InfoPage from "../InfoPage/InfoPage";
import { addBoard, setBoards } from "../../slices/BoardSlice";
import "../../App.css";

const Layout = ({ handleOpenModal }) => {
  const [activeBoardId, setActiveBoardId] = useState(""); // Store the ID of the active board
  const [asideIsCollapsed, setAsideIsCollapsed] = useState(false);
  const [input, setInput] = useState(""); // Input value for new board title

  const dispatch = useDispatch();

  useEffect(() => {
    // Retrieve data from localStorage
    const storedBoards =
      JSON.parse(localStorage.getItem("boards"))?.boards || [];

    // Check if any boards are stored in local storage
    if (Array.isArray(storedBoards) && storedBoards.length > 0) {
      // Update Redux state with the boards from local storage
      dispatch(setBoards(storedBoards));
    }
  }, [dispatch]);

  const handleActiveBoard = (id) => {
    setActiveBoardId(id); // Set the ID of the active board
  };

  const handleAddBoard = (e) => {
    e.preventDefault();
    if (!input.trim()) return; // Prevent adding empty board titles
    dispatch(addBoard(input));
    setInput(""); // Reset input field
  };

  function handleAsideCollapse() {
    setAsideIsCollapsed((prev) => !prev);
  }
  // Get boards from Redux state
  const boards = useSelector((state) => state.boards);
  // const board = boards.find((board) => board.id === activeBoardId);

  return (
    <div className="container">
      <aside className={`board_menu ${asideIsCollapsed ? "is_collapsed" : ""}`}>
        <p className={`${asideIsCollapsed ? "hide" : ""}`}>» Boards</p>

        <ul className={`${asideIsCollapsed ? "hide" : ""}`}>
          {boards?.map((board) => (
            <Link
              onClick={() => handleActiveBoard(board.id)}
              to={`/boards/${board.id}`}
              className="route_link"
              key={board.id}>
              <li
                className={`${
                  activeBoardId === board.id ? "route_link_active" : undefined
                } ${asideIsCollapsed ? "hide" : ""}`}>
                <span className="active_span">{board.title}</span>
                {/* <span className="board_list_buttons">×</span> */}
              </li>
            </Link>
          ))}
        </ul>
        <form
          onSubmit={handleAddBoard}
          className={`${asideIsCollapsed ? "hide" : ""}`}>
          <input
            type="text"
            id="boardTitle"
            placeholder="Add a board..."
            value={input}
            maxLength="17"
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit" disabled={input.length < 5}>
            {" "}
            +{" "}
          </button>
        </form>
      </aside>
      <Routes>
        <Route
          path="/"
          element={
            <Welcome
              toggleCollapse={handleAsideCollapse}
              asideIsCollapsed={asideIsCollapsed}
            />
          }
        />
        <Route
          path="/boards/:boardId"
          element={
            <Board
              handleOpenModal={handleOpenModal}
              toggleCollapse={handleAsideCollapse}
              asideIsCollapsed={asideIsCollapsed}
            />
          }
        />
        <Route
          path="/users"
          element={
            <UserPage
              toggleCollapse={handleAsideCollapse}
              asideIsCollapsed={asideIsCollapsed}
            />
          }
        />
        <Route
          path="/settings"
          element={
            <SettingsPage
              toggleCollapse={handleAsideCollapse}
              asideIsCollapsed={asideIsCollapsed}
            />
          }
        />
        <Route
          path="/info"
          element={
            <InfoPage
              toggleCollapse={handleAsideCollapse}
              asideIsCollapsed={asideIsCollapsed}
            />
          }
        />
      </Routes>
    </div>
  );
};

export default Layout;
