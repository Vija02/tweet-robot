use crate::db;
use chrono::prelude::*;
use rocket::serde::{json::Json, Deserialize, Serialize};
use rusqlite::params;

#[derive(Debug, Serialize, Deserialize)]
pub struct TweetDrafts {
  id: usize,
  data: serde_json::Value,
  created_at: NaiveDateTime,
  updated_at: NaiveDateTime,
}

#[get("/api/tweet_drafts")]
pub fn get_tweet_drafts() -> Json<Vec<TweetDrafts>> {
  let conn = db::get_db_connection().unwrap();

  let stmt = &mut conn
    .prepare("SELECT id, data, created_at, updated_at FROM tweet_drafts")
    .unwrap();

  // Run the query and map into the struct
  let tweet_drafts = stmt
    .query_map([], |row| {
      Ok(TweetDrafts {
        id: row.get(0)?,
        data: serde_json::from_str(&row.get::<usize, String>(1)?).unwrap(),
        created_at: NaiveDateTime::parse_from_str(
          &row.get_unwrap::<usize, String>(2),
          "%Y-%m-%d %H:%M:%S",
        )
        .unwrap(),
        updated_at: NaiveDateTime::parse_from_str(
          &row.get_unwrap::<usize, String>(3),
          "%Y-%m-%d %H:%M:%S",
        )
        .unwrap(),
      })
    })
    .unwrap();

  Json(
    tweet_drafts
      .map(|x| x.unwrap())
      .collect::<Vec<TweetDrafts>>(),
  )
}

#[derive(Debug, Serialize, Deserialize)]
pub struct PostTweetDraftsInput {
  // This data should be a JSON array that contains objects that will be sent to the Twitter API
  // Eg: [{"text": "Hello World!"}]
  // If there are multiple object in the array, we will create a thread
  data: String,
}
#[derive(Debug, Serialize, Deserialize)]
pub struct PostTweetDraftsResponse {
  id: usize,
}

#[post("/api/tweet_drafts", format = "json", data = "<tweet_draft>")]
pub fn post_tweet_drafts(tweet_draft: Json<PostTweetDraftsInput>) -> Json<PostTweetDraftsResponse> {
  let conn = db::get_db_connection().unwrap();

  let json_string_data = &tweet_draft.data;

  let added_tweet = conn
    .query_row(
      "INSERT INTO tweet_drafts (data) VALUES (?1) RETURNING id",
      params![json_string_data],
      |row| {
        Ok(PostTweetDraftsResponse {
          id: row.get::<usize, usize>(0)?,
        })
      },
    )
    .unwrap();

  Json(added_tweet)
}

#[derive(Debug, Serialize, Deserialize)]
pub struct PutTweetDraftsInput {
  data: String,
}

#[put("/api/tweet_drafts?<id>", format = "json", data = "<tweet_draft>")]
pub fn put_tweet_drafts(id: usize, tweet_draft: Json<PutTweetDraftsInput>) -> String {
  let conn = db::get_db_connection().unwrap();

  let json_string_data = &tweet_draft.data;

  conn
    .execute(
      "UPDATE tweet_drafts SET data=?1, updated_at=datetime('now') WHERE id=?2",
      params![json_string_data, id],
    )
    .unwrap();

  format!("Ok")
}

#[delete("/api/tweet_drafts?<id>")]
pub fn delete_tweet_drafts(id: usize) -> String {
  let conn = db::get_db_connection().unwrap();

  conn
    .execute("DELETE FROM tweet_drafts WHERE id=?1", params![id])
    .unwrap();

  format!("Ok")
}
