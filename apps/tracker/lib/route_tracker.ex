defmodule RouteTracker do
  @moduledoc """
  Lleva el control de la posición de un usuario, diciendo dónde está en cada momento
  """

  use GenServer

  @doc """
  Inicia el proceso que controlará la posición, con la latitud y la longitud
  iniciales. La posición por defecto es {}
  ##Ejemplo:  
  	{_, p2}=RouteTracker.start_track()  
  """
  def start_track({lat, lon} \\ {45.122186,-92.352969}) do
    GenServer.start_link(__MODULE__,{lat, lon})
  end


  @doc  """
  Devuelve la posición actual del tracker.
  ##Ejemplo:
  	RouteTracker.get_current_position(p2)
    {3, -50}
  """
  def get_current_position(tracker_pid) do
    GenServer.call(tracker_pid, :current_position)
  end

  @doc """
  Actualiza la posición actual del tracker.
  ##Ejemplo:  	
    RouteTracker.update_position(p2,{3,-50})
  	:ok
  """
  def update_position(tracker_pid, {lat, lon}) do
    GenServer.cast(tracker_pid, {:update_position, {lat,lon}})
  end

  def handle_call(:current_position, _from, {lat, lon}) do
    {:reply, {lat, lon}, {lat, lon}}
  end

   def handle_cast({:update_position, {lat, lon}}, current) do
    {:noreply, {lat, lon}}
  end
end
