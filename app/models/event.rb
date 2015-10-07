class Event < ActiveRecord::Base
	validates :name, presence: true, length: { maximum: 200, too_long: "%{count} characters is the maximum allowed"  }
	validates :sport_id, presence: true

	validates_numericality_of :max_headcount, greater_than: :current_headcount, message: ": You already have enough partners (total headcount must be greater than current headcount)"
	validates_numericality_of :current_headcount, greater_than: 0, message: ": Must have at least 1 player already to post an activitiy"
	
	validate :date_cannot_be_in_the_past

	def date_cannot_be_in_the_past
	    errors.add(:date, "can't be in the past") if
	      !date.blank? and date < Date.today
	end


	belongs_to :city
	belongs_to :sport
	belongs_to :user

	has_many :attendings
	has_many :users, through: :attendings, dependent: :destroy #delete associated attendings

end

  