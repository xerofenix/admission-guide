package main

import (
	"admission-guide/routes"

	"github.com/gofiber/fiber/v2"
)

func main() {

	app := fiber.New()
	routes.SetUp(app)

	app.Listen(":8000")

}
