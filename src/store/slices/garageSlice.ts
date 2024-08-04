import { createSlice, PayloadAction, ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { Cat } from "@type/catsTypes";
import { Winners } from "@type/winnersTypes";
import { apiBuilder } from "../api/apiBuilder";

export interface GarageState {
  cats: Cat[];
  totalCount: number;
  error: string | null;
  currentPage: number;
  positions: Record<number, number>;
  winner: Winners | null;
  isRacing: Record<number, boolean>;
  stoppedCats: number[];
  startTime: Record<number, number>;
}

const initialState: GarageState = {
  cats: [],
  totalCount: 0,
  error: null,
  currentPage: 1,
  positions: {},
  winner: null,
  isRacing: {},
  stoppedCats: [],
  startTime: {},
};

const handleGetCatsFulfilled = (
  state: GarageState,
  action: PayloadAction<{ data: Cat[]; totalCount: number }>,
) => ({
  ...state,
  cats: action.payload.data,
  totalCount: action.payload.totalCount,
});

const handleAddCatFulfilled = (state: GarageState, action: PayloadAction<Cat>) => ({
  ...state,
  cats: [...state.cats, action.payload],
  totalCount: state.totalCount + 1,
});

const handleUpdateCatFulfilled = (state: GarageState, action: PayloadAction<Cat>) => ({
  ...state,
  cats: state.cats.map((cat) => (cat.id === action.payload.id ? action.payload : cat)),
});

const handleDeleteCatFulfilled = (state: GarageState, action: PayloadAction<number>) => ({
  ...state,
  cats: state.cats.filter((cat) => cat.id !== action.payload),
  totalCount: state.totalCount - 1,
});

const handleGetCatsMatchers = (builder: ActionReducerMapBuilder<GarageState>) => {
  builder
    .addMatcher(apiBuilder.endpoints.getCats.matchPending, (state) => state)
    .addMatcher(apiBuilder.endpoints.getCats.matchFulfilled, (state, action) => {
      const payload = action.payload as { data: Cat[]; totalCount: number };
      return handleGetCatsFulfilled(state, { payload, type: action.type });
    })
    .addMatcher(apiBuilder.endpoints.getCats.matchRejected, (state, action) => ({
      ...state,
      error: action.error.message || null,
    }));
};

const handleCatOperationsMatchers = (builder: ActionReducerMapBuilder<GarageState>) => {
  builder
    .addMatcher(apiBuilder.endpoints.addCat.matchFulfilled, (state, action) => {
      const payload = action.payload as Cat;
      return handleAddCatFulfilled(state, { payload, type: action.type });
    })
    .addMatcher(apiBuilder.endpoints.updateCat.matchFulfilled, (state, action) => {
      const payload = action.payload as Cat;
      return handleUpdateCatFulfilled(state, { payload, type: action.type });
    })
    .addMatcher(apiBuilder.endpoints.deleteCat.matchFulfilled, (state, action) => {
      const payload = action.payload as number;
      return handleDeleteCatFulfilled(state, { payload, type: action.type });
    });
};

const garageSlice = createSlice({
  name: "garage",
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<number>) => {
      return { ...state, currentPage: action.payload };
    },
    setPositions: (state, action: PayloadAction<Record<number, number>>) => {
      return { ...state, positions: action.payload };
    },
    setWinner: (state, action: PayloadAction<Winners | null>) => {
      return { ...state, winner: action.payload };
    },
    setIsRacing: (state, action: PayloadAction<Record<number, boolean>>) => {
      return { ...state, isRacing: { ...state.isRacing, ...action.payload } };
    },
    setStoppedCats: (state, action: PayloadAction<number[]>) => {
      return { ...state, stoppedCats: action.payload };
    },
    setStartTime: (state, action: PayloadAction<Record<number, number>>) => {
      return { ...state, startTime: { ...state.startTime, ...action.payload } };
    },
    resetIsRacing: (state) => {
      return {
        ...state,
        isRacing: Object.keys(state.isRacing).reduce(
          (acc, key) => {
            acc[Number(key)] = false;
            return acc;
          },
          {} as Record<number, boolean>,
        ),
      };
    },
  },
  extraReducers: (builder) => {
    handleGetCatsMatchers(builder);
    handleCatOperationsMatchers(builder);
  },
});

export const {
  setCurrentPage,
  setPositions,
  setWinner,
  setIsRacing,
  setStoppedCats,
  setStartTime,
  resetIsRacing,
} = garageSlice.actions;

const garageReducer = garageSlice.reducer;
export default garageReducer;
