// LLenar Select Con Tipos de Queue
const queryString = window.location.search;
var parms = queryString.split('&');


// ----- queueName
let tmpConversationId = parms[0].split('=');
const conversationId = tmpConversationId[1];


// ----- ConversationID
let tmpAgentId = parms[1].split('=');
const agentId = tmpAgentId[1];

// ----- ConversationID
let tmpqueueId = parms[2].split('=');
const queueId = tmpqueueId[1];

let getDate = new Date();
let reloj =  `${getDate.getDate()}/${getDate.getMonth()+1}/${getDate.getFullYear()} [${getDate.getHours()}:${getDate.getMinutes()}:${getDate.getSeconds()}]`;
let date = `${getDate.getDate()}/${getDate.getMonth()+1}/${getDate.getFullYear()}`;
let hour = `${getDate.getHours()}:${getDate.getMinutes()}:${getDate.getSeconds()}`;

//let queueId = 'd8a5b544-a521-4b8f-866f-f4a4f2ffbe70';
// Funcion para traer los wrapupcodes segun el queue

function setTableWrapUp() {
    var settings = {
        "url": `http://localhost/apieconsol/AllWrapup/${queueId}`,
        "method": "GET",
        "timeout": 0,
        'Access-Control-Allow-Origin': '*',
    };

    $.ajax(settings).done(function (response) {
        if (response) {
            let objJson = JSON.parse(response);
            let datos = objJson.entities;
            var contenido = '';
            $.each(datos, function (index, value) {

                contenido +=
                    `<tr> 
                    <th>${value['name']}</th> 
                    <th>   
                    <input class="form-check-input" 
                           type="radio" 
                           name="WrapupCode" 
                           id="nameWrapUp" 
                           value="${value.id}"> <label class="form-check-label" for="flexRadioDefault1"><label> </th>
                    </tr>`;
            });
            $("#resIdQueue").html(contenido);
        } else {
            console.log("error");
        }

    });
}
$(document).ready(function RenderTable() {
    setTableWrapUp();
});

function HTMLData(){
    
    let tabla_wrapup = document.getElementById("body-wrapup");
    tabla_wrapup.innerHTML = `<div class="container posicionContainer">
        <div class="container col-12 mb-2">
            <div class="d-grid gap-2">
                <div class="container">
                    <div class="row row-cols-1">
                        <div class="col" align="right"> 
                            <p id="clock"></p>
                        </div>
                        <div class="col">
                            <table class="table table-striped table-bordered table-sm" id="">
                            <!-- Tabla De Datos-->
                            <thead>
                            <tr class="text-center">
                                    <th scope="col" id="nombre">Nombre</th>
                                    <th scope="col" id="btnSeleccionar">Selecccionar</th>
                                </tr>
                            </thead>
                            <tbody id="resIdQueue" class="text-center">
                            </tbody>
                            </table>
                            <!-- Fin Tabla De Datos-->
                        </div>
                        <div class="col"> 
                            <div class="d-grid gap-2 col-6 mx-auto">               
                                <button class="btn btn-danger" type="button" id="btnEnviarDatos">Set Wrapup Code</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>`;

    $("#clock").html(reloj);
}
$(document).ready(function MostrarData() {
    HTMLData();
});

function Sendparam(){


}

function SetWrapup(){

        $('#btnEnviarDatos').click(() => {
            //let agentId = '158072b1-d964-4ebe-9c0a-ebb5e13b6533';
            //let conversationId = '9646d4d4-ef0f-44c0-876a-83e1500cbd67';
            let wrapup_id = $('input[name="WrapupCode"]:checked').val();
            if($('input[name="WrapupCode"]:checked').val() == undefined){
                
                    let tabla_wrapup = document.getElementById("body-wrapup");
                    tabla_wrapup.innerHTML = `<div class="container posicionContainer">
                    <div class="container col-12 mb-2">
                        <div class="d-grid gap-2">
                            <div class="container">
                                <div class="row row-cols-1">
                                    <div class="col">
                                        <p>
                                    </div>
                                    <div class="col" align="center">            
                                        <img src="./img/alert.png" alt="">
                                    </div>
                                    <div class="col">
                                        <p>
                                    </div>
                                    <div class="col"> 
                                        <div class="d-grid gap-2 col-6 mx-auto">               
                                            <button class="btn btn-danger" type="button" id="btnRefreshDatos">Volver a los Wrap-Up</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`;
                    $('#btnRefreshDatos').click(() => {
                        $(document).ready(function ResfrescarData() {
                            HTMLData();
                            setTableWrapUp();
                            SetWrapup();
                        });
                    })   
            }else{
                var settings = {
                    "url": `http://localhost/apieconsol/UpdateParticipant/${agentId}/${conversationId}/${wrapup_id}`,
                    "method": "PATCH",
                    "timeout": 0,
                    'Access-Control-Allow-Origin': '*'
                };
                
                $.ajax(settings).done(function (response) {
                    let objJson = JSON.parse(response);

                    if(objJson.exito != 1){// 0=problema 1=ok
                        let tabla_wrapup = document.getElementById("body-wrapup");
                        tabla_wrapup.innerHTML = `<div class="container posicionContainer">
                        <div class="container col-12 mb-2">
                            <div class="d-grid gap-2">
                                <div class="container">
                                    <div class="row row-cols-1">
                                        <div class="col">
                                            <p>
                                        </div>
                                        <div class="col" align="center">            
                                            <img src="./img/alert2.png" alt="">
                                        </div>
                                        <div class="col">
                                            <p>
                                        </div>
                                        <div class="col"> 
                                            <div class="d-grid gap-2 col-6 mx-auto">               
                                                <button class="btn btn-danger" type="button" id="btnRefreshDatos">Volver a los Wrap-Up</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>`;
                        $('#btnRefreshDatos').click(() => {
                            $(document).ready(function ResfrescarData() {
                                HTMLData();
                                setTableWrapUp();
                                SetWrapup();
                            })
                        })
                    }
                    else{
                        let tabla_wrapup = document.getElementById("body-wrapup");
                        tabla_wrapup.innerHTML = `<div class="container posicionContainer">
                            <div class="container col-12 mb-2">
                            <div class="col">
                            <p>
                            </div>
                                <div class="col" align="center" >
                                    <img src="./img/complete.png" alt="">
                                </div>
                                <div class="col">
                                <p>
                                </div>
                            </div>
                        </div>`;

                        var settings = {
                            "url": `http://localhost/apieconsol/JsonReport/${conversationId}/${agentId}/${wrapup_id}/${queueId}/${date}/${hour}`,
                            "method": "GET",
                            "timeout": 0,
                          };
                          
                          $.ajax(settings).done(function (response) {
                            console.log(response);
                          });
                    }
                });
            }
    });
}
$(document).ready(function GuardarWrapup() {
    SetWrapup();
});

function refreshData(){
    $("button").click(function(){
        $('#btnRefreshDatos').click(() => {
            setTableWrapUp();
        })
    })     
}
$(document).ready(function refrescarData() {
    refreshData();
});
