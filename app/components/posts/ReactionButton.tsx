import { useDispatch } from "react-redux";
import { reactionAdded, Post } from "@/app/redux/features/posts/postsSlice"; // Import Post

// Define reaction emojis with correct keys
const reactionEmoji: Record<keyof Post["reactions"], string> = {
  thumbsUp: "👍",
  wow: "😲",
  heart: "💖",
  rocket: "🚀",
  coffee: "☕",
};

// Define props for the component
interface ReactionButtonProps {
  post: Post;
}

const ReactionButton: React.FC<ReactionButtonProps> = ({ post }) => {
  const dispatch = useDispatch();

  return (
    <div className="flex space-x-2">
      {Object.entries(reactionEmoji).map(([name, emoji]) => {
        const reactionKey = name as keyof Post["reactions"];

        return (
          <button
            type="button"
            key={name}
            onClick={() => {
              dispatch(
                reactionAdded({ postId: post.id, reaction: reactionKey })
              );
            }}
            className="m-1 px-2 py-1 border rounded"
          >
            {emoji} {post.reactions[reactionKey]}
          </button>
        );
      })}
    </div>
  );
};

export default ReactionButton;
