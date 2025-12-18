import { createSlice} from '@reduxjs/toolkit';

const initialState = {
    quizzes: {
        'quiz-123' : {
            id: 'quiz-123',
            name: 'Math Basics',
            topicId: 'topic-234',
            cardIds: ['card-1', '123']
        }
    }
}

export const quizzesSlice = createSlice({
    name: 'quizzes',
    initialState: initialState,
    reducers: {
        addQuiz: (state, action ) => {
            const {id, name, topicId, cardIds = []} = action.payload;
            state.quizzes[id] = {
                id: id,
                name: name, 
                topicId: topicId,
                cardIds: cardIds,
            }
        }
    }
})

//Export Selector
export const selectQuizzes = (state) => state.quizzes.quizzes;

//Export actions and reducer
export const {addQuiz} = quizzesSlice.actions;
export default quizzesSlice.reducer;