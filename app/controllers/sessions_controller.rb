class SessionsController < ApplicationController

 def new
 	@user = User.new
 	render :new
 end

 def create
 	@user = User.confirm(user_params)
 	if @user
 		login(@user)
    #NOTE: prefer `*_path` syntax
 		redirect_to "/users/#{@user.id}"
 	else
 		redirect_to "/sessions/new"
 	end
 end

 	def destroy
 		session[:user_id] = nil
 		redirect_to root_path
	end

 	private

 	def user_params
 		params.require(:user).permit(:email, :password)
	end

end
