+++
title = "Http API"
weight = 6
+++

## Starting the server

After [installing Ace]({{< relref "getting-started/installation.md" >}}), run the `ace-http` command from the terminal:
```
$ ace-http
info:    [ace-http] server listening on http://localhost:8000
```

The command line options are printed when you run `ace-http --help`:

```
Ace by DAISY, an Accessibility Checker for EPUB

  Usage: ace-http [options]

  Options:

    -h, --help             output usage information
    -v, --version          output the version number

    -H, --host             set the server's hostname (default: localhost)
    -p, --port             set the server's port (default: 8000)

    -V, --verbose          display verbose output
    -s, --silent           do not display any output

    -l, --lang  <language> language code for localized messages (e.g. "fr"), default is "en"
  Examples
    $ ace-http -p 3000
 ```

## API

This API is available to client applications.

* `GET  /jobs/`: list all the jobs
* `GET  /job/:jobid/`: return information about a job
* `POST /jobs/`: attach an EPUB file to run Ace
* `GET  /job/:jobid/report/?type=[zip|json]`: return a zip file containing the report

Note that failing to specify `type` of report will return the default format (`zip`).

### Job status codes

*  `1`: Processing. The job has been submitted and is being executed.
*  `0`: Done. The job is done and the reports are ready.
* `-1`: Error. The job could not be completed. This is different than the file having accessibility errors. It means the file could not be evaluated.

### Job information

This is returned by calling `GET /job/:jobid/` with the ID of a job.

```json
  {
    job: URL for the job information
    status: A job status code
    report: {
      zip: URL for the zipped report,
      json: URL for the json report
    }
  }
```

## Examples

### Submit a job
```
~ ❯❯❯ curl --form "epub=@/Users/marisa/dev/epub-a11y-checker/samples/build/epub-a11y-tests-001.epub" http://localhost:8000/jobs/

{"job":"http://localhost:8000/jobs/38fb458a-37a2-4e5c-874c-5cf387bf86c1","status":1,"report":{}}%
```

### Check job status
```
~ ❯❯❯ curl http://localhost:8000/jobs/38fb458a-37a2-4e5c-874c-5cf387bf86c1

{"job":"http://localhost:8000/jobs/38fb458a-37a2-4e5c-874c-5cf387bf86c1","status":0,"report":{"zip":"http://localhost:8000/jobs/38fb458a-37a2-4e5c-874c-5cf387bf86c1/report/?type=zip","json":"http://localhost:8000/jobs/38fb458a-37a2-4e5c-874c-5cf387bf86c1/report/?type=json"}}%
```

### Get the report
```
~ ❯❯❯ curl 'http://localhost:8000/jobs/38fb458a-37a2-4e5c-874c-5cf387bf86c1/report/?type=zip' -o ~/out.zip

   % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100 47656    0 47656    0     0  1177k      0 --:--:-- --:--:-- --:--:-- 1193k

~ ❯❯❯ unzip ~/out.zip
Archive:  /Users/marisa/out.zip
  inflating: ace-report-38fb458a-37a2-4e5c-874c-5cf387bf86c1/data/EPUB/images/daisy.png
  inflating: ace-report-38fb458a-37a2-4e5c-874c-5cf387bf86c1/report.html
  inflating: ace-report-38fb458a-37a2-4e5c-874c-5cf387bf86c1/report.json
```

### Get only the JSON report
```
~ ❯❯❯ curl 'http://localhost:8000/jobs/38fb458a-37a2-4e5c-874c-5cf387bf86c1/report/?type=json' -o ~/out.json
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100 24972  100 24972    0     0  3482k      0 --:--:-- --:--:-- --:--:-- 4064k
~ ❯❯❯ tail ~/out.json
{"@type":"earl:report","@context":"http://daisy.github.io/ace/ace-report-1.0.jsonld","dct:title":"Ace Report",
...
```

### List all the jobs

(after having added several jobs)

```
~ ❯❯❯ curl http://localhost:8000/jobs/
[{"job":"http://localhost:8000/jobs/8198e049-2e81-4be8-b889-ace01978dabc","status":-1,"report":{}},{"job":"http://localhost:8000/jobs/38fb458a-37a2-4e5c-874c-5cf387bf86c1","status":0,"report":{"zip":"http://localhost:8000/jobs/38fb458a-37a2-4e5c-874c-5cf387bf86c1/report/?type=zip","json":"http://localhost:8000/jobs/38fb458a-37a2-4e5c-874c-5cf387bf86c1/report/?type=json"}},{"job":"http://localhost:8000/jobs/107df1e7-deff-436f-811e-2a8473b20237","status":0,"report":{"zip":"http://localhost:8000/jobs/107df1e7-deff-436f-811e-2a8473b20237/report/?type=zip","json":"http://localhost:8000/jobs/107df1e7-deff-436f-811e-2a8473b20237/report/?type=json"}},{"job":"http://localhost:8000/jobs/d62bb7c7-4eea-4f0b-bd73-b45f28630ebe","status":0,"report":{"zip":"http://localhost:8000/jobs/d62bb7c7-4eea-4f0b-bd73-b45f28630ebe/report/?type=zip","json":"http://localhost:8000/jobs/d62bb7c7-4eea-4f0b-bd73-b45f28630ebe/report/?type=json"}},{"job":"http://localhost:8000/jobs/4363a917-c422-486f-98c0-bd98cc423fc0","status":0,"report":{"zip":"http://localhost:8000/jobs/4363a917-c422-486f-98c0-bd98cc423fc0/report/?type=zip","json":"http://localhost:8000/jobs/4363a917-c422-486f-98c0-bd98cc423fc0/report/?type=json"}}]%
```
