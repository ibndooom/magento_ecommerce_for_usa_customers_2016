<?php
class Web4pro_Customermenu_Block_Account_Navigation extends Mage_Customer_Block_Account_Navigation {
	
	/**
	 * link setter
	 * 
	 * @param array $links        	
	 * @return Web4pro_Customermenu_Block_Account_Navigation
	 */
	public function setLinks(array $links) {
		$this->_links = $links;
		return $this;
	}
}