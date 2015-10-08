class CitiesController < ApplicationController

  def index
  	@cities = City.all
  	@city_names = city_names_array
  end

  def show
  	id = params[:id]
  	@city = City.find(id)
  	@city_name = @city.name
  end

 	def city_names_array
  	@cities.map do |c|
  		c.name
 	  end
 end

end
