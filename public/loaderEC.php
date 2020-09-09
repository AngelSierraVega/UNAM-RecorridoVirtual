<?php
/**
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$conn = mysqli_connect('localhost', 'root', '') or die("Base de datos no conectada");
//$conn = mysqli_connect($localIP,'grupoind','') or die("Error, conexion");
$bd = mysqli_select_db($conn, 'grupoind_data') or die("Error, Base de datos");
mysqli_set_charset($conn, 'utf8');


$xIdEC = isset($_GET["IDx_EC"]) ? $_GET["IDx_EC"] : "MUAC";

$descripcionesEC = [];
$descripcionesEC['MUAC'] = "El MUAC es...";
$descripcionesEC['ExplanadaEspiga'] = "La ExplanadaEspiga es...";
$descripcionesEC['Cines'] = "Cines es...";
$descripcionesEC['SalaCarlosChaves'] = "La SalaCarlosChaves es...";
$descripcionesEC['SalaMiguelCovarrubias'] = "La SalaMiguelCovarrubias es...";
$descripcionesEC['SalonDanza'] = "El SalonDanza es...";
$descripcionesEC['TeatroJuanRuiz'] = "El TeatroJuanRuiz es...";
$descripcionesEC['ForoSorJuana'] = "El ForoSorJuana es...";
$descripcionesEC['SalaNeza'] = "La SalaNeza es...";

$linksEC = [];
$linksEC['MUAC'] = [
    "https://www.facebook.com/InnovaINDIE" => "Ir a página de facebook"
    , "url" => "Ir a boletos"
    , "url2" => "Ir a video"
];

$descripcionEC = isset($descripcionesEC[$xIdEC]) ? $descripcionesEC[$xIdEC] : "NO VALIDO";



$idxEC = '000000000225';

$buscar = $idxEC;

$query = "SELECT * FROM view_buscador WHERE `sic_espacio_cultural|IdEspacioCultural`=" . $buscar;
$result = mysqli_query($conn, $query);
$row = $result->fetch_assoc();

$query_actividades = "SELECT * FROM `documento_digital` WHERE `documento_digital`.`Id` = " . $row['sic_espacio_cultural|IdEspacioCultural'];
$result_actividades = mysqli_query($conn, $query_actividades);
$row_actividades = $result_actividades->fetch_assoc();


$rutaRUEyACoriginal = 'http://srvr.d/rueyac/';

?>


<!doctype html>
<html lang="es">
    <head>
        <!-- Required meta tags -->
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <!-- Bootstrap CSS -->
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
        <title>Detalle de Espacio Cultural</title>
    </head>
    <body>
        <div class="card">

            <div class="card-header">
                <h5 class="card-title">Detalle de Espacio Cultural</h5>
                <ul class="nav nav-tabs card-header-tabs" id="myTab" role="tablist">
                    <li class="nav-item">
                        <a class="nav-link active" 
                           id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">
                            Información general</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" 
                           id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">
                            Recorrido 360</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" 
                           id="contact-tab" data-toggle="tab" href="#EC_Tecnico" role="tab" aria-controls="contact" aria-selected="false">
                            Información técnica</a>
                    </li>
                </ul>
            </div>


            <div class="tab-content" id="myTabContent">
                <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                    <div class="card-body">
                        <img src="<?= $rutaRUEyACoriginal . $row_actividades['Path']; ?>" 
                             class="card-img-top" 
                             alt="<?= $row_actividades['Nombre']; ?>">
                        <h5 class="card-title"><?= $row['sic_espacio_cultural|Nombre']; ?></h5>

                        <p class="card-text"><?= $descripcionEC; ?></p>

                        <ul class="list-group list-group-flush">
                            <?php
                            foreach ($linksEC[$xIdEC] as $url => $content) {

                                ?>
                                <li class="list-group-item list-group-item-action">
                                    <a href="<?= $url; ?>" class="card-link" target="_blank"><?= $content; ?></a>
                                </li>
                                <?php
                            }

                            ?>
                        </ul>

                    </div>
                </div>
                <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">

                    <div class="card-body">
                        <iframe id="frameSecundario" src="loader360.php?IDx_EC=<?= $xIdEC; ?>" allowfullscreen allowvr onmousewheel=""></iframe>
                    </div>
                </div>
                <div class="tab-pane fade" id="EC_Tecnico" role="tabpanel" aria-labelledby="contact-tab">
                    <div class="card-body">
                        <h5 class="card-title"><?= $row['sic_espacio_cultural|Nombre']; ?></h5>
                        <p class="card-text"><?= $row['plataforma_unidad|ParentName'] . ' | ' . $row['plataforma_unidad|Nombre']; ?></p>
                        <p class="card-text">
                            <strong>Tipo de espacio cultural:</strong> <?= $row['sic_cat_tipo_espacio_cultural|Nombre']; ?>
                            <br><strong>Área responsable del recinto:</strong> <?= $row['sic_espacio_cultural|AreaResponsable']; ?>
                            <br><strong>Días (estimados) de anticipación para proponer una actividad cultural:</strong> <?= $row['sic_espacio_cultural|DiasAnticipacion']; ?>
                            <br><strong>¿El espacio es para uso exclusivo de actividades curriculares?</strong> <?= ($row['sic_espacio_cultural|ValorCurricular'] == 1) ? "Si" : "No"; ?>
                        </p>
                    </div>
                </div>
            </div>
            <div class="card-footer text-muted text-center">
                [  Logo  ] [  Logo  ] [  Logo  ] [  Logo  ] <br>
                [  UNAM  ] [   CDC  ] [   ACI  ] [  INDIE ]
            </div>
        </div>


        <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>

        <script>
            $('#myTab a').on('click', function (e) {
                e.preventDefault()
                $(this).tab('show')
            });
        </script>

    </body>
</html>