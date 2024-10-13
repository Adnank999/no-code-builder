import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface TextElement {
  id: number;
  type: string;
  text: string;
  fontSize: number;
  alignment: "left" | "center" | "right";
  color: string;
  lineHeight: number;
  fontFamily: string;
  fontStyle: string;
  lineSpacing: number;
}

export interface ImageElement {
  id: number;
  type: string;
  src: string;
  width: number;
  height: number;
  rotation: string;
  position: string;
}

export type Element = TextElement | ImageElement;

interface ElementsState {
  elements: Element[];
}

const initialState: ElementsState = {
  elements: [],
};

const elementsSlice = createSlice({
  name: 'elements',
  initialState,
  reducers: {
    updateTextProperties: (state, action: PayloadAction<TextElement>) => {
      const elementIndex = state.elements.findIndex((el) => el.id === action.payload.id);
      if (elementIndex !== -1) {
        state.elements[elementIndex] = action.payload;
      } else {
        state.elements.push(action.payload); 
      }
    },

    addImage: (state, action: PayloadAction<ImageElement>) => {
      state.elements.push(action.payload); 
    },

    updateImageProperties: (state, action: PayloadAction<ImageElement>) => {
      const elementIndex = state.elements.findIndex((el) => el.id === action.payload.id);
      if (elementIndex !== -1) {
        state.elements[elementIndex] = {
          ...state.elements[elementIndex],
          ...action.payload, 
        };
      }
    },

    removeElement: (state, action: PayloadAction<number>) => {
      state.elements = state.elements.filter((element) => element.id !== action.payload);
    },
  },
});

export const { updateTextProperties, addImage, removeElement,updateImageProperties } = elementsSlice.actions;
export default elementsSlice.reducer;
