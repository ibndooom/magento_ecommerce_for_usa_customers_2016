<?php

$installer = $this;
$installer->startSetup();

// Initialization of the root block
$RootBlock = '<div class="left-bottom-menu-block">
    {{block type="cms/block" block_id="footer_products_sub_menu"}}
    {{block type="cms/block" block_id="about_us_sub_menu"}}
    {{block type="cms/block" block_id="support_sub_menu"}}
</div>';

// Initialization of the 'Products' sub menu blocks
$productsSubMenuBlock = '<div class="links">
    <div class="block-title">
        <strong><span>Products</span></strong>
    </div>
    <ul>
        <li><a href="#">Business Cards</a></li>
        <li><a href="#">Brochures</a></li>
        <li><a href="#">PostCard</a></li>
        <li><a href="#">Envelopes</a></li>
        <li><a href="#">Posters</a></li>
        <li><a href="#">Flyers</a></li>
    </ul>
</div>';

// Initialization of the 'About Us' sub menu blocks
$aboutUsSubMenu = '<div class="links">
    <div class="block-title">
        <strong><span>About Us</span></strong>
    </div>
    <ul>
        <li><a href="{{store url=""}}about-magento-demo-store/">Who We Are</a></li>
        <li><a href="#">Advertise with Us</a></li>
        <li><a href="#">Terms of Services</a></li>
        <li><a href="{{store url=""}}privacy-policy-cookie-restriction-mode/">Privacy Policy</a></li>
        <li><a href="#">VIP Loyalty Program</a></li>
    </ul>
</div>';

// Initialization of the 'Support' sub menu blocks
$supportSubMenu = '<div class="links">
    <div class="block-title">
        <strong><span>Support</span></strong>
    </div>
    <ul>
        <li><a href="{{store url=""}}customer/account/">My Account</a></li>
        <li><a href="#">Track My Order</a></li>
        <li><a href="#">FAQ\'s</a></li>
        <li><a href="#">Mailling Services</a></li>
        <li><a href="#">Non-Profit Printing</a></li>
        <li><a href="{{store url=""}}contacts/">Contact Us</a></li>
    </ul>
</div>';

// Initialization of the 'Social links' sub menu blocks
$socialLinks = '<div class="links social-media">
	<div class="block-title">
		<strong><span>Follow Us</span></strong>
	</div>
	<ul>
		<li><a href="#"><em class="facebook"></em>Facebook</a></li>
		<li><a href="#"><em class="twitter"></em>Twitter</a></li>
		<li><a href="#"><em class="linkedin"></em>LinkedIn</a></li>
		<li><a href="#"><em class="google"></em>Google</a></li>
	</ul>
</div>';

// Saving to DataBase
$cmsBlocks = array(
    array (
        'identifier'   => 'left_bottom_menu_block',
        'title'        => 'Footer menu bottom',
        'stores'       => array(0),
        'content'      => $RootBlock,
        'is_available' => 1
    ),
    array(
        'identifier'   => 'footer_products_sub_menu',
        'title'        => 'Footer products sub menu',
        'stores'       => array(0),
        'content'      => $productsSubMenuBlock,
    'is_available' => 1
    ),
    array(
        'identifier'   => 'about_us_sub_menu',
        'title'        => 'About us sub menu',
        'stores'       => array(0),
        'content'      => $aboutUsSubMenu,
        'is_available' => 1
    ),
    array(
        'identifier'   => 'support_sub_menu',
        'title'        => 'Support sub menu',
        'stores'       => array(0),
        'content'      => $supportSubMenu,
        'is_available' => 1
    ),
    array(
        'identifier'   => 'footer_social_links',
        'title'        => 'Footer social links',
        'stores'       => array(0),
        'content'      => $socialLinks,
        'is_available' => 1
    )
);

foreach ($cmsBlocks as $data) {
    Mage::getModel('cms/block')->setData($data)->save();
}

$installer->endSetup();