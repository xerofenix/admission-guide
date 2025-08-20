package main

import (
	"admission-guide/config"
	"admission-guide/routes"
	"log"
	"os"
	"path/filepath"

	"github.com/gofiber/fiber/v2"
)

func main() {
	// load .env file
	config.LoadEnv()

	//connecting to DB
	// config.ConnectDB()

	app := fiber.New(fiber.Config{
		Views: nil,
	})

	// Debug middleware
	app.Use(func(c *fiber.Ctx) error {
		log.Printf("Request: %s %s", c.Method(), c.Path())
		return c.Next()
	})

	// Get absolute path to front directory
	frontPath, err := filepath.Abs("../front")
	if err != nil {
		log.Fatalf("Error getting absolute path: %v", err)
	}

	// Check if front directory exists
	if _, err := os.Stat(frontPath); os.IsNotExist(err) {
		log.Fatalf("Front directory does not exist at: %s", frontPath)
	}

	log.Printf("Serving static files from: %s", frontPath)

	// Serve static files with proper configuration
	app.Static("/", frontPath, fiber.Static{
		Compress:      true,
		ByteRange:     true,
		Browse:        true, // Enable browsing for debugging
		Index:         "index.html",
		CacheDuration: 0, // Disable cache for debugging
		MaxAge:        0, // Disable cache for debugging
	})

	// Handle 404 errors
	app.Use(func(c *fiber.Ctx) error {
		if c.Method() == "GET" {
			requestedFile := filepath.Join(frontPath, c.Path())
			log.Printf("Attempting to serve file: %s", requestedFile)

			// Check if file exists
			if _, err := os.Stat(requestedFile); os.IsNotExist(err) {
				log.Printf("File not found: %s", requestedFile)
				return c.Next()
			}

			return c.SendFile(requestedFile)
		}
		return c.Next()
	})
	config.ConnectSqliteDB()

	routes.SetUp(app)

	err = app.Listen(":7000")
	if err != nil {
		panic(err)
	}
}
