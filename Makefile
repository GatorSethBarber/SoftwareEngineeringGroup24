## run `make dev` when you are developing and need to test client changes
dev:
	npx concurrently "cd src/server && go run ." "cd GiftCardXChange && ng serve --open"

## allow vs code to automatically run make dev
# 1. open command pallete
# 2. type `manage automatic task1 and choose the first option
# 3. click allow
# 4. restart vs code to test that it starts the project automatically

## run `make build` to serve everything from 8080 then open http://localhost:8080
build: 
	cd GiftCardXChange && ng build
	open http://localhost:8080
	cd src/server && go run .