clean:
	@echo "Cleaning..."
	@docker compose -f .jobcontainer/docker-compose.yml down --remove-orphans
	@docker volume rm -f jobcontainer_jobs_postgres_data

infras:
	@docker compose -f .jobcontainer/docker-compose.yml down --remove-orphans
	@docker compose -f .jobcontainer/docker-compose.yml up -d jobs-postgres

migrate:
	@npm run migration

dev:
	@npm run start
