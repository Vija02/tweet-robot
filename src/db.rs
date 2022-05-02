use rusqlite::{Connection, Result};

pub fn get_db_connection() -> Result<Connection> {
  Connection::open("tweets.db")
}

pub fn initialize_db(connection: &Connection) -> Result<()>{
  connection.execute(
    "create table if not exists tweet_drafts (
        id integer primary key autoincrement,
        data text not null,
        created_at datetime not null default (datetime('now')),
        updated_at datetime not null default (datetime('now'))
     )",
    [],
  )?;

  connection.execute(
    "create table if not exists tweet_schedules (
        id integer primary key autoincrement,
        tweet_draft_id integer not null,
        date_scheduled datetime not null,
        created_at datetime not null default (datetime('now')),
        updated_at datetime not null default (datetime('now')),
        FOREIGN KEY(tweet_draft_id) REFERENCES tweet_drafts(id)
     )",
    [],
  )?;

  return Ok(());
}