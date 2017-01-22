require "json"
require "sinatra"
require "sinatra/reloader"

def _api
  content_type :json
  result = yield
  JSON.generate(result)
end

get "/hello" do
  "hello #{Time.now}"
end

get "/api/items" do
  _api do
    items = [
      { id: 1, name: "foo", note: "note 1"},
      { id: 2, name: "bar", note: "note 2"}
    ]
    {
      items: items
    }
  end
end
