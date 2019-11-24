import * as React from "react";

const initialState: any = {
    categories: {}
};

export default function Categories(state = initialState, action) {
    switch (action.type) {
        case 'TEST':
            console.log(action.payload);
            return {
                ...state,
            };


        default:
            return state;
    }
}
