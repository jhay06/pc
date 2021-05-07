# TO: extract benefit code and description
module Benefit
  include ActiveSupport::Concern

  def benefits_list
    {
      'Accidental Death Benefit' => 'ADB',
      'Natural Death Benefit' => 'ND',
      'Accidental Disablement Benefit' => 'ADisable',
      'Accidental Dismemberment Benefit' => 'ADismem',
      'Murder and Unprovoked Assault Benefit' => 'MUAB',
      'Fire Cash Assistance' => 'FCA',
      'Emergency Expense Benefit (Accident)' => 'ECA',
      'Emergency Expense Benefit (Sickness)' => 'ECA'
    }
  end

  def extract_benefit(benefits)
    benefits.split(',').map { |b| benefits_list[b] }.join(',')
  end

  def benefit_collection(benefits)
    arr = []
    benefits.map do |benefit|
      transform = {
        "Benefit": benefit['benefit'],
        "BenefitAmount": benefit['benefitAmount'],
        "BenefitType": benefit['benefitType']
      }
      arr.push(transform)
    end
    arr
  end
end
