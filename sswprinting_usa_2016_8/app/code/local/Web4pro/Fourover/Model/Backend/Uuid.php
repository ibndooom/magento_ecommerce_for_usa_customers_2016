<?php
/**
 * @category    Web4pro
 * @package     Web4pro_Fourover
 */

class Web4pro_Fourover_Model_Backend_Uuid extends Mage_Eav_Model_Entity_Attribute_Backend_Abstract {

    public function beforeSave($object){
        $attr = $this->getAttribute()->getAttributeCode();
        $val = $object->getData($attr);
 
        if (is_array($val)) {
            //normalizing numeric keys of arrays
            foreach ($val as $key => $uuid) {
                if (!empty($uuid['options'])) {
                    $val[$key]['options'] = array_values($uuid['options']);
                }
            }
            $val = array_values($val);

            $object->setData($attr,serialize($val));
        } else {
            $object->setData($attr, serialize(array()));
        }

        return $this;
    }

    public function afterLoad($object){
        $attr = $this->getAttribute()->getAttributeCode();
        $val = $object->getData($attr);
        $object->setData($attr,unserialize($val));

        return $this;
    }

} 