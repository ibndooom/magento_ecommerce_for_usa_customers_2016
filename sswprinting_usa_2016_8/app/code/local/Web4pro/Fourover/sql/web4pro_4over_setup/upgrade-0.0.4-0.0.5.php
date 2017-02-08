<?php
/**
 * @category    Web4pro
 * @package     Web4pro_Fourover
 */

$installer = $this;
$installer->startSetup();

$data = array (
        'backend_type'   => 'text',
        'backend_model'  => 'web4pro_4over/backend_uuid',
        'frontend_model' => 'web4pro_4over/frontend_uuid',
        'frontend_input_renderer' => 'web4pro_4over/renderer_uuid',
        'frontend_label' => 'Product UUID',
    );
$installer->updateAttribute('catalog_product', 'product_uuid', $data);
$installer->updateAttribute('catalog_product', 'turnaroundtime_uuid', 'frontend_label', 'Turn Around Time UUID');
$installer->updateAttribute('catalog_product', 'colorspec_uuid', 'frontend_label', 'Color Spec UUID');

$installer->endSetup();
