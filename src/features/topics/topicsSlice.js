import { createSlice } from "@reduxjs/toolkit";
import { ALL_ICONS } from "../../data/icons";

const initialState = {
    topics: {
        123456: {
            id: "123456",
            name: "Example Topic",
            icon: ALL_ICONS.find(icon => icon.name === "Book").url, // FIX 1: Add .url
            quizIds: ['quiz-123'], // FIX 2: Changed from [quiz] to [] (empty array)
        }
    }
}

export const topicsSlice = createSlice({
    name: "topics",
    initialState: initialState,
    reducers: {
        addTopic: (state, action) => {
            const { id, name, icon } = action.payload;
            state.topics[id] = { // FIX 3: Changed from state.topics[id] to state.topics[id]
                id: id,
                name: name,
                icon: icon,
                quizIds: [], // FIX 4: Changed from quizId to quizIds (plural)
            }
        },
        addQuizIdToTopic: (state, action ) => {
            const {topicId, quizId} = action.payload;
            const topic = state.topics[topicId];
            if (topic && !topic.quizIds.includes(quizId)) {
                topic.quizIds.push(quizId);
            }
        }
    }
})

// Selector to access all topic data
export const selectTopics = (state) => state.topics.topics;

// Export the action creator for dispatching addTopic actions
export const { addTopic, addQuizIdToTopic } = topicsSlice.actions;

// Export the reducer to be included in the store configuration
export default topicsSlice.reducer;