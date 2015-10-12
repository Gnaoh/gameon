class User < ActiveRecord::Base
	has_many :attendings
	has_many :events, through: :attendings
	has_many :logs
	belongs_to :city

	has_secure_password

	validates :email, :password, presence: true
	validates :email, uniqueness: true
	validates_confirmation_of :password
	has_attached_file :avatar, styles: { medium: "300x300>", thumb: "100x100>" }, default_url: ":style/missing.png"
	validates_attachment_content_type :avatar, content_type: /\Aimage\/.*\Z/

  def self.confirm(params)
    user = User.find_by_email(params[:email])
    user.try(:authenticate, params[:password])
  end

  #NOTE: Great set of instance methods below!

  def created_events
  	@created_events = Event.where(user_id: id)
  end

  def user_action_logs
  	@user_action_logs = User.find(id).logs
  end

  def created_event_logs
  	@created_event_ids ||= created_events.map(&:id)
  	@created_event_logs ||= Log.where(event_id: @created_event_ids).order(created_at: "desc").limit(3)
  end

  def attending_event_logs
  	@attending_event_ids ||= events.map(&:id)
  	@attending_event_logs ||= Log.where(event_id: @attending_event_ids).where.not(user_id: id).order(created_at: "desc").limit(3)
  end

end
