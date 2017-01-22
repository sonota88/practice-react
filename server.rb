require "json"
require "sinatra"
require "sinatra/reloader"

class Items

  @@items = [
    { id: 1, name: "foo", note: "note 1"},
    { id: 2, name: "bar", note: "note 2"}
  ]

  def self.get id
    @@items.find{|item|
      item[:id] == id
    }
  end

  def self.get_all
    @@items
  end

  def self.add item
    @@items << item
  end

  def self.update item
    i = @@items.index{|it|
      it[:id] == item[:id]
    }
    @@items[i] = item
  end

  def self.max_id
    id = @@items[0][:id]
    @@items.each{|item|
      id = [item[:id], id].max
    }
    id
  end
end

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

get "/items/new" do
  view_html("new")
end

get "/items/:id/edit" do
  view_html("edit")
end

post "/items" do
  item = {
    id: Items.max_id + 1,
    name: params[:name],
    note: params[:note]
  }
  Items.add item
  redirect to("/items")
end

patch "/items/:id" do
  id = params[:id].to_i
  Items.update({
    id: id,
    name: params[:name],
    note: params[:note]
  })
  redirect to("/items/#{id}")
end

get "/api/items" do
  _api do
    {
      items: Items.get_all
    }
  end
end

get "/api/items/:id" do
  _api do
    id = params[:id].to_i
    item = Items.get(id)
    {
      item: item
    }
  end
end
