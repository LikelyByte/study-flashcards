import { createSlice } from "@reduxjs/toolkit";
import { ALL_ICONS } from "../../data/icons";

const initialState = {
    topics: {
        123456: {
            id: "123456",
            name: "Example Topic",
            icon: ALL_ICONS.find(icon => icon.name === "Book"),
            quizIds: [],
        }
    }
}

export const topicsSlice = createSlice({
    name: "topics",
    initialState: initialState,
    reducers: {
        addTopic: (state, action) => {
            const { id, name, icon } = action.payload;
            state.topics[id]  = {
                id: id,
                name: name,
                icon: icon,
                quizId: [],
            }
        }
    }
})

// Selector to access all topic data
export const selectTopics = (state) => state.topics.topics;

//Export the actin creator for dispatching addTopic actions
export const {addTopic} = topicsSlice.actions;

// Export the reducer to be included in the store configuration
export default topicsSlice.reducer;