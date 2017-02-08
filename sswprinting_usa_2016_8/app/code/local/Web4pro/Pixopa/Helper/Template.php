<?php
/**
 * @category    Web4pro
 * @package     Web4pro_Fourover
 */
/** @class Web4pro_Pixopa_Helper_Template */

class Web4pro_Pixopa_Helper_Template extends Pixopa_Template_Helper_Data
{
    const EDIT_OPTIONS_TO_IGNORE_PATH = 'dol_template/options/edit_ignore_list';
 
    public function getConfigurableProductAttributes($product_id, $size_value_id)
    {
        $attributesData = parent::getConfigurableProductAttributes($product_id, $size_value_id);
        $action = Mage::app()->getFrontController()->getAction();
        if (is_object($action)) {
            $fullActionName = $action->getFullActionName();
            if ($fullActionName == 'template_index_getAllOtherAttributeValues') {
                $attributesData = $this->filterAttributesDataOptionsToIgnore($attributesData);
            }
        }

        return $attributesData;
    }

    /**
     * Filters product custom options to ignore specificly named once
     *
     * @param $attributesData
     * @return $attributesData
     */
    public function filterAttributesDataOptionsToIgnore($attributesData)
    {
        $optionsToIgnore = $this->getEditOptionsToIgnore();
        foreach ($attributesData as $key => $item) {
            if (strpos($key, 'options_') === false) {
                continue;
            }

            if (in_array($item['Name'], $optionsToIgnore)) {
                unset($attributesData[$key]);
            }
        }

        return $attributesData;
    }

    public function getEditOptionsToIgnore()
    {
        $options = explode(',', Mage::getStoreConfig(self::EDIT_OPTIONS_TO_IGNORE_PATH));
        foreach ($options as $key => $value) {
            $options[$key] = trim($value);
        }
        return $options;
    }
}
