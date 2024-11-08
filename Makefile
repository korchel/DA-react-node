logs:
	sudo docker-compose logs

stop:
	sudo docker-compose stop

start:
	sudo docker-compose start

run-f:
	sudo docker-compose up -d

down:
	sudo docker-compose down

log:
	sudo docker-compose logs

status:
	sudo docker-compose ps -a

run-dev:
	sudo docker-compose -f docker-compose.dev.yml up --build -d

run-prod:
	sudo docker-compose up --build -d

run-prod-cert:
	sudo docker-compose -f docker-compose-cert.yml up --build -d