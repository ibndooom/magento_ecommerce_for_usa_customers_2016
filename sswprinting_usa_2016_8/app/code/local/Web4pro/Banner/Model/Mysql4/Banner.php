<?php
/**
 * @category    Fishpig
 * @package     Fishpig_iBanners
 * @license     http://fishpig.co.uk/license.txt
 * @author      Ben Tideswell <help@fishpig.co.uk>
 */

class Web4pro_Banner_Model_Mysql4_Banner extends Mage_Core_Model_Mysql4_Abstract
{
	public function _construct()
	{
		$this->_init('banner/banner', 'banner_id');
	}    
}
