package controllers

import (
	"admission-guide/config"
	"admission-guide/models"
	"time"

	"github.com/gofiber/fiber/v2"
)

func SubmitFeedback(c *fiber.Ctx) error {
	var fbData map[string]string
	err := c.BodyParser(&fbData)
	if err != nil {
		return c.Status(400).JSON(fiber.Map{
			"success": false,
			"message": "parsing error!, data might be invalid",
		})
	}

	if fbData["email"] == "" {
		return c.Status(400).JSON(fiber.Map{
			"success": false,
			"message": "email is required",
		})
	}
	if fbData["feedback_text"] == "" {
		return c.Status(400).JSON(fiber.Map{
			"success": false,
			"message": "feedback is required",
		})
	}

	//saving cashier to db
	fb := models.Feedback{
		Name:         fbData["name"],
		Email:        fbData["email"],
		FeedbackText: fbData["feedback_text"],
		CreatedAt:    time.Time{},
	}

	config.DB.Create(&fb)

	return c.Status(200).JSON(fiber.Map{
		"success": true,
		"message": "feedback submitted successfully",
	})
}
