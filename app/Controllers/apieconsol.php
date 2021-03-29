<?php

namespace App\Controllers;

class Apieconsol extends BaseController
{

	public function getToken()
	{

        $curl = curl_init();

        curl_setopt_array($curl, array(
        CURLOPT_URL => 'https://login.mypurecloud.com/oauth/token',
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => '',
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 0,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => 'POST',
        CURLOPT_POSTFIELDS => 'grant_type=client_credentials',
        CURLOPT_HTTPHEADER => array(
            'Accept: application/json',
            'authorization: Basic N2Q0YWVlYTctNzU2NC00MWU2LWFlYzctNzcwOGM3MDg4NjM5OkF1M0xkTktXZW5ZWE1WSmxSLUc4eG1rN0g1dmVMSlRqdUxYUXNVYml6OUU=',
            'Content-Type: application/x-www-form-urlencoded'
        ),
        ));

        $response = curl_exec($curl);
        curl_close($curl);

        if ($response != false || null){
            return $response;
          }else{
            $array = array('errorid' => 0, 'message' => '', 'data' => $response);
            $response = json_encode($array); 
            return $response;
          }
	}

    public function allWrapup($queueid)
    {
        $json = file_get_contents('http://localhost/apieconsol/gettoken');
        $obj = json_decode($json);

        $token = $obj->access_token;
        $curl = curl_init();

        curl_setopt_array($curl, array(
          CURLOPT_URL => 'https://api.mypurecloud.com/api/v2/routing/queues/'.$queueid.'/wrapupcodes',
          CURLOPT_RETURNTRANSFER => true,
          CURLOPT_ENCODING => '',
          CURLOPT_MAXREDIRS => 10,
          CURLOPT_TIMEOUT => 0,
          CURLOPT_FOLLOWLOCATION => true,
          CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
          CURLOPT_CUSTOMREQUEST => 'GET',
          CURLOPT_HTTPHEADER => array(
            'Accept: application/json',
            'Content-Type: application/json',
            'authorization: bearer '.$token
          ),
        ));
        
        $response = curl_exec($curl);
        curl_close($curl);
        $data = json_decode($response);
        $dataResponse = $data->entities;
        if ($dataResponse != false || null){
            return $response;
          }else{
            $array = array('errorid' => 0, 'message' => '', 'data' => $response);
            $response = json_encode($array); 
            return $response;
          }

    }

    public function UpdateParticipant($participantid, $conversationid, $wrapupid)
    {

        $curl = curl_init();

        curl_setopt_array($curl, array(
            CURLOPT_URL => 'https://api.mypurecloud.com/api/v2/conversations/'.$participantid.'/participants/'.$conversationid,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => '',
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 0,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => 'PATCH',
            CURLOPT_POSTFIELDS =>'{"wrapup": {"code":'.$wrapupid.', "name": "", "notes": "", "tags": [], "durationSeconds": 0, "endTime": "", "provisional": false}}',
            CURLOPT_HTTPHEADER => array(
            'Content-Type: application/json',
            'Accept: application/json',
            'authorization: bearer '.$token
            ),
        ));
      
      $response = curl_exec($curl);
      
      curl_close($curl);
      if ($response != false || null){
        $array = array('exito' => 1, 'message' => '', 'data' => '');
        $response = json_encode($array); 
        return $response;
      }else{
        $array = array('error' => 0, 'message' => '', 'data' => $response);
        $response = json_encode($array); 
        return $response;
      }
      

    }

    public function JsonReport($participantid, $conversationid, $wrapupid, $queueid, $fecha, $hora){

      $array = array('participantid' => $participantid, 'conversationid' => $conversationid,
       'wrapupid' => $wrapupid, 'queueid' => $queueid, 'fecha' => $fecha, 'hora' => $hora);

        $dataReporte = json_encode($array); 
        return $dataReporte;
    }
}