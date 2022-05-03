use crate::twitter_api;
use egg_mode::raw::{self};
use egg_mode::user::TwitterUser;
use rocket::serde::json::Json;

#[get("/api/me")]
pub async fn me() -> Json<TwitterUser> {
  let token = twitter_api::get_twitter_token();

  // Get the authenticated user data from v2
  let empty_param = raw::ParamList::new();
  let own_user_req = raw::request_get(
    "https://api.twitter.com/2/users/me",
    &token,
    Some(&empty_param),
  );
  let own_user_resp = raw::response_json::<serde_json::Value>(own_user_req)
    .await
    .unwrap();

  let user_name =
    std::string::String::from(own_user_resp.response["data"]["username"].as_str().unwrap());

  // Then get the full user data from v1
  let user = egg_mode::user::show(user_name, &token).await.unwrap();

  Json(user.response)
}
