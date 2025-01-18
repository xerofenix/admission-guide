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
	app.Static("/", "../front")
	routes.SetUp(app)

	err := app.Listen(":7000")
	if err != nil {
		panic(err)
	}

}
