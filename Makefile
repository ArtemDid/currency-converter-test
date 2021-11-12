run:
	sudo docker run -d -p 3000:3000 --rm --name logsapp logsapp
run-dev:
	sudo docker run -d -p 3000:80 -v "/home/artem-dev/Desktop/work/currency-converter-test:/app" -v /app/node_modules -e PORT=80 --rm --name logsapp logsapp
stop:
	sudo docker stop logsapp