defmodule Web.LocationChannel do
  use Phoenix.Channel

  def join("location:all", _message, socket) do
    {:ok, socket}
  end
  def join("location:" <> _private_room_id, _params, _socket) do
    {:error, %{reason: "unauthorized"}}
  end
end
