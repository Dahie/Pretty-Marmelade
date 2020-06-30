class Car < ApplicationRecord
  validates :title, presence: true
#  belongs_to :user
  has_one_attached :car_skin

  rails_admin do
    configure :user do
      label 'Owner: '
    end
  end
end
