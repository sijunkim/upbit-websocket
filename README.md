# upbit-websocket
프로그램 실행 환경  
OS : MacOS Monterey 12.2.1  
IDE : Visual Studio code  
DB : MySql 8.0 (127.0.0.1:3306)  
  
사전 작업  
1. nodejs 사전 설치  
2. mysql 8.0 로컬 설치 후 index.ts 파일 안에 DB 연결 정보 입력  
3. kimsijun-upbit-websocket 데이터베이스 생성  
  
프로그램 실행 프로세스  
1. > npm install
2. > tsc
3. > npm start
  
디버깅  
F5 입력하여 디버깅 모드 진입 시 콘솔에서 DB에 저장중인 데이터 확인 가능  
  
메모리 저장  
setData 함수 안에서 Map 안에 저장중인 것 디버깅 통해서 확인 가능  
  
데이터베이스 저장  
InsertData 함수 안에서 MySql 안에 저장중인 것 콘솔 통해서 확인 가능  
  
트러블슈팅  
[ERROR] : Client does not support authentication protocol requested by server; consider upgrading MySQL client  
https://stackoverflow.com/questions/50093144/mysql-8-0-client-does-not-support-authentication-protocol-requested-by-server
