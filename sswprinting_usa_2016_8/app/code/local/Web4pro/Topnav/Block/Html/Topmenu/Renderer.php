<?php
class Web4pro_Topnav_Block_Html_Topmenu_Renderer extends Mage_Page_Block_Html_Topmenu_Renderer {

	protected function _getRenderedMenuItemAttributesAdd(Varien_Data_Tree_Node $item, $class) {
		$addClasses = str_replace(',', ' ' , $class);
		$html = '';
		$attributes = $this->_getMenuItemAttributes($item);
		$added = false;
		foreach ($attributes as $attributeName => $attributeValue) {
			if($attributeName == 'class') {
				$attributeValue = $attributeValue . ' ' . $class;
				$added = true;
			}
			$html .= ' ' . $attributeName . '="' . str_replace('"', '\"', $attributeValue) . '"';
		}
		if(!$added) {
			$html .= ' class=\"' . $addClasses . '\"';
		}

		return $html;
	}
}
