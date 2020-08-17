<?php
$relRueyac = [];
$relRueyac['MUAC'] = 0;
$relRueyac['ExplanadaEspiga'] = 0;
$relRueyac['Cines'] = 0;
$relRueyac['SalaCarlosChaves'] = 0;
$relRueyac['SalaMiguelCovarrubias'] = 0;
$relRueyac['SalonDanza'] = 0;
$relRueyac['TeatroJuanRuiz'] = 0;
$relRueyac['ForoSorJuana'] = 0;
$relRueyac['SalaNeza'] = 0;

?>
<!doctype html>
<html lang="es">
    <head>

        <!-- Required meta tags -->
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

        <!-- Bootstrap CSS -->
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
        <style>
            .nav-item2{
                cursor: grab;
            }

            /*When the modal fills the screen it has an even 2.5% on top and bottom*/
            /*Centers the modal*/
            .modal-dialog {
                margin: 2.5vh auto;
            }

            /*Sets the maximum height of the entire modal to 95% of the screen height*/
            .modal-content {
                max-height: 95vh;
                /*overflow: scroll;*/
            }

            /*Sets the height of the modal body to 80% of the screen height*/
            .modal-body {
                height: 100vh;
            }
            /*Sets the maximum height of the modal image to 69% of the screen height*/
            .modal-body img {
                max-height: 69vh;
            }
            /* iframe itself */
            /*            iframe {
                            display: block;
                            width: 100%;
                            height: 100%;
                            border: none;
                        }*/
            #framePrincipal {
                /*display: block;*/
                border: none;
                position: relative;
                left: 0px;
                width: 100%;
                /*top: 50px;*/
                /*height: 90%;*/
                height: 90vh;
                /*overflow: hidden;*/
            }
            #frameSecundario{
                display: block;
                border: none;
                /*position:absolute;*/
                /*left: 0px;*/
                width: 100%;
                /*top: 50px;*/
                height: 100%;
            }
        </style>
        <title>Demo Recorrido Virtual</title>
    </head>
    <body>

        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" href="#">Demo Recorrido Virtual</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item">
                        <a class="nav-link" href="#" onClick="displayModal('MUAC');">MUAC</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#" onClick="displayModal('ExplanadaEspiga');">ExplanadaEspiga</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" onClick="displayModal('Cines');">Cines</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" onClick="displayModal('SalaCarlosChaves');">SalaCarlosChaves</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" onClick="displayModal('SalaMiguelCovarrubias');">SalaMiguelCovarrubias</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" onClick="displayModal('SalonDanza');">SalonDanza</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" onClick="displayModal('TeatroJuanRuiz');">TeatroJuanRuiz</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" onClick="displayModal('ForoSorJuana');">ForoSorJuana</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" onClick="displayModal('SalaNeza');">SalaNeza</a>
                    </li>

                </ul>
<!--                <span class="navbar-text">
                    Demo desarrollado por Innova Indie.
                </span>-->
            </div>
            <div class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Usuario RUEyAC
                </a>
                <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                    <a class="dropdown-item" href="#">Ingresar</a>
                    <a class="dropdown-item" href="#">Salir</a>
                </div>
            </div>
        </nav>

        <!--        <h1>Hello, world!</h1>-->

        <iframe id="framePrincipal" src="loader_0.php" allowfullscreen allowvr onmousewheel=""></iframe>

        <div id="SingleModal2" class="modal fade" tabindex="-1" role="dialog">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Modal title</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <iframe id="frameSecundario" src="loader360.php?IDx_EC=none" allowfullscreen allowvr onmousewheel=""></iframe>
                    </div>
                    <div class="modal-footer">

                    </div>
                </div>
            </div>
        </div>

        <!--    $('#myModal').modal('show')    -->
        <!-- Optional JavaScript -->
        <!-- jQuery first, then Popper.js, then Bootstrap JS -->
        <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>

        <script>
                            $('#SingleModal2').modal({
                                backdrop: 'static',
                                show: false
                            });
                            function displayModal(name) {
                                switch (name) {
                                    case "ExplanadaEspiga":
                                    case "MUAC":
                                        var modal = $("#SingleModal2");
                                        modal.find('.modal-title').text(name);
                                        $("#SingleModal2").modal('toggle');
                                        var new_url = "loader360.php?IDx_EC=" + name;
                                        document.getElementById('frameSecundario').contentWindow.location.replace(new_url);
                                        break;
                                }

                            }
                            window.addEventListener('message', function (e) {
                                displayModal(e.data);
                            });
        </script>

    </body>
</html>
