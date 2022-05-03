#[macro_use]
extern crate rocket;
use rocket::http::Method;
use rocket_cors::{AllowedHeaders, AllowedOrigins};
use rusqlite::Result;

mod api;
mod db;
mod twitter_api;

async fn init_app() -> Result<()> {
    // Initialize the Database
    let conn = db::get_db_connection()?;
    db::initialize_db(&conn)?;
    match conn.close() {
        Ok(_) => return Ok(()),
        Err(e) => return Err(e.1),
    };
}

#[rocket::main]
async fn main() -> Result<(), rocket::Error> {
    init_app().await.unwrap();

    let cors = rocket_cors::CorsOptions {
        allowed_origins: AllowedOrigins::All,
        allowed_methods: vec![Method::Get, Method::Post, Method::Put, Method::Delete].into_iter().map(From::from).collect(),
        allowed_headers: AllowedHeaders::All,
        allow_credentials: true,
        ..Default::default()
    }
    .to_cors()
    .unwrap();

    // Run the web server
    rocket::build()
        .mount(
            "/",
            routes![
                api::tweet_drafts::get_tweet_drafts,
                api::tweet_drafts::post_tweet_drafts,
                api::tweet_drafts::put_tweet_drafts,
                api::tweet_drafts::delete_tweet_drafts,
                api::tweet_schedules::get_tweet_schedules,
                api::tweet_schedules::post_tweet_schedules,
                api::tweet_schedules::put_tweet_schedules,
                api::tweet_schedules::delete_tweet_schedules,
                api::twitter_user::me
            ],
        )
        .attach(cors)
        .launch()
        .await
}
