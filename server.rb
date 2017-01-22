require "json"
require "sinatra"
require "sinatra/reloader"

def view_html name
  File.read "views/#{name}.html"
end

def _api
  content_type :json
  result = yield
  JSON.generate(result)
end

get "/items" do
  view_html("index")
end

get "/items/:id" do
  view_html("show")
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

get "/api/items/:id" do
  _api do
    item = { id: 1, name: "foo", note: "note 1"}
    {
      item: item
    }
  end
end
