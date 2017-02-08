defmodule Web.MapController do
  use Web.Web, :controller

  def index(conn, _params) do
    render(conn, "index.html")
  end

end
