import {
  createSlice,
  nanoid,
  PayloadAction,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import { RootState } from "@/app/store";
import { sub } from "date-fns";
import axios from 'axios'

const POST_URL = `https://jsonplaceholder.typicode.com/posts`

const initialState: InitialState = {
  posts: [
    {
      id: "1",
      title: "Learning Redux ToolKit",
      content: "I've heard good things.",
      userId: "",
      date: sub(new Date(), { minutes: 10 }).toISOString(),
      reactions: {
        thumbsUp: 0,
        wow: 0,
        heart: 0,
        rocket: 0,
        coffee: 0,
      },
    },
    {
      id: "2",
      title: "Slices...",
      content: "The more I slice, the more I want pizza.",
      userId: "",
      date: sub(new Date(), { minutes: 5 }).toISOString(),
      reactions: {
        thumbsUp: 0,
        wow: 0,
        heart: 0,
        rocket: 0,
        coffee: 0,
      },
    },
  ],
  status: "idle", //'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

interface Reactions {
  thumbsUp: number;
  wow: number;
  heart: number;
  rocket: number;
  coffee: number;
}

interface InitialState {
  posts: Post[];
  status: string;
  error: string | null;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  userId: string;
  date: string;
  reactions: Reactions;
}

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const res = await axios.get(POST_URL)
  return [...res.data]
})

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action: PayloadAction<Post>) {
        state.posts.push(action.payload);
      },
      prepare(title: string, content: string, userId: string) {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
            date: new Date().toISOString(),
            userId,
            reactions: {
              thumbsUp: 0,
              wow: 0,
              heart: 0,
              rocket: 0,
              coffee: 0,
            },
          },
        };
      },
    },
    reactionAdded(
      state,
      action: PayloadAction<{ postId: string; reaction: keyof Reactions }>
    ) {
      const { postId, reaction } = action.payload;
      const existingPost = state.posts.find((post) => post.id === postId);
      if (existingPost) {
          existingPost.reactions[reaction] = existingPost.reactions[reaction] ? 0 : 1
      }
    },
  },
});

export const selectAllPost = (state: RootState) => state.posts.posts;
export const { postAdded, reactionAdded } = postSlice.actions;
export default postSlice.reducer;
