use crate::db;
use chrono::prelude::*;
use rocket::serde::{json::Json, Deserialize, Serialize};
use rusqlite::params;

#[derive(Debug, Serialize, Deserialize)]
pub struct TweetSchedules {
  id: usize,
  tweet_draft_id: usize,
  date_scheduled: NaiveDateTime,
  created_at: NaiveDateTime,
  updated_at: NaiveDateTime,
}

#[get("/api/tweet_schedules")]
pub fn get_tweet_schedules() -> Json<Vec<TweetSchedules>> {
  let conn = db::get_db_connection().unwrap();

  let stmt = &mut conn
    .prepare("SELECT id, tweet_draft_id, date_scheduled, created_at, updated_at FROM tweet_schedules")
    .unwrap();

  // Run the query and map into the struct
  let tweet_schedules = stmt
    .query_map([], |row| {
      Ok(TweetSchedules {
        id: row.get(0)?,
        tweet_draft_id: row.get(1)?,
        date_scheduled: NaiveDateTime::parse_from_str(
          &row.get_unwrap::<usize, String>(2),
          "%Y-%m-%d %H:%M:%S",
        )
        .unwrap(),
        created_at: NaiveDateTime::parse_from_str(
          &row.get_unwrap::<usize, String>(3),
          "%Y-%m-%d %H:%M:%S",
        )
        .unwrap(),
        updated_at: NaiveDateTime::parse_from_str(
          &row.get_unwrap::<usize, String>(4),
          "%Y-%m-%d %H:%M:%S",
        )
        .unwrap(),
      })
    })
    .unwrap();

  Json(
    tweet_schedules
      .map(|x| x.unwrap())
      .collect::<Vec<TweetSchedules>>(),
  )
}

#[derive(Debug, Serialize, Deserialize)]
pub struct PostTweetSchedulesInput {
  tweet_draft_id: usize,
  date_scheduled: NaiveDateTime,
}

#[post("/api/tweet_schedules", format = "json", data = "<tweet_schedule>")]
pub fn post_tweet_schedules(tweet_schedule: Json<PostTweetSchedulesInput>) -> String {
  let conn = db::get_db_connection().unwrap();

  let tweet_draft_id = &tweet_schedule.tweet_draft_id;
  let date_scheduled = &tweet_schedule.date_scheduled;

  conn
    .execute(
      "INSERT INTO tweet_schedules (tweet_draft_id, date_scheduled) values (?1, ?2)",
      params![tweet_draft_id, date_scheduled.timestamp()],
    )
    .unwrap();

  format!("Ok")
}

#[derive(Debug, Serialize, Deserialize)]
pub struct PutTweetSchedulesInput {
  tweet_draft_id: usize,
  date_scheduled: NaiveDateTime,
}

#[put("/api/tweet_schedules?<id>", format = "json", data = "<tweet_schedule>")]
pub fn put_tweet_schedules(id: usize, tweet_schedule: Json<PutTweetSchedulesInput>) -> String {
  let conn = db::get_db_connection().unwrap();

  let tweet_draft_id = &tweet_schedule.tweet_draft_id;
  let date_scheduled = &tweet_schedule.date_scheduled;

  conn
    .execute(
      "UPDATE tweet_schedules SET tweet_draft_id=?1, date_scheduled=?2, updated_at=datetime('now') WHERE id=?2",
      params![tweet_draft_id, date_scheduled.timestamp()],
    )
    .unwrap();

  format!("Ok")
}

#[delete("/api/tweet_schedules?<id>")]
pub fn delete_tweet_schedules(id: usize) -> String {
  let conn = db::get_db_connection().unwrap();

  conn
    .execute(
      "DELETE FROM tweet_schedules WHERE id=?1",
      params![id],
    )
    .unwrap();

  format!("Ok")
}
