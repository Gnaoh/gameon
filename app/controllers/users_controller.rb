class UsersController < ApplicationController
  before_action :logged_in?, only: [:show, :index]
  
  def index
    @users = User.all
    render :index
  end

  def new
    @user = User.new
    render :new
  end

  def create
    @user = User.new(user_params)
    if @user.save
     login(@user)
     flash[:notice] = "Please update your profile!"
     redirect_to user_path(@user.id)
   else
    render :new
  end
end

def show
  @user = User.find(params[:id])
  if @user.events.any? 
   @events = @user.events
 else 
   @events = []
 end

 if (@user.attributes['city_id'] && !@user.events.blank?)
  @local = @user.city.events.where(sport_id: @events.last.sport_id)
end
    # @similar = @local.where
    # @words = @
    @is_creator = Event.where(user_id: @user.id)
    @event = Event.all
    
    address_join = @events.map do|event|
      event[:address]
    end
    address_host = @is_creator.map do|event|
      event[:address]
    end
    @addresses = address_join + address_host
    @current_user = current_user

  end

  def edit
    @user = User.find(params[:id])
    render :edit
  end

  def update
    @user = User.find(params[:id])
    updated_params = user_params
    @user.update(updated_params)
    @city_id = updated_params[:city_id]
    @city_name = City.find(@city_id).name
    
    @user.update_attribute(:first_name, updated_params[:first_name])
    @user.update_attribute(:last_name, updated_params[:last_name])
    @user.update_attribute(:city_id, updated_params[:city_id])

    redirect_to user_path
  end

  def destroy
  end

  private

  def user_params
    params.require(:user).permit(:first_name, :last_name, :email, :password, :age, :gender, :city_id, :avatar)
  end
  
end
