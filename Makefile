default:
	./scripts/parallel_commands "make core-dev" "make web-dev"

core-dev:
	cd core && cargo run

web-dev:
	cd web &&	yarn dev