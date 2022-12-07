import credentials from "credentials.json";

export default {
  python: (task, email, code, status, output) => `#TAREA: '${task.task_id.name}'
  import requests
  import json
  url = "${credentials.SERVER_URL}/tracking/trace"
  payload = json.dumps({
    "module_task_detail_id": ${task.id},
    "email": "${email}",
    "code": "${code}",
    "status": "${status}",
    "outputValue": "${output}"
  })
  headers = {'Content-Type': 'application/json'}
  response = requests.request("POST", url, headers=headers, data=payload)`,
  javascript: (task, email, code, status, output) => `//TAREA: '${task.task_id.name}'
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
    "module_task_detail_id": ${task.id},
    "email": "${email}",
    "code": "${code}",
    "status": "${status}",
    "outputValue": "${output}"
    });

    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };

    fetch("${credentials.SERVER_URL}/tracking/trace", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));`,
  php: (task, email, code, status, output) => `<?php #TAREA: '${task.task_id.name}'
  $curl = curl_init();
  curl_setopt_array($curl, array(
    CURLOPT_URL => '${credentials.SERVER_URL}/tracking/trace',
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_ENCODING => '',
    CURLOPT_MAXREDIRS => 10,
    CURLOPT_TIMEOUT => 0,
    CURLOPT_FOLLOWLOCATION => true,
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST => 'POST',
    CURLOPT_POSTFIELDS =>'{
        "module_task_detail_id": ${task.id},
        "email": "${email}",
        "code": "${code}",
        "status": "${status}",
        "outputValue": "${output}"
  }',
    CURLOPT_HTTPHEADER => array(
      'Content-Type: application/json'
    ),
  ));
  curl_exec($curl);
  curl_close($curl); ?>`,
  java: (task, email, code, status, output) => `//TAREA: '${task.task_id.name}'
  Unirest.setTimeouts(0, 0);
  HttpResponse<String> response = Unirest.post(${credentials.SERVER_URL}/tracking/trace")
    .header("Content-Type", "application/json")
    .body("{\r\n    \"module_task_detail_id\": ${task.id},\r\n    \"email\": ${email},\r\n    \"code\": ${code},\r\n    \"status\": \"${status}\",\r\n    \"outputValue\": \"${output}\"\r\n}")
    .asString();`,
  csharp: (task, email, code, status, output) => `//TAREA: '${task.task_id.name}'
  var client = new RestClient("${credentials.SERVER_URL}/tracking/trace");
  client.Timeout = -1;
  var request = new RestRequest(Method.POST);
  request.AddHeader("Content-Type", "application/json");
  var body = @"{
  " + "\n" +
  @"    ""module_task_detail_id"": ${task.id},
  " + "\n" +
  @"    ""email"": ""${email}"",
  " + "\n" +
  @"    ""code"": ""${code}"",
  " + "\n" +
  @"    ""status"": ""${status}"",
  " + "\n" +
  @"    ""outputValue"": """${output}"""
  " + "\n" +
  @"}";
  request.AddParameter("application/json", body,  ParameterType.RequestBody);
  IRestResponse response = client.Execute(request);
  Console.WriteLine(response.Content);
  `,
  go: (task, email, code, status, output) => `//TAREA: '${task.task_id.name}'
  package main

    import (
      "fmt"
      "strings"
      "net/http"
      "io/ioutil"
    )

    func main() {
      url := "${credentials.SERVER_URL}/tracking/trace"
      method := "POST"

      payload := strings.NewReader({
        "module_task_detail_id": ${task.id},
        "email": "${email}",
        "code": "${code}",
        "status": "${status}",
        "outputValue": "${output}"
    })

    client := &http.Client {}
    req, err := http.NewRequest(method, url, payload)
    req.Header.Add("Content-Type", "application/json")
    res, err := client.Do(req)
    defer res.Body.Close()
  }
  `,
  ruby: (task, email, code, status, output) => `#TAREA: '${task.task_id.name}'
    require "uri"
    require "json"
    require "net/http"

    url = URI("${credentials.SERVER_URL}/tracking/trace")

    https = Net::HTTP.new(url.host, url.port)
    https.use_ssl = true

    request = Net::HTTP::Post.new(url)
    request["Content-Type"] = "application/json"
    request.body = JSON.dump({
      "module_task_detail_id": ${task.id},
      "email": "${email}",
      "code": "${code}",
      "status": "${status}",
      "outputValue": "${output}"
    })

    response = https.request(request)
    puts response.read_body
  }
  `,
  shell: (task, email, code, status, output) => `#TAREA: '${task.task_id.name}'
  curl -i -X POST ${credentials.SERVER_URL}/tracking/trace --header 'Content-Type:application/json' --data {\\"module_task_detail_id\\":${task.id},\\"email\\":\\"${email}\\",\\"code\\":\\"${code}\\",\\"status\\":\\"${status}\\",\\"outputValue\\":\\"${output}\\"}`,
};