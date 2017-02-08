<?php
/**
 * @category    Web4pro
 * @package     Web4pro_Fourover
 */

class Web4pro_Fourover_Block_Checkout_Addresscandidates extends Mage_Core_Block_Template
{
    public function getCandidates()
    {
        return Mage::registry('fover_shipping_address_candidates');
    }

    /**
     * Renders address candidate's label
     *
     * @param array $candidate
     * @return string
     */
    public function getCandidateLabel($candidate)
    {
        if (isset($candidate['address']) && is_array($candidate['address'])) {
            $candidate['address'] = implode(' - ', $candidate['address']);
        }
        return $this->escapeHtml(implode(', ', $candidate));
    }
}