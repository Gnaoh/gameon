class CitiesController < ApplicationController

  def index
  	@cities = City.all
  	@city_names = city_names_array
  end

  def show
  	id = params[:id]
  	@city = City.find(id)
    @events= @city.events
    @e_markers = cities_array

  end

  def cities_array
    @events.map do |e|
      e.address
    end

  end


 	def city_names_array
  	@cities.map do |c|
  		c.name
 	  end
 end

end
