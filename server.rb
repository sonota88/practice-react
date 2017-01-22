require "sinatra"
require "sinatra/reloader"

get "/hello" do
  "hello #{Time.now}"
end
