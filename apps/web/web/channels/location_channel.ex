defmodule Web.LocationChannel do
  use Phoenix.Channel

  def join("location:all", _message, socket) do
    {:ok, socket}
  end
  def join("location:" <> _private_room_id, _params, _socket) do
    {:error, %{reason: "unauthorized"}}
  end

  def handle_in("location_message", %{"body" => body}, socket) do
    broadcast! socket, "location_message", %{body: body}
    {:noreply, socket}
  end

  def handle_out("location_message", payload, socket) do
    push socket, "location_message", payload
    {:noreply, socket}
  end
end
