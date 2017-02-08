<?php
    class Pixopa_Template_Model_Mysql4_Content extends Mage_Core_Model_Mysql4_Abstract
    {
        protected function _construct()
        {
            $this->_init("template/content", "px_template_content_id");
        }
    }
	 