
import React from 'react';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { User, MessageSquare, ThumbsUp } from 'lucide-react';

interface Comment {
  id: number;
  user: string;
  content: string;
  likes: number;
  timestamp: string;
}

export const CommunityDiscussion = ({ symbol }: { symbol: string }) => {
  const [comments, setComments] = React.useState<Comment[]>([
    {
      id: 1,
      user: "InvestorPro",
      content: `${symbol} showing strong technical patterns. Looking bullish for next quarter.`,
      likes: 15,
      timestamp: "2h ago"
    },
    {
      id: 2,
      user: "TechAnalyst",
      content: "Keep an eye on the resistance level at $180.",
      likes: 8,
      timestamp: "4h ago"
    }
  ]);
  const [newComment, setNewComment] = React.useState("");

  const handleAddComment = () => {
    if (newComment.trim()) {
      const comment: Comment = {
        id: comments.length + 1,
        user: "CurrentUser",
        content: newComment,
        likes: 0,
        timestamp: "Just now"
      };
      setComments([comment, ...comments]);
      setNewComment("");
    }
  };

  const handleLike = (commentId: number) => {
    setComments(comments.map(comment => 
      comment.id === commentId 
        ? { ...comment, likes: comment.likes + 1 }
        : comment
    ));
  };

  return (
    <Card className="p-6 space-y-6">
      <div className="flex items-center gap-4">
        <MessageSquare className="w-8 h-8 text-blue-500" />
        <div>
          <h3 className="text-lg font-semibold">Community Discussion</h3>
          <p className="text-sm text-slate-400">{symbol} Trading Ideas</p>
        </div>
      </div>

      <div className="flex gap-4">
        <Input
          placeholder="Share your analysis..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <Button onClick={handleAddComment}>Post</Button>
      </div>

      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="p-4 rounded-lg bg-slate-800/50">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span className="font-medium">{comment.user}</span>
              </div>
              <span className="text-sm text-slate-400">{comment.timestamp}</span>
            </div>
            <p className="text-sm mb-2">{comment.content}</p>
            <button
              onClick={() => handleLike(comment.id)}
              className="flex items-center gap-1 text-sm text-slate-400 hover:text-blue-500"
            >
              <ThumbsUp className="w-4 h-4" />
              <span>{comment.likes}</span>
            </button>
          </div>
        ))}
      </div>
    </Card>
  );
};
