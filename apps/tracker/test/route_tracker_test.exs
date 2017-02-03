defmodule RouteTrackerTest do
  use ExUnit.Case, async: true
  doctest RouteTracker

  setup do
    {:ok, tracker} =  RouteTracker.start_track()
    {:ok, tracker: tracker}
  end

  test "El tracker debe devolver una ubicación por defecto", %{tracker: tracker} do
    assert is_tuple(RouteTracker.get_current_position(tracker))
  end

  test "El tracker debe actualizar una ubicación", %{tracker: tracker} do
    assert RouteTracker.update_position(tracker, {-1,34.233}) == :ok
  end

  test "El tracker debe actualizar y consultar una ubicación", %{tracker: tracker} do
    assert RouteTracker.update_position(tracker, {23.4555, 12.3444}) == :ok
    assert RouteTracker.get_current_position(tracker) == {23.4555, 12.3444}
  end

end
