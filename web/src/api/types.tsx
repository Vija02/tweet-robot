export type SingleTweetData = {
  text: string;
};
export type TweetDraftData = SingleTweetData[];

export type TweetDraft = {
  id: number;
  data: TweetDraftData;
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
