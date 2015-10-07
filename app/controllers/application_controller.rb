class ApplicationController < ActionController::Base
  before_action :current_user

  include SessionsHelper
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception



  
end
