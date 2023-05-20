import {create} from 'zustand'

export const sessionBreakStore= create((set)=>({
breakTimer:5,
session:25,
seconds:0,
setSeconds:(ele)=>set({seconds:ele}),
setSession:(ele)=>set({session: ele}),
increaseSession:()=> set((state)=>({session: state.session + 1})),
decreaseSession:()=> set((state)=>({session: state.session - 1})),
increaseBreak:()=> set((state)=>({breakTimer: state.breakTimer + 1})),
decreaseBreak:()=> set((state)=>({breakTimer: state.breakTimer - 1})),
reset:()=>set({breakTimer:5,session:25,seconds:0})
}))