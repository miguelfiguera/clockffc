import {create} from 'zustand'

export const sessionBreakStore= create((set)=>({
breakTimer:5,
session:25,
increaseSession:()=> set((state)=>({session: state.session + 1})),
decreaseSession:()=> set((state)=>({session: state.session - 1})),
noMoreIncrement:()=>set({session:60}),
noMoreDecrement:()=>set({session:1}),
increaseBreak:()=> set((state)=>({breakTimer: state.breakTimer + 1})),
decreaseBreak:()=> set((state)=>({breakTimer: state.breakTimer - 1})),
noMoreDBreak:()=>set({breakTimer:1}),
noMoreIBreak:()=>set({breakTimer:60})
}))