import { createSlice } from "@reduxjs/toolkit";

const userInfo = [
    {id: 1, name: "Prashant Mendhe", email: "prashant@gmail.com", password: "prashant@1324", role: "admin"},
    {id: 1, name: "Sonu Mendhe", email: "sonu@gmail.com", password: "sonu@1324", role: "user"}
]

const userSlice = createSlice(
    {
        name: "user",
        initialState: {
            user: userInfo,
            token: ""
        },
        reducers: {
            userDetails: (state,action)=>{
                state.user.push(action.payload);
            },
            updateToken: (state,action)=>{
                state.token = action.payload;
                localStorage.setItem("token",JSON.stringify(action.payload));
            }
        }
    }
)

export const { userDetails , updateToken} = userSlice.actions;
export default userSlice.reducer;