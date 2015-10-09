class EventsController < ApplicationController

  def index
    @events = Event.all
    current_user #sets @current_user
    render :index
  end

  def new
    user = current_user
    @city_id = params[:city_id]
    @event = Event.new
    render :new
  end

  def show
    @city_id = params[:city_id]
    @event = Event.find(params[:id])
    @creator = User.find(@event.user_id)
    @available = @event.users.all
    @city = City.find(@event.city_id)
    id = params[:id]
    @address = @event[:address]
    render :show
  end

  def create
    @user = current_user
    event_params = params.require(:event).permit(:name, :address, :max_headcount, :current_headcount, :description, :date, :time, :sport_id)
    event_params[:user_id] = @user.id
    event_params[:city_id] = params[:id]
    @event = Event.new(event_params)
    if @event.save
      redirect_to "/cities/#{event_params[:city_id]}"
        #logging current_user created an event
    Log.create(event_id:@event.id, user_id:@user.id, action:"created")

    else 
      render :new
    end 
  end


  def edit
    id = params[:id]
    @event = Event.find(params[:id])
  end

  def update
    event_id = params[:id]
    @event = Event.find(event_id)
    @user = current_user

    #get updated data
    updated_attributes = params.require(:event).permit(:name, :address, :max_headcount, :current_headcount, :description, :date, :time, :sport_id)
    #update the article 

    if @event.update_attributes(updated_attributes)
     #logging current_user updated an event
    Log.create(event_id:@event.id, user_id:@user.id, action:"updated")
      #redirect to show
      redirect_to "/events/#{event_id}"
    else
      render :edit
    end  
  end

  def destroy
    id = params[:id]
    @event = Event.find(id)
    @user = current_user
    @event.destroy
    #logging current_user updated an event
    #Log.create(event_id:@event.id, user_id:@user.id, action:"deleted")
    #implement this when we have done everything else
    redirect_to "/cities"
  end
  
end
