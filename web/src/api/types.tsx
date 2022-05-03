export type TweetDraft = {
  id: number;
  data: Record<string, any>;
  created_at: Date;
  updated_at: Date;
};

export type TweetSchedule = {
  id: number;
  tweet_draft_id: number;
  date_scheduled: Date;
  created_at: Date;
  updated_at: Date;
};
