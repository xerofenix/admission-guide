package routes

import (
	"admission-guide/controllers"

	"github.com/gofiber/fiber/v2"
)

func SetUp(app *fiber.App) {
	app.Get("/api", func(c *fiber.Ctx) error {
		return c.Status(200).SendString("hello world. This page shows that the wbesite is working fine and the server is currently running")
	})
	app.Post("/api/feedback", controllers.SubmitFeedback)
}
