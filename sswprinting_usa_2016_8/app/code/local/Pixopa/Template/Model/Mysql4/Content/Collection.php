<?php
    class Pixopa_Template_Model_Mysql4_Content_Collection extends Mage_Core_Model_Mysql4_Collection_Abstract
    {

		public function _construct(){
			$this->_init("template/content");
		}
    }
	 