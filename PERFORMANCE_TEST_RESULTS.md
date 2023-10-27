# Performance test results

Description of the used server: HTTP/1.1

Description of local machine used: MacBook Pro, Processor: 2,2 GHz 6-Core Intel Core i7, Memory: 16 GB 2400 MHz DDR4

## With Redis caching

### Retrieving questions

http_reqs: 14070

http_req_duration - median: 70.42msms

http_req_duration - 99th percentile: 214.99ms

### Posting question

http_reqs: 7009

http_req_duration - median: 36.32ms

http_req_duration - 99th percentile: 36.32ms

### Retrieving answers

http_reqs: 13368 

http_req_duration - median: 74.04ms

http_req_duration - 99th percentile: 143.34ms

### Posting assignment

http_reqs: 13197

http_req_duration - median: 75.05ms

http_req_duration - 99th percentile: 212.84ms

### Loading home page

http_reqs: 1023

http_req_duration - median: 996.66ms

http_req_duration - 99th percentile: 4.3s  

### Results

#### Load questions
execution: local
     script: performance-test-load-questions.js
     output: -

  scenarios: (100.00%) 1 scenario, 99 max VUs, 40s max duration (incl. graceful stop):
           * default: 99 looping VUs for 10s (gracefulStop: 30s)


     data_received..................: 6.4 MB 637 kB/s
     data_sent......................: 1.3 MB 130 kB/s
     http_req_blocked...............: avg=41.16µs p(99)=30µs    
     http_req_connecting............: avg=28.44µs p(99)=0s      
     http_req_duration..............: avg=70.42ms p(99)=214.99ms
       { expected_response:true }...: avg=70.42ms p(99)=214.99ms
     http_req_failed................: 0.00%  ✓ 0           ✗ 14070
     http_req_receiving.............: avg=64.1µs  p(99)=157.3µs 
     http_req_sending...............: avg=20.02µs p(99)=67.3µs  
     http_req_tls_handshaking.......: avg=0s      p(99)=0s      
     http_req_waiting...............: avg=70.34ms p(99)=214.87ms
     http_reqs......................: 14070  1399.873524/s
     iteration_duration.............: avg=70.55ms p(99)=216.41ms
     iterations.....................: 14070  1399.873524/s
     vus............................: 99     min=99        max=99 
     vus_max........................: 99     min=99        max=99

running (10.1s), 00/99 VUs, 14070 complete and 0 interrupted iterations

#### Add question

  execution: local
     script: performance-test-add-question.js
     output: -

  scenarios: (100.00%) 1 scenario, 99 max VUs, 40s max duration (incl. graceful stop):
           * default: 99 looping VUs for 10s (gracefulStop: 30s)


     data_received..................: 1.6 MB 155 kB/s
     data_sent......................: 1.9 MB 186 kB/s
     http_req_blocked...............: avg=53.11µs  p(99)=2.66ms  
     http_req_connecting............: avg=39.09µs  p(99)=2.13ms  
     http_req_duration..............: avg=141.96ms p(99)=545.88ms
       { expected_response:true }...: avg=36.32ms  p(99)=36.32ms 
     http_req_failed................: 99.98% ✓ 7008       ✗ 1   
     http_req_receiving.............: avg=66.17µs  p(99)=128.84µs
     http_req_sending...............: avg=28.45µs  p(99)=72.84µs 
     http_req_tls_handshaking.......: avg=0s       p(99)=0s      
     http_req_waiting...............: avg=141.87ms p(99)=545.78ms
     http_reqs......................: 7009   687.345074/s
     iteration_duration.............: avg=142.16ms p(99)=546.12ms
     iterations.....................: 7009   687.345074/s
     vus............................: 99     min=99       max=99
     vus_max........................: 99     min=99       max=99


running (10.2s), 00/99 VUs, 7009 complete and 0 interrupted iterations


#### Load Answers

 execution: local
     script: performance-test-load-answers.js
     output: -

  scenarios: (100.00%) 1 scenario, 99 max VUs, 40s max duration (incl. graceful stop):
           * default: 99 looping VUs for 10s (gracefulStop: 30s)


     data_received..................: 5.4 MB 542 kB/s
     data_sent......................: 1.2 MB 121 kB/s
     http_req_blocked...............: avg=31.23µs p(99)=39µs    
     http_req_connecting............: avg=23.18µs p(99)=0s      
     http_req_duration..............: avg=74.04ms p(99)=143.34ms
       { expected_response:true }...: avg=74.04ms p(99)=143.34ms
     http_req_failed................: 0.00%  ✓ 0           ✗ 13368
     http_req_receiving.............: avg=67.55µs p(99)=166µs   
     http_req_sending...............: avg=19.4µs  p(99)=71µs    
     http_req_tls_handshaking.......: avg=0s      p(99)=0s      
     http_req_waiting...............: avg=73.95ms p(99)=143.26ms
     http_reqs......................: 13368  1331.419468/s
     iteration_duration.............: avg=74.16ms p(99)=143.67ms
     iterations.....................: 13368  1331.419468/s
     vus............................: 99     min=99        max=99 
     vus_max........................: 99     min=99        max=99 


running (10.0s), 00/99 VUs, 13368 complete and 0 interrupted iterations

## Add Answer

execution: local
     script: performance-test-add-answer.js
     output: -

  scenarios: (100.00%) 1 scenario, 99 max VUs, 40s max duration (incl. graceful stop):
           * default: 99 looping VUs for 10s (gracefulStop: 30s)


     data_received..................: 5.4 MB 537 kB/s
     data_sent......................: 3.3 MB 324 kB/s
     http_req_blocked...............: avg=32.2µs  p(99)=33µs    
     http_req_connecting............: avg=20.2µs  p(99)=0s      
     http_req_duration..............: avg=75.05ms p(99)=212.84ms
       { expected_response:true }...: avg=75.05ms p(99)=212.84ms
     http_req_failed................: 0.00%  ✓ 0          ✗ 13197
     http_req_receiving.............: avg=63.85µs p(99)=147µs   
     http_req_sending...............: avg=26.76µs p(99)=77µs    
     http_req_tls_handshaking.......: avg=0s      p(99)=0s      
     http_req_waiting...............: avg=74.96ms p(99)=212.74ms
     http_reqs......................: 13197  1312.27045/s
     iteration_duration.............: avg=75.21ms p(99)=212.99ms
     iterations.....................: 13197  1312.27045/s
     vus............................: 99     min=99       max=99 
     vus_max........................: 99     min=99       max=99 


running (10.1s), 00/99 VUs, 13197 complete and 0 interrupted iterations

## Load Index page

  execution: local
     script: performance-test-load-index-page.js
     output: -

  scenarios: (100.00%) 1 scenario, 99 max VUs, 40s max duration (incl. graceful stop):
           * default: 99 looping VUs for 10s (gracefulStop: 30s)


     data_received..................: 28 MB 2.7 MB/s
     data_sent......................: 82 kB 7.6 kB/s
     http_req_blocked...............: avg=1.02ms   p(99)=11.1ms  
     http_req_connecting............: avg=365.04µs p(99)=4.25ms  
     http_req_duration..............: avg=996.66ms p(99)=4.3s    
       { expected_response:true }...: avg=996.66ms p(99)=4.3s    
     http_req_failed................: 0.00% ✓ 0         ✗ 1023
     http_req_receiving.............: avg=1.84ms   p(99)=17.73ms 
     http_req_sending...............: avg=29.61µs  p(99)=253.63µs
     http_req_tls_handshaking.......: avg=0s       p(99)=0s      
     http_req_waiting...............: avg=994.78ms p(99)=4.29s   
     http_reqs......................: 1023  95.505857/s
     iteration_duration.............: avg=997.78ms p(99)=4.31s   
     iterations.....................: 1023  95.505857/s
     vus............................: 99    min=99      max=99
     vus_max........................: 99    min=99      max=99


running (10.7s), 00/99 VUs, 1023 complete and 0 interrupted iterations







