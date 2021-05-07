## This service is for mapping other fields for retrieved claims & is based off specified rulesets. NOTE: UPDATE AS NECESSARY.
# USAGE: Claims.#{method}(claims_status, internal_claims_status)
# eg.
# ClaimsMap.find("For Payment Processing", "Not Applicable")
# ClaimsMap.display_status("For Payment Processing", "Not Applicable")
# ClaimsMap.previous_status("For Payment Processing", "Not Applicable")
# ClaimsMap.next_status("For Payment Processing", "Not Applicable")
# ClaimsMap.processing_restrictions("For Payment Processing", "Not Applicable")

# rubocop:disable Metrics/ClassLength:
class ClaimsMap
  CLAIMS_MAP = [
    {
      claims_status: 'Reported',
      internal_claims_status: 'Not Applicable',
      display_status: 'Reported',
      previous_status: [],
      next_status: ['Pending Requirements']
    },
    {
      claims_status: 'Pending Requirements',
      internal_claims_status: 'Not Applicable',
      display_status: 'Pending Requirements',
      previous_status: ['Reported'],
      next_status: ['Processing']
    },
    {
      claims_status: 'Processing',
      internal_claims_status: 'Not Applicable',
      display_status: 'Processing',
      previous_status: ['Pending Requirements'],
      next_status: ['For Approval of Claims Section Head', 'Denied']
    },
    {
      claims_status: 'Processing',
      internal_claims_status: 'Ex-Gratia for Processing',
      display_status: 'For Ex-Gratia Processing',
      previous_status: ['Denied'],
      next_status: ['For Approval of Claims Department Head (Ex-Gratia)']
    },
    {
      claims_status: 'For Approval of Section Head',
      internal_claims_status: 'Not Applicable',
      display_status: 'For Approval of Claims Section Head',
      previous_status: ['Processing'],
      next_status: ['For Approval of Claims Department Head']
    },
    {
      claims_status: 'For Approval of Claims Department Head',
      internal_claims_status: 'Not Applicable',
      display_status: 'For Approval of Claims Department Head',
      previous_status: ['For Approval of Claims Section Head'],
      next_status: ['For Approval of Insurer', 'For Payment Processing']
    },
    {
      claims_status: 'For Approval of Claims Department Head',
      internal_claims_status: 'Ex-Gratia for Approval of Claims Department Head',
      display_status: 'For Approval of Claims Department Head (Ex-Gratia)',
      previous_status: ['For Ex-Gratia Processing'],
      next_status: ['For Approval of Insurer (Ex-Gratia)', 'For Approval of Accounting Head (Ex-Gratia)']
    },
    {
      claims_status: 'For Approval of Insurer',
      internal_claims_status: 'Not Applicable',
      display_status: 'For Approval of Insurer',
      previous_status: ['For Approval of Claims Department Head'],
      next_status: ['For Payment Processing']
    },
    {
      claims_status: 'For Approval of Insurer',
      internal_claims_status: 'Ex-Gratia for Approval of Insurer',
      display_status: 'For Approval of Insurer (Ex-Gratia)',
      previous_status: 'For Ex-Gratia Processing',
      next_status: ['Approved by Insurer (Ex-Gratia)']
    },
    {
      claims_status: 'Approved by Insurer',
      internal_claims_status: 'Ex-Gratia Approved by Insurer',
      display_status: 'Approved by Insurer (Ex-Gratia)',
      previous_status: 'For Approval of Insurer (Ex-Gratia)',
      next_status: ['For Approval of Claims Department Head (Ex-Gratia)']
    },
    {
      claims_status: 'For Payment Processing',
      internal_claims_status: 'Not Applicable',
      display_status: 'For Payment Processing',
      previous_status: ['For Approval of Claims Department Head', 'For Approval of Insurer'],
      next_status: ['Ready for Release'],
      payout_edit_allowed_roles: ['claims_section_head']
    },
    {
      claims_status: 'For Payment Processing',
      internal_claims_status: 'Ex-Gratia for Approval of Accounting Department Head',
      display_status: 'For Approval of Accounting Head (Ex-Gratia)',
      previous_status: ['For Approval of Claims Department Head (Ex-Gratia)'],
      next_status: ['For Ex-Gratia Payment Processing']
    },
    {
      claims_status: 'For Payment Processing',
      internal_claims_status: 'Ex-Gratia for Payment Processing',
      display_status: 'For Ex-Gratia Payment Processing',
      previous_status: ['For Approval of Accounting Head (Ex-Gratia)'],
      next_status: ['Ready for Release (Ex-Gratia)'],
      payout_edit_allowed_roles: ['claims_section_head']
    },
    {
      claims_status: 'Ready for Release',
      internal_claims_status: 'Not Applicable',
      display_status: 'Ready for Release',
      previous_status: ['For Payment Processing'],
      next_status: ['Settled', 'Pending for Release due to Non-Appearance']
    },
    {
      claims_status: 'Ready for Release',
      internal_claims_status: 'Ex-Gratia Ready for Release',
      display_status: 'Ready for Release (Ex-Gratia)',
      previous_status: ['For Ex-Gratia Payment Processing'],
      next_status: ['Settled (Ex-Gratia)']
    },
    {
      claims_status: 'Ready for Release',
      internal_claims_status: 'Reactivated for Payout',
      display_status: 'Reactivated for Payout',
      previous_status: ['Pending for Release due to Non-Appearance'],
      next_status: ['Ready for Release'],
      payout_edit_allowed_roles: ['claims_section_head']
    },
    {
      claims_status: 'Settled',
      internal_claims_status: 'Not Applicable',
      display_status: 'Settled',
      previous_status: ['Ready for Release'],
      next_status: []
    },
    {
      claims_status: 'Settled',
      internal_claims_status: 'Ex-Gratia Settled',
      display_status: 'Settled (Ex-Gratia)',
      previous_status: ['Ready for Release (Ex-Gratia)'],
      next_status: []
    },
    {
      claims_status: 'Archived',
      internal_claims_status: 'Not Applicable',
      display_status: 'Archived',
      previous_status: ['Processing'],
      next_status: []
    },
    {
      claims_status: 'Pending for Release due to Non-Appearance',
      internal_claims_status: 'Not Applicable',
      display_status: 'Pending for Release due to Non-Appearance',
      previous_status: ['Ready for Release'],
      next_status: ['Reactivated for Payout']
    }
  ].freeze

  class << self
    def find(claims_status, internal_claims_status)
      CLAIMS_MAP.find { |i| i[:claims_status] == claims_status && i[:internal_claims_status] == internal_claims_status }
    end

    def display_status(claims_status, internal_claims_status)
      return 'None found. Update /app/services/claims_map.rb' if find(claims_status, internal_claims_status).nil?

      find(claims_status, internal_claims_status)[:display_status]
    end

    def previous_status(claims_status, internal_claims_status)
      return ['None found. Update /app/services/claims_map.rb'] if find(claims_status, internal_claims_status).nil?

      find(claims_status, internal_claims_status)[:previous_status]
    end

    def next_status(claims_status, internal_claims_status)
      return ['None found. Update /app/services/claims_map.rb'] if find(claims_status, internal_claims_status).nil?

      find(claims_status, internal_claims_status)[:next_status]
    end

    def processing_restrictions(claims_status, internal_claims_status)
      return { 'error' => 'None found. Update /app/services/claims_map.rb' } if find(claims_status, internal_claims_status).nil?

      find(claims_status, internal_claims_status)
        .except(:claims_status, :internal_claims_status, :display_status, :previous_status, :next_status)
    end
  end
end

# rubocop:enable Metrics/ClassLength:
