import { createSlice, nanoid } from '@reduxjs/toolkit';
import { getTimeStamp } from '../assets/GlobalAssets';

const initialState = [];

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    setBoards: (state, action) => {
      return action.payload;
    },
    addBoard: (state, action) => {
      const board = {
        id: nanoid(),
        title: action.payload,
        dateCreated: getTimeStamp(),
        columns: [],
      };
      state.push(board);
      localStorage.setItem('boards', JSON.stringify(state));
    },
    removeBoard: (state, action) => {
      const boardToRemove = action.payload;
      const index = state.findIndex((board) => board.id === boardToRemove.id);
      if (index !== -1) {
        state.splice(index, 1);
        localStorage.setItem('boards', JSON.stringify(state)); // Update localStorage
      }
    },
    addColumn: (state, action) => {
      const { title, boardId } = action.payload;
      const boardIndex = state.findIndex((board) => board.id === boardId);
      if (boardIndex !== -1) {
        const column = {
          id: nanoid(),
          title: title,
          dateCreated: getTimeStamp(),
          stories: [],
        };
        state[boardIndex].columns.push(column);
      }
      localStorage.setItem('boards', JSON.stringify(state)); // Update localStorage
    },

    removeColumn: (state, action) => {
      // Hämta boardId och columnId från åtgärdens payload
      const { boardId, columnId } = action.payload;
      // Hitta index för board baserat på boardId
      const boardIndex = state.findIndex((board) => board.id === boardId);
      // Kontrollera om boarden finns
      if (boardIndex !== -1) {
        // Filtrera kolumnen från boarden
        state[boardIndex].columns = state[boardIndex].columns.filter(
          // Jämför kolumnens id med den angivna columnId för att filtrera bort den
          (column) => column.id !== columnId
        );
        // Uppdatera localStorage med den uppdaterade Redux-state
        localStorage.setItem('boards', JSON.stringify(state));
      }
    },

    addStory: (state, action) => {
      const { title, columnId, boardId } = action.payload;
      const boardIndex = state.findIndex((board) => board.id === boardId);
      const columnIndex = state[boardIndex].columns.findIndex(
        (column) => column.id === columnId
      );
      if (columnIndex !== -1 && boardIndex !== -1) {
        const story = {
          id: nanoid(),
          title: title,
          content: '',
          dateCreated: getTimeStamp(),
          deadLine: '',
          dueDate: '',
          isUrgent: false,
          userOwnership: [],
          tasks: [],
        };

        state[boardIndex].columns[columnIndex].stories.push(story);
        localStorage.setItem('boards', JSON.stringify(state)); // Update localStorage
      }
    },

    editStoryName: (state, action) => {
      const { storyName, storyId, columnId } = action.payload;
      const boardIndex = state.findIndex((board) =>
        board.columns.some((column) => column.id === columnId)
      );
      if (boardIndex !== -1) {
        // Hitta index för kolumnen baserat på columnId inom den hittade boarden
        const columnIndex = state[boardIndex].columns.findIndex(
          (column) => column.id === columnId
        );
        if (columnIndex !== -1) {
          // Hitta index för berättelsen baserat på storyId inom den hittade kolumnen
          const storyIndex = state[boardIndex].columns[
            columnIndex
          ].stories.findIndex((story) => story.id === storyId);
          if (storyIndex !== -1) {
            // Uppdatera titeln för den hittade berättelsen
            state[boardIndex].columns[columnIndex].stories[storyIndex].title =
              storyName;

            // Uppdatera localStorage med den uppdaterade Redux-state
            localStorage.setItem('boards', JSON.stringify(state));
          }
        }
      }
    },

    removeStory: (state, action) => {
      const { columnId, storyId } = action.payload;
      // Hitta index för board baserat på boardId
      const boardIndex = state.findIndex((board) =>
        board.columns.some((column) => column.id === columnId)
      );
      if (boardIndex !== -1) {
        // Hitta index för kolumnen baserat på columnId inom den hittade boarden
        const columnIndex = state[boardIndex].columns.findIndex(
          (column) => column.id === columnId
        );
        if (columnIndex !== -1) {
          // Filtrera bort storyn från den hittade kolumnen
          state[boardIndex].columns[columnIndex].stories = state[
            boardIndex
          ].columns[columnIndex].stories.filter(
            (story) => story.id !== storyId
          );
          // Uppdatera localStorage med den uppdaterade Redux-state
          localStorage.setItem('boards', JSON.stringify(state));
        }
      }
    },

    addTask: (state, action) => {
      const { title, columnId, boardId, storyId } = action.payload;
      const boardIndex = state.findIndex((board) => board.id === boardId);
      const columnIndex = state[boardIndex].columns.findIndex(
        (column) => column.id === columnId
      );
      const storyIndex = state[boardIndex].columns[
        columnIndex
      ].stories.findIndex((story) => story.id === storyId);
      if (columnIndex !== -1 && boardIndex !== -1 && storyIndex !== -1) {
        const task = {
          id: nanoid(),
          title: title,
          content: '',
          dateCreated: '',
          categories: [],
          deadLine: '',
          dueDate: '',
          isUrgent: false,
          isCompleted: false,
          userOwnership: [],
        };

        state[boardIndex].columns[columnIndex].stories[storyIndex].tasks.push(
          task
        );
        localStorage.setItem('boards', JSON.stringify(state)); // Update localStorage
      }
    },
    removeTask: (state, action) => {
      const { boardId, columnId, storyId, taskId } = action.payload;
      const boardIndex = state.findIndex((board) => board.id === boardId);
      if (boardIndex !== -1) {
        const columnIndex = state[boardIndex].columns.findIndex(
          (column) => column.id === columnId
        );
        if (columnIndex !== -1) {
          const storyIndex = state[boardIndex].columns[
            columnIndex
          ].stories.findIndex((story) => story.id === storyId);
          if (storyIndex !== -1) {
            state[boardIndex].columns[columnIndex].stories[storyIndex].tasks =
              state[boardIndex].columns[columnIndex].stories[
                storyIndex
              ].tasks.filter((task) => task.id !== taskId);
          }
        }
      }
      localStorage.setItem('boards', JSON.stringify(state));
    },

    editBoardName: (state, action) => {
      const { boardName, boardId } = action.payload;
      const boardIndex = state.findIndex((board) => board.id === boardId);
      state[boardIndex].title = boardName;
    },

    editTask: (state, action) => {
      const { boardId, columnId, storyId, taskId, editedTask } = action.payload;
      return state.map((board) => {
        if (board.id !== boardId) {
          return board;
        }
        return {
          ...board,
          columns: board.columns.map((column) => {
            if (column.id !== columnId) {
              return column;
            }
            return {
              ...column,
              stories: column.stories.map((story) => {
                if (story.id !== storyId) {
                  return story;
                }
                return {
                  ...story,
                  tasks: story.tasks.map((task) => {
                    if (task.id !== taskId) {
                      return task;
                    }
                    return {
                      ...task,
                      ...editedTask,
                    };
                  }),
                };
              }),
            };
          }),
        };
      });
      localStorage.setItem('boards', JSON.stringify(state));
    },
    moveStory: (state, action) => {
      const { boardId, columnId, storyId } = action.payload;

      const boardIndex = state.findIndex((board) => board.id === boardId);
      if (boardIndex === -1) return;

      const fromColumnIndex = state[boardIndex].columns.findIndex((column) =>
        column.stories.some((story) => story.id === storyId)
      );
      if (fromColumnIndex === -1) return;

      const storyIndex = state[boardIndex].columns[
        fromColumnIndex
      ].stories.findIndex((story) => story.id === storyId);
      if (storyIndex === -1) return;

      const [movedStory] = state[boardIndex].columns[
        fromColumnIndex
      ].stories.splice(storyIndex, 1);

      const toColumnIndex = state[boardIndex].columns.findIndex(
        (column) => column.id === columnId
      );
      if (toColumnIndex === -1) return;

      state[boardIndex].columns[toColumnIndex].stories.push(movedStory);

      localStorage.setItem('boards', JSON.stringify(state)); // Update localStorage
    },
  },
});

export const {
  setBoards,
  addBoard,
  removeBoard,
  addColumn,
  removeColumn,
  addTask,
  editTask,
  removeTask,
  addStory,
  editStoryName,
  removeStory,
  moveStory,
  editBoardName,
} = boardSlice.actions;
export default boardSlice.reducer;
