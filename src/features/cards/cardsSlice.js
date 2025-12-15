import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    cards: {
        '123' : {
            id: '123',
            front: 'what is 1 + 1?',
            back: '2',
        }
    }
}

const cardsSlice = createSlice({
    name: 'cards',
    initialState: initialState,
    reducers: {
        addCard: (state, action) => {
            const {id, front, back, quizId} = action.payload;
            state.cards[id] = {
                id: id,
                front: front,
                back: back,
                quizId: quizId,

            }
        }
    }
})

// Selector to access all cards
export const selectCards = (state) => state.cards.cards;
// Selector to get specific card by ID
export const selectCardById = (id) => (state) => state.cards.cards[id];

// Export actions and reducer
export const { addCard} = cardsSlice.actions;

export default cardsSlice.reducer;