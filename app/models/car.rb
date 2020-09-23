class Car < ApplicationRecord
  validates :title, presence: true
  belongs_to :user
  has_one_attached :car_skin
end
