require "json"
require "sinatra"
require "sinatra/reloader"

$items = [
  { id: 1, name: "foo", note: "note 1"},
  { id: 2, name: "bar", note: "note 2"}
]

def view_html name
  File.read "views/#{name}.html"
end

def _api
  content_type :json
  result = yield
  JSON.generate(result)
end

def get_item id
  $items.find{|item|
    item[:id] == id
  }
end

get "/items" do
  view_html("index")
end

get "/items/:id" do
  view_html("show")
end

get "/api/items" do
  _api do
    {
      items: $items
    }
  end
end

get "/api/items/:id" do
  _api do
    id = params[:id].to_i
    item = get_item(id)
    {
      item: item
    }
  end
end
