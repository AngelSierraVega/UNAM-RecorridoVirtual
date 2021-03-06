<?php
/**
 * RecorridoVirtual - loader360.php
 *
 * @author Angel Sierra Vega <angel.grupoindie.com>
 * @copyright (C) 2020 Angel Sierra Vega. Grupo INDIE.
 *
 * @package UNAM\RecorridoVirtual
 *
 * @version 00.50
 * @since 20-04-27
 */
?>

<!DOCTYPE html>
<html lang="en">
    <head>
        <title>Modelo dummie. Luz omnidireccional. </title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0">
        <link type="text/css" rel="stylesheet" href="main.css">
        <style>
            body {
                background-color: #ccc;
                color: #000;
            }
            a {
                color: #f00;
            }
        </style>
    </head>

    <body>
        <div id="info">
            <a href="https://facebook.com/InnovaINDIE" target="_blank" rel="noopener">Innova INDIE</a> - Loader 360
        </div>

        <script >
            const IDx_EC = "<?= $_GET["IDx_EC"]; ?>";
        </script>
        <script type="module" src="webgl360.js">



        </script>

    </body>
</html>
