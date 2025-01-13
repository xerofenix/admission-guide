package main

import (
	"admission-guide/config"
	"admission-guide/routes"

	"github.com/gofiber/fiber/v2"
)

func main() {
	// load .env file
	config.LoadEnv()

	//connecting to DB
	config.ConnectDB()

	app := fiber.New()
	routes.SetUp(app)

	app.Listen(":7000")

}
