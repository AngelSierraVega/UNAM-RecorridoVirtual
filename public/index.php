<?php
/**
 * RecorridoVirtual - index.php
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
            #framePrincipalDPR {
                display: block;
                border: none;
                position: relative;
                left: 0px;
                width: 100%;
                /*top: 50px;*/
                height: 100%;
                /*height: 90vh;*/
                overflow: hidden;
            }
            #framePrincipal {
                display: block;       /* iframes are inline by default */
                background: #000;
                border: none;         /* Reset default border */
                height: 100vh;        /* Viewport-relative units */
                width: 100vw;
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
        <iframe id="framePrincipal" src="loaderModelo3d.php" allowfullscreen allowvr onmousewheel=""></iframe>

        <div id="SingleModal2" class="modal fade" tabindex="-1" role="dialog">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Modal title</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>

                    <div class="modal-body row">
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
                                var modal = $("#SingleModal2");
                                modal.find('.modal-title').text(name);
                                $("#SingleModal2").modal('toggle');
//                                        var new_url = "loader360.php?IDx_EC=" + name;
                                var new_url = "loaderEC.php?IDx_EC=" + name;
                                document.getElementById('frameSecundario').contentWindow.location.replace(new_url);
                            }
                            ;
                            window.addEventListener('message', function (e) {
                                displayModal(e.data);
                            });
        </script>

    </body>
</html>
